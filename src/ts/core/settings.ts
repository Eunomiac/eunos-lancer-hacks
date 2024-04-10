import C from "../core/constants";
import Hack_BarBrawl from "../module-hacks/barbrawl";

// #region TYPES & HELPER FUNCTIONS ~
declare global {
  namespace EHS {

    type DependencyData = {
      type: "system"|"module";
      id: string;
      display: string;
    }

    namespace Submenu {
      type Type = ReturnType<(typeof EunosHacksSettings)["BuildSubmenuApplication"]>;

      interface Config extends Omit<SettingSubmenuConfig, "key" | "namespace" | "type" | "name"> {
        name: string;
        type?: Type;
        default?: Data;
        template?: string;
        dependencies: EHS.DependencyData[];
        onEnable?: () => Promise<unknown>;
        onDisable?: () => Promise<unknown>;
        onRefresh?: () => Promise<unknown>;
      }

      interface Params extends Omit<Config, "onEnable" | "onDisable" | "template"> {
        key: string;
        namespace: string;
        type: Type;
        default: Data
      }

      type Data = List<Setting.Data>;

      type Context = Awaited<ReturnType<FormApplication["getData"]>>
        & List<object | string | Setting.Context, string>;

      namespace Setting {
        interface ConfigBase<T, I extends InputType> extends Omit<SettingConfig<T>, "key" | "namespace" | "scope" | "choices"> {
          inputType: I;
          handlers?: {
            click?: (event: JQuery.Event, elem$: JQuery<HTMLElement>, data: EHS.Submenu.Data) => void;
            contextmenu?: (event: JQuery.Event, elem$: JQuery<HTMLElement>, data: EHS.Submenu.Data) => void;
            change?: (event: JQuery.Event, elem$: JQuery<HTMLElement>, data: EHS.Submenu.Data) => void;
            mouseenter?: (event: JQuery.Event, elem$: JQuery<HTMLElement>, data: EHS.Submenu.Data) => void;
            mouseleave?: (event: JQuery.Event, elem$: JQuery<HTMLElement>, data: EHS.Submenu.Data) => void;
          };
          onEnable?: () => Promise<unknown>;
          onDisable?: () => Promise<unknown>;
          onRefresh?: () => Promise<unknown>;
        }

        type Config<T, I extends InputType> =
          I extends InputType.Select ? ConfigBase<T, InputType.Select> & {inputType: InputType.Select, default: T, choices: Record<string, string>}
          : I extends InputType.Button ? ConfigBase<T, InputType.Button> & {inputType: InputType.Button, icon: string}
          : ConfigBase<T, I> & {inputType: I, default: T};
        // interface Config<T, inputType extends InputType> extends Omit<SettingConfig<T>, "key" | "namespace" | "scope"> {
        //   inputType: inputType;
        //   icon: inputType extends InputType.Button ? string : undefined;
        //   default: inputType extends InputType.Button ? undefined : T;
        // }

        type Data = unknown;

        type Context<T = unknown, inputType extends InputType = InputType> = Config<T, inputType> & {value: Data};
      }
    }

    namespace Setting {
      type Type<T = unknown> = SettingConfig<T>["type"];

      type Config<T = unknown> = Omit<SettingConfig<T>, "key" | "namespace" | "scope" | "config" | "type">;

      type Data = unknown;

      type Context = Data;
    }

    interface SettingsUpdateData {
      [k: string]: Record<string, unknown>
    }
  }
}

/**
 * Gets the constructor of the given value.
 * For primitive values, it returns their wrapper object constructors (Number, String, Boolean).
 * For object types, it returns their constructor directly.
 * @param {T} value - The value to get the constructor of.
 * @returns {EHS.Setting.Type<T> | null} The constructor of the value, or null if it cannot be determined.
 */
function getConstructor<T>(value: T): EHS.Setting.Type<T> | null {
  if (value === null || value === undefined) {return null;}
  switch (typeof value) {
    case "string": return String as EHS.Setting.Type<T>;
    case "number": return Number as EHS.Setting.Type<T>;
    case "boolean": return Boolean as EHS.Setting.Type<T>;
    case "object": return (Array.isArray(value) ? Array : value.constructor) as EHS.Setting.Type<T>;
    default: return null;
  }
}

enum InputType {
  Button = "Button",
  Select = "Select",
  Text = "Text",
  Number = "Number",
  File = "File",
  Color = "Color",
  Checkbox = "Checkbox"
}
// #endregion

export default class EunosHacksSettings {

  static get InputType() {return InputType;}

  // #region *** INITIALIZATION *** ~
  private static _getSubMenuKeys(subMenu$: JQuery<HTMLElement>): Record<"menuKey" | "dataKey" | "toggleKey", string | null> {
    const keysData = {
      menuKey: subMenu$.find("[data-key]").data("key").split(".").pop() ?? null,
      dataKey: null,
      toggleKey: null
    };
    if (!keysData.menuKey) {return keysData;}
    keysData.dataKey = keysData.menuKey.replace("Menu", "");
    keysData.toggleKey = keysData.menuKey.replace("Menu", "Toggle");
    return keysData;
  }

  private static _getSubMenuElems$(html$: JQuery<HTMLElement>, namespace = "eunos-lancer-hacks"): Array<Tuple<JQuery<HTMLElement>>> {
    const container$ = html$
      .find(".categories > .scrollable .tab[data-tab='eunos-lancer-hacks'] > .module-settings-wrapper");
    return Array.from(container$.find(".form-group.submenu"))
      .map((subMenu) => {
        const subMenu$ = $(subMenu);
        const {toggleKey} = this._getSubMenuKeys(subMenu$);
        return [
          subMenu$,
          container$.find(`[name='${namespace}.${toggleKey}']`).closest(".form-group")
        ] as const;
      });
  }

  private static _getSubMenuParams(menuKey: string, namespace = "eunos-lancer-hacks"): EHS.Submenu.Params {
    return game.settings.menus.get(`${namespace}.${menuKey}`) as EHS.Submenu.Params;
  }

  private static _getSubMenuApp(menuKey: string, namespace = "eunos-lancer-hacks"): ReturnType<typeof EunosHacksSettings.BuildSubmenuApplication> {
    return this._getSubMenuParams(menuKey, namespace).type;
  }

  private static _reorderNavTabs(html$: JQuery<HTMLElement>) {
    // Rearrange settings navigation
    const sidebar$ = html$.find(".sidebar");
    const lancerTabButton$ = sidebar$.find(".item.category-tab[data-tab='system']");
    const eTabButton$ = sidebar$.find(".item.category-tab[data-tab='eunos-lancer-hacks']");
    eTabButton$.insertAfter(lancerTabButton$);
  }

  private static async _refreshSubMenuToggle([subMenu$, toggleGroup$]: Tuple<JQuery<HTMLElement>>): Promise<unknown> {
    const toggleControl$ = toggleGroup$.find("[type='checkbox']");
    const isChecked = toggleControl$.prop("checked");
    subMenu$.toggleClass("eunos-submenu-disabled", !isChecked);
    return Promise.resolve();
  }

  private static _addSubMenuListeners([subMenu$, toggleGroup$]: Tuple<JQuery<HTMLElement>>) {
    const toggleControl$ = toggleGroup$.find("[type='checkbox']");
    const {menuKey} = this._getSubMenuKeys(subMenu$);
    if (!menuKey) {
      throw new Error(`Failed to get menuKey for subMenu$: ${subMenu$}`);
    }

    // Add event listener to toggleControl$ that enables/disables submenuButton$ depending on whether it is checked,
    // ... and a contextmenu listener to call the menu's refresh function
    toggleControl$.on({
      change: () => {
        const value = toggleControl$.prop("checked");
        subMenu$.toggleClass("eunos-submenu-disabled", !value);
        EunosHacksSettings.ToggleSubmenu(menuKey, value);
      },
      contextmenu: () => {
        const value = toggleControl$.prop("checked");
        if (value) {
          EunosHacksSettings.RefreshSubmenu(menuKey);
        }
      }
    });
  }

  private static async _formatSubMenu([subMenu$, toggleGroup$]: Tuple<JQuery<HTMLElement>>) {
    subMenu$.addClass("eunos-submenu");
    toggleGroup$.addClass("eunos-submenu-toggle");
    subMenu$.add(toggleGroup$).wrapAll("<div class='eunos-form-group-wrapper'></div>");

    const {menuKey} = this._getSubMenuKeys(subMenu$);
    if (!menuKey) {
      throw new Error(`Failed to get menuKey for subMenu$: ${subMenu$}`);
    }
    const subMenuApp = this._getSubMenuApp(menuKey);
    const missingDependencies = subMenuApp.Dependencies.filter((dep) => {
      if (dep.type === "module") {
        return !game.modules.get(dep.id)?.active;
      } else if (dep.type === "system") {
        return game.system.id !== dep.id;
      }
      throw new Error(`Unknown dependency type: ${dep.type}`);
    });
    if (missingDependencies.length > 0) {
      subMenu$.addClass("eunos-submenu-disabled");
      subMenu$.append(`<div class="eunos-dependency-notice">
        <i class="fa-duotone fa-triangle-exclamation"></i>
        <p>This requires the following modules to be installed: <strong class='eunos-dependency'>${missingDependencies.map((dep) => dep.display).join("</strong>, <strong class='eunos-dependency'>")}</strong></p>
      </div>`);
      return;
    }

    await this._refreshSubMenuToggle([subMenu$, toggleGroup$]);
    this._addSubMenuListeners([subMenu$, toggleGroup$]);
  }

  static Initialize(): Promise<unknown> {

    Hooks.on("renderSettingsConfig", (_sConfig: never, html$: JQuery<HTMLElement>) => {
      this._reorderNavTabs(html$);
      this._getSubMenuElems$(html$).forEach((menuElems$) => {
        this._formatSubMenu(menuElems$);
      });
    });

    return loadTemplates([
      this.defaultTemplate,
      ...Object.values(this.customTemplates)
    ]);
  }
  // #endregion

  static GetSettingsNamespace(namespace: string) {
    const keyList: List = {};
    Object.keys(flattenObject(Object.fromEntries(Array.from(game.settings.settings).filter(([key, {namespace: nSpace}]) => nSpace === namespace))))
      .forEach((fullKey) => {
        const [_, ...keyParts] = fullKey.split(".");
        let dotKey = keyParts.join(".");
        dotKey = dotKey
          .replace(/\.(range|choices|default)\..*$/g, "")
          .replace(/\.(name|type|default|scope|onChange|hint|config|requiresReload|key|namespace|restricted)$/g, "");
        if (dotKey in keyList) {return;}
        const dotVal = EunosHacksSettings.Get(namespace, dotKey);
        keyList[dotKey] = dotVal;
      });
    return keyList;
  }

  static async SafeUpdate(updateData: EHS.SettingsUpdateData) {
    if (!game.user?.isGM) {return;}
    const promises: Array<Promise<unknown>> = [];
    for (const [module, settingsData] of Object.entries(updateData)) {
      if (!game.modules.get(module)?.active && !["core", "lancer"].includes(module)) {continue;}
      for (const [settingKey, value] of Object.entries(settingsData)) {
        if (!game.settings.settings.has(`${module}.${settingKey}`)) {
          console.error(`Setting ${module}.${settingKey} not found`);
          continue;
        }
        const curValue = EunosHacksSettings.Get(module, settingKey);
        // const defaultValue = game.settings.settings.get(`${module}.${settingKey}`)?.default;
        // Check if the value is an object literal (not null, an object, and not an array)
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          if (!(typeof curValue === "object" && curValue !== null && !Array.isArray(curValue))) {
            console.error(`${module}.${settingKey} is not an object literal`);
            continue;
          }
          const mergedValue = {...curValue, ...value};
          if (JSON.stringify(mergedValue) === JSON.stringify(curValue)) {continue;}
          console.log(`Updating merged ${module}.${settingKey}:`, mergedValue);
          promises.push(EunosHacksSettings.Set(module, settingKey, value));
          continue;
        }
        if (JSON.stringify(curValue) === JSON.stringify(value)) {continue;}
        console.log(`Updating ${module}.${settingKey} to ${value}`);
        promises.push(EunosHacksSettings.Set(module, settingKey, value));
      }
    }
    return Promise.all(promises);
  }
  static defaultTemplate = "modules/eunos-lancer-hacks/templates/settings/default-submenu.hbs";

  static customTemplates: Record<string, string> = {};

  static ToggleSubmenu(menuKey: string, state: boolean) {
    const submenuApp = this._getSubMenuApp(menuKey);
    if (state) {
      submenuApp.Enable();
    } else {
      submenuApp.Disable();
    }
  }

  static RefreshSubmenu(menuKey: string) {
    this._getSubMenuApp(menuKey)?.Refresh();
  }

  static BuildSubmenuApplication(
    dataKey: string,
    menuConfig: EHS.Submenu.Config,
    settingsConfig: List<EHS.Submenu.Setting.Config<unknown, InputType>>,
    settingsToStore: Array<Tuple<string> | Threeple<string>>
  ) {
    return class EunosSubmenuApp extends FormApplication {

      static readonly key = dataKey;
      static get dataKey(): string {return this.key;}
      static get menuKey(): string {return `${this.key}Menu`;}
      static get toggleKey(): string {return `${this.key}Toggle`;}
      static get storageKey(): string {return `${this.key}Storage`;}

      static readonly menuConfig = menuConfig;
      static readonly settingsConfig = settingsConfig;

      static get Dependencies(): EHS.DependencyData[] {
        return this.menuConfig.dependencies ?? [];
      }

      static get Data(): Maybe<EHS.Submenu.Data> {
        return EunosHacksSettings.Get("eunos-lancer-hacks", this.dataKey);
      }

      static get DefaultData(): EHS.Submenu.Data {
        return Object.fromEntries(
          Object.entries(this.settingsConfig)
            .map(([settingKey, setting]) => [settingKey, setting.default])
            .filter(([key, value]) => value !== undefined)
        );
      }

      static StoreData(isOverwriting = false) {
        const storageData = this.StoredData;
        for (const settingData of settingsToStore) {
          if (settingData.length === 3) {
            // This is a setting that should be stored in a submenu.
            const [namespace, menuDataKey, subDataKey] = settingData;
            storageData[namespace] ??= {};
            storageData[namespace][menuDataKey] ??= {};

            // If a value is already stored here, don't overwrite it unless isOverwriting.
            if (!isOverwriting && subDataKey in (storageData[namespace][menuDataKey] as EHS.Submenu.Data)) {continue;}
            const curVal = EunosHacksSettings.Get(namespace, menuDataKey, subDataKey);
            if (curVal === undefined) {continue;}
            (storageData[namespace][menuDataKey] as EHS.Submenu.Data)[subDataKey] = curVal;
          } else {
            // This is a standard setting.
            const [namespace, settingKey] = settingData;
            storageData[namespace] ??= {};
            // If a value is already stored here, don't overwrite it.
            if (settingKey in storageData[namespace]) {continue;}
            const curVal = EunosHacksSettings.Get(namespace, settingKey);
            if (curVal === undefined) {continue;}
            storageData[namespace][settingKey] = curVal;
          }
        }
        return EunosHacksSettings.Set(this.storageKey, storageData);
      }

      static get StoredData(): Record<string, Record<string, EHS.Setting.Data | EHS.Submenu.Data>> {
        return EunosHacksSettings.Get(this.storageKey) ?? {};
      }

      static async RestoreStoredData() {
        const restoreData: Array<Threeple<string, string, unknown>> = [];
        for (const [namespace, storageData] of Object.entries(this.StoredData)) {
          for (const [settingKey, settingValue] of Object.entries(storageData)) {
            restoreData.push([namespace, settingKey, settingValue]);
          }
        }
        return Promise.all(restoreData.map(([namespace, settingKey, settingValue]) => EunosHacksSettings.Set(namespace, settingKey, settingValue)));
      }

      static get IsEnabled(): boolean {
        return EunosHacksSettings.IsSubmenuEnabled(this.dataKey);
      }

      static async Refresh() {
        if (this.menuConfig.onRefresh) {
          await this.menuConfig.onRefresh();
        }
        await Promise.all(
          Object.values(this.settingsConfig)
            .map(async (setting) => setting.onRefresh?.())
        );
      }

      /*
      When submenu disabled:
        - Call 'onDisable' on all settings in submenu
        - Restore stored data.
      */
      static async Disable() {
        await Promise.all(
          Object.values(this.settingsConfig)
            .map(async (setting) => setting.onDisable?.())
        );
        await game.settings.set("eunos-lancer-hacks", this.toggleKey, false);
        if (this.menuConfig.onDisable) {
          await this.menuConfig.onDisable();
        }
        await Promise.all(
          Object.values(this.settingsConfig)
            .map(async (setting) => setting.onDisable?.())
        );
        return this.RestoreStoredData();
      }

      /*
      When submenu enabled:
        - Store data, overwriting existing storage.
        - Call 'onEnable' on all settings in submenu
      */
      static async Enable() {
        await this.StoreData(true);
        await game.settings.set("eunos-lancer-hacks", this.toggleKey, true);
        if (this.menuConfig.onEnable) {
          await this.menuConfig.onEnable();
        }
        return Promise.all(
          Object.values(this.settingsConfig)
            .map(async (setting) => setting.onEnable?.())
        );
      }

      constructor(object = {}, formApplicationOptions = {}) {
        super(object, formApplicationOptions);
      }

      get dataKey(): string {return (this.constructor as typeof EunosSubmenuApp).dataKey;}
      get menuKey(): string {return (this.constructor as typeof EunosSubmenuApp).menuKey;}
      get toggleKey(): string {return (this.constructor as typeof EunosSubmenuApp).toggleKey;}
      get storageKey(): string {return (this.constructor as typeof EunosSubmenuApp).storageKey;}

      get menuConfig(): EHS.Submenu.Config {return (this.constructor as typeof EunosSubmenuApp).menuConfig;}
      get settingsConfig(): List<EHS.Submenu.Setting.Config<unknown, InputType>> {return (this.constructor as typeof EunosSubmenuApp).settingsConfig;}

      get isEnabled(): boolean {return EunosHacksSettings.IsSubmenuEnabled(this.dataKey);}

      get data(): EHS.Submenu.Data {return EunosHacksSettings.Get("eunos-lancer-hacks", this.dataKey) ?? {};}
      set data(value: EHS.Submenu.Data) {EunosHacksSettings.Set("eunos-lancer-hacks", this.dataKey, value);}

      /**
     * Default Options for this FormApplication
     */
      static override get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          id: `${this.menuKey}Menu`,
          title: this.menuConfig.name,
          popOut: true,
          template: this.menuConfig.template ?? EunosHacksSettings.defaultTemplate,
          classes: ["eunos-blades", "settings"],
          width: 500,
          closeOnSubmit: true,
          submitOnChange: false,
          submitOnClose: true
        });
      }

      applyDataToContext(context: Awaited<ReturnType<FormApplication["getData"]>>): Awaited<ReturnType<FormApplication["getData"]>> & EHS.Submenu.Context {
        const {data} = this;
        const contextData = Object.fromEntries(
          Object.entries(this.settingsConfig)
            .map(([settingKey, setting]) => {
              const settingContext: EHS.Submenu.Setting.Context = {
                ...setting,
                value: data[settingKey]
              };
              return [settingKey, settingContext];
            })
        );
        return {
          ...context,
          data: contextData
        };
      }


      /**
      * Provide data to the template
      */
      override async getData(): Promise<EHS.Submenu.Context> {
        return this.applyDataToContext(await super.getData());
      }

      /**
       * Executes on form submission.
       * @param _event - the form submission event
       * @param formData - the form data
       */
      override async _updateObject(_event: Event, formData: EHS.Submenu.Data) {
        if (!formData) {return;}
        formData = expandObject(formData);

        console.log("Form Data", formData);

        this.data = formData;
      }

      override async activateListeners(html: JQuery) {
        super.activateListeners(html);

        html.find("[data-key]").each((_i, elem) => {
          const elem$ = $(elem);
          const events$: JQuery.TypeEventHandlers<HTMLElement, undefined, HTMLElement, HTMLElement> = {};
          const settingKey = elem$.data("key");

          if (!settingKey || !this.settingsConfig[settingKey]) {return;}

          const settingConfig = this.settingsConfig[settingKey];

          Object.entries(settingConfig.handlers ?? {})
            .forEach(([eventName, handler]) => {
              events$[eventName] = async (thisEvent) => {
                thisEvent.preventDefault();
                await handler(thisEvent, elem$, this.data);
                if (["mouseenter", "mouseleave"].includes(eventName)) {return;}
                this.render();
              };
            });

          elem$.on(events$);
        });
      }
    };
  }

  static IsSubmenuEnabled(namespace: string, dataKey: string): boolean
  static IsSubmenuEnabled(dataKey: string): boolean
  static IsSubmenuEnabled(...args: string[]): boolean {
    if (args.length === 1) {
      args.unshift("eunos-lancer-hacks");
    }
    const [namespace, dataKey] = args as [string, string];
    const toggleKey = `${dataKey}Toggle`;

    // If no toggle key exists, this menu isn't part of this module: assume it's enabled.
    if (!game.settings.settings.has(`${namespace}.${toggleKey}`)) {return true;}

    return EunosHacksSettings.Get(namespace, toggleKey) ?? false;
  }

  static Get<T = unknown>(module: string, menuDataKey: string, propKey: string): Maybe<T>
  static Get<T = unknown>(module: string, propKey: string): Maybe<T>
  static Get<T = unknown>(propKey: string): Maybe<T>
  static Get<T = unknown>(...args: string[]): Maybe<T> {
    if (args.length === 1) {
      args.unshift("eunos-lancer-hacks");
    }
    if (!EunosHacksSettings.IsSubmenuEnabled(...args as Tuple<string>)) {
      return undefined;
    }
    if (args.length === 3) {
      // This is data stored in a submenu.
      const propKey = args.pop() as string;
      const submenuData = EunosHacksSettings.Get(...args as Tuple<string>);
      if (!submenuData) {return undefined;}
      return submenuData[propKey as keyof typeof submenuData];
    }
    if (
      !game.settings.settings.has(args.join("."))
    ) {
      console.error(`[EHS.Get] Setting ${args.join(".")} not found`);
      return undefined;
    }
    return game.settings.get(...args as [string, string]) as Maybe<T>;
  }

  static SetData(module: string, updateData: Record<string, unknown>): Promise<unknown>
  static SetData(updateData: Record<string, unknown>): Promise<unknown>
  static SetData(...args: unknown[]): Promise<unknown> {
    if (args.length === 1) {
      args.unshift("eunos-lancer-hacks");
    }
    const [module, updateData] = args as [string, Record<string, unknown>];
    return Promise.all(Object.entries(updateData)
      .map(([propKey, value]) => EunosHacksSettings.Set(module, propKey, value)
      ));
  }

  static async Set(module: string, propKey: string, value: unknown): Promise<unknown>
  static async Set(propKey: string, value: unknown): Promise<unknown>
  static async Set(...args: string[]): Promise<unknown> {
    if (args.length === 2) {
      args.unshift("eunos-lancer-hacks");
    }
    const value = args.pop();
    if (
      !game.settings.settings.has(args.join("."))
    ) {
      console.error(`[EHS.Set] Setting ${args.join(".")} not found`);
      return undefined;
    }
    return game.settings.set(...args as [string, string], value);
  }

  static RegisterSetting<T>(key: string, configData: EHS.Setting.Config<T>) {
    if (!configData.default) {
      throw new Error(`Failed to determine setting type for ${key} using provided default value: ${configData.default}`);
    }
    const settingType = getConstructor(configData.default);
    if (!settingType) {
      throw new Error(`Failed to determine setting type for ${key} using provided default value: ${configData.default}`);
    }
    const config: InexactPartial<Omit<SettingConfig<T>, "key" | "namespace">> = {
      name: key,
      scope: "world",
      config: true,
      type: settingType,
      ...configData
    };

    game.settings.register("eunos-lancer-hacks", key, config);
  }

  static RegisterSettingsMenu(
    key: string,
    menuData: EHS.Submenu.Config,
    settingsData: List<EHS.Submenu.Setting.Config<unknown, InputType>>,
    settingsToStore: Array<Tuple<string> | Threeple<string>>
  ) {
    const menuApp = EunosHacksSettings.BuildSubmenuApplication(key, menuData, settingsData, settingsToStore);

    game.settings.register("eunos-lancer-hacks", menuApp.toggleKey, {
      scope: "world",
      config: true,
      type: Boolean,
      default: false,
      onChange: (value: boolean) => {
        if (value) {
          menuApp.Enable();
        } else {
          menuApp.Disable();
        }
      }
    });

    game.settings.register("eunos-lancer-hacks", menuApp.storageKey, {
      scope: "world",
      config: false,
      type: Object,
      default: {}
    });

    const menuConfig: ClientSettings.PartialSettingSubmenuConfig = {
      label: menuData.label ?? menuData.name,
      icon: "fa-duotone fa-gear",
      type: menuApp,
      restricted: true,
      ...menuData
    };

    const settingConfig: ClientSettings.PartialSettingConfig = {
      scope: "world",
      config: false,
      type: Object,
      default: menuApp.DefaultData
    };

    console.log(`Registering Menu "${key}Menu"`, menuConfig, settingsToStore);
    game.settings.registerMenu("eunos-lancer-hacks", `${key}Menu`, menuConfig);
    console.log(`Registering Setting "${key}"`, settingConfig);
    game.settings.register("eunos-lancer-hacks", key, settingConfig);
  }
}
