import C from "../core/constants";
import Hack_BarBrawl from "../module-hacks/barbrawl";

declare global {
  namespace EHS {

    namespace Submenu {
      type Type = ReturnType<(typeof EunosHacksSettings)["GetSubmenuApplication"]>;

      interface Config extends Omit<SettingSubmenuConfig, "key"|"namespace"|"type"|"name"> {
        name: string;
        type?: Type;
        default?: Omit<Data, "storedData">;
        template?: string;
      }

      interface Params extends Config {
        key: string;
        namespace: string;
        type: Type;
        template: string;
        default: Omit<Data, "storedData">
      }

      type Data = List<Setting.Data> & {storedData?: List<Setting.Data>};

      type Context = Awaited<ReturnType<FormApplication["getData"]>>
        & List<object | string | Setting.Context, string>;

      namespace Setting {
        interface ConfigBase<T, I extends InputType> extends Omit<SettingConfig<T>, "key" | "namespace" | "scope" | "choices"> {
          inputType: I,
          handlers?: {
            click?: (event: JQuery.Event, elem$: JQuery<HTMLElement>, data: EHS.Submenu.Data) => void;
            contextmenu?: (event: JQuery.Event, elem$: JQuery<HTMLElement>, data: EHS.Submenu.Data) => void;
            change?: (event: JQuery.Event, elem$: JQuery<HTMLElement>, data: EHS.Submenu.Data) => void;
            mouseenter?: (event: JQuery.Event, elem$: JQuery<HTMLElement>, data: EHS.Submenu.Data) => void;
            mouseleave?: (event: JQuery.Event, elem$: JQuery<HTMLElement>, data: EHS.Submenu.Data) => void;
          };
          onMenuToggle?: (isEnabled: boolean) => Promise<void>;
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

export default class EunosHacksSettings {

  static get InputType() { return InputType; }

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

  private static _getSubMenuElems$(html$: JQuery<HTMLElement>): Array<Tuple<JQuery<HTMLElement>>> {
    const container$ = html$
      .find(".categories > .scrollable .tab[data-tab='eunos-lancer-hacks'] > .module-settings-wrapper");
    return Array.from(container$.find(".form-group.submenu"))
      .map((subMenu) => {
        const subMenu$ = $(subMenu);
        const {toggleKey} = this._getSubMenuKeys(subMenu$);
        return [
          subMenu$,
          container$.find(`[name='eunos-lancer-hacks.${toggleKey}']`).closest(".form-group")
        ] as const;
      });
  }

  private static _getSubMenuData(dataKey: string): EHS.Submenu.Data {
    return game.settings.get("eunos-lancer-hacks", dataKey) as EHS.Submenu.Data;
  }

  private static _getSubMenuParams(menuKey: string): EHS.Submenu.Params {
    return game.settings.menus.get(`eunos-lancer-hacks.${menuKey}`) as EHS.Submenu.Params;
  }

  private static _getSubMenuApp(menuKey: string): ReturnType<typeof EunosHacksSettings.GetSubmenuApplication> {
    return this._getSubMenuParams(menuKey).type;
  }

  private static _reorderNavTabs(html$: JQuery<HTMLElement>) {
    // Rearrange settings navigation
    const sidebar$ = html$.find(".sidebar");
    const lancerTabButton$ = sidebar$.find(".item.category-tab[data-tab='system']");
    const eTabButton$ = sidebar$.find(".item.category-tab[data-tab='eunos-lancer-hacks']");
    eTabButton$.insertAfter(lancerTabButton$);
  }

  private static _refreshSubMenuToggle([subMenu$, toggleGroup$]: Tuple<JQuery<HTMLElement>>) {
    const toggleControl$ = toggleGroup$.find("[type='checkbox']");
    const isChecked = toggleControl$.prop("checked");
    subMenu$.toggleClass("eunos-submenu-disabled", !isChecked);
    const {menuKey} = this._getSubMenuKeys(subMenu$);
    if (!menuKey) {
      throw new Error(`Failed to get menuKey for subMenu$: ${subMenu$}`);
    }
    const subMenuApp = this._getSubMenuApp(menuKey);
    if (subMenuApp.IsEnabled !== isChecked) {
      if (isChecked) {
        subMenuApp.Enable();
      } else {
        subMenuApp.Disable();
      }
    }
    return isChecked;
  }

  private static _addSubMenuListeners(toggleGroup$: JQuery<HTMLElement>) {
    const toggleControl$ = toggleGroup$.find("[type='checkbox']");

  }

  private static _formatSubMenu([subMenu$, toggleGroup$]: Tuple<JQuery<HTMLElement>>) {
    subMenu$.addClass("eunos-submenu");
    const isChecked = this._refreshSubMenuToggle([subMenu$, toggleGroup$]);
    this._addSubMenuListeners(toggleGroup$);
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

  static OldInitialize(): Promise<unknown> {

    Hooks.on("renderSettingsConfig", (_sConfig: never, html$: JQuery<HTMLElement>) => {

      // Rearrange settings navigation
      const sidebar$ = html$.find(".sidebar");
      const lancerTabButton$ = sidebar$.find(".item.category-tab[data-tab='system']");
      const eTabButton$ = sidebar$.find(".item.category-tab[data-tab='eunos-lancer-hacks']");
      eTabButton$.insertAfter(lancerTabButton$);

      // Move setting toggles to left of setting submenus
      const container$ = html$.find(".categories > .scrollable");
      const eSettingsContainer$ = container$.find(".tab[data-tab='eunos-lancer-hacks'] > .module-settings-wrapper");
      const subMenus$ = eSettingsContainer$.find(".form-group.submenu");
      subMenus$.each((_i, subMenu) => {
        const subMenu$ = $(subMenu);
        subMenu$.addClass("eunos-submenu");
        const menuKey = subMenu$.find("[data-key]").data("key");
        if (!menuKey) {return;}
        const toggleKey = menuKey.replace("Menu", "Toggle");
        const toggleFormGroup$ = eSettingsContainer$.find(`[name='${toggleKey}']`).closest(".form-group");
        toggleFormGroup$.addClass("eunos-submenu-toggle");
        subMenu$.add(toggleFormGroup$).wrapAll("<div class='eunos-form-group-wrapper'></div>");

        const toggleControl$ = toggleFormGroup$.find("[type='checkbox']");
        const isChecked = toggleControl$.prop("checked");

        if (!isChecked) {
          subMenu$.addClass("eunos-submenu-disabled");
        }

        // Add event listener to toggleControl$ that enables/disables submenuButton$ depending on whether it is checked
        toggleControl$.on("change", () => {
          const newValue = toggleControl$.prop("checked");
          subMenu$.toggleClass("eunos-submenu-disabled", !newValue);
          EunosHacksSettings.ToggleSubmenu(menuKey.split(".").pop().replace("Menu", ""), newValue);
        });
      });
    });

    return loadTemplates([
      this.defaultTemplate,
      ...Object.values(this.customTemplates)
    ]);
  }

  static defaultTemplate = "modules/eunos-lancer-hacks/templates/settings/default-submenu.hbs";

  static customTemplates: Record<string, string> = {};

  static GetSubmenuApp(menuKey: string) {

  }

  static ToggleSubmenu(menuKey: string, state: boolean) {
    const submenuApp = this._getSubMenuApp(menuKey);
    if (state) {
      submenuApp.Enable();
    } else {
      submenuApp.Disable();
    }
  }

  static GetSubmenuApplication(
    dataKey: string,
    menuConfig: EHS.Submenu.Config,
    settingsConfig: List<EHS.Submenu.Setting.Config<unknown, InputType>>
  ) {
    return class EunosSubmenuApp extends FormApplication {

      static readonly key = dataKey;
      static get dataKey(): string {return this.key;}
      static get menuKey(): string {return `${this.key}Menu`;}
      static get toggleKey(): string {return `${this.key}Toggle`;}
      static get storageKey(): string {return `${this.key}Storage`;}

      static readonly menuConfig = menuConfig;
      static readonly settingsConfig = settingsConfig;

      static get Data(): EHS.Submenu.Data {
        return game.settings.get("eunos-lancer-hacks", this.dataKey) as EHS.Submenu.Data;
      }

      static get DefaultData(): EHS.Submenu.Data {
        return Object.fromEntries(
          Object.entries(this.settingsConfig)
            .map(([settingKey, setting]) => [settingKey, setting.default])
            .filter(([key, value]) => key !== "storedData" && value !== undefined)
        );
      }

      static StoreData(data: EHS.Submenu.Data) {
        const {storedData, ...menuData} = data;
        data.storedData = menuData;
        EunosHacksSettings.SubmenuSet(this.dataKey, data);
      }

      static get StoredData(): EHS.Submenu.Data {
        const storedData = EunosHacksSettings.SubmenuGet(this.dataKey, "storedData") ?? {};
        return {...this.DefaultData, ...storedData};
      }

      static get IsEnabled(): boolean {
        return game.settings.get("eunos-lancer-hacks", this.toggleKey) as boolean;
      }

            /*
      When submenu disabled:
        - Store existing data in a 'config: false' setting called 'storedData'
        - Call 'onMenuToggle' on all settings in submenu
      */
      static async Disable() {
        await this.StoreData(this.Data);
        game.settings.set("eunos-lancer-hacks", this.toggleKey, false);
        return Promise.all(
          Object.values(this.settingsConfig)
            .map(async (setting) => setting.onMenuToggle?.(false))
        );
      }

      /*
      When submenu enabled:
        - Set data to 'storedData', or 'DefaultData' if no storedData to be found
        - Call 'onMenuToggle' on all settings in submenu

      static getter StoredData() returns either stored data if present, or default data if not.
      */
     static async Enable() {
      await EunosHacksSettings.SubmenuSet(this.dataKey, this.StoredData);
      await game.settings.set("eunos-lancer-hacks", this.toggleKey, true);
      return Promise.all(
        Object.values(this.settingsConfig)
          .map(async (setting) => setting.onMenuToggle?.(true))
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

      get toggleData(): boolean {return game.settings.get("eunos-lancer-hacks", this.toggleKey) as boolean;}
      set toggleData(value: boolean) {game.settings.set("eunos-lancer-hacks", this.toggleKey, value);}

      get data(): EHS.Submenu.Data {return game.settings.get("eunos-lancer-hacks", this.dataKey) as EHS.Submenu.Data;}
      set data(value: EHS.Submenu.Data) {game.settings.set("eunos-lancer-hacks", this.dataKey, value);}

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
          ...contextData
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
        const data = await this.getData();
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

  static IsSubmenuEnabled(menuKey: string): boolean {
    return game.settings.get("eunos-lancer-hacks", `${menuKey}Toggle`) as boolean;
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

  static Get<T = unknown>(module: string, propKey: string): Maybe<T>
  static Get<T = unknown>(propKey: string): Maybe<T>
  static Get<T = unknown>(...args: string[]): Maybe<T> {
    if (args.length === 1) {
      args.unshift("eunos-lancer-hacks");
    }
    const toggleKey = `${args[1]}Toggle`;
    if (
      game.settings.settings.has(`${args[0]}.${toggleKey}`)
      && !game.settings.get(args[0], toggleKey)
    ) {return undefined;}
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
      .map(([propKey, value]) => game.settings.set(module, propKey, value)));
  }

  static Set(module: string, propKey: string, value: unknown): Promise<unknown>
  static Set(propKey: string, value: unknown): Promise<unknown>
  static Set(...args: string[]): Promise<unknown> {
    if (args.length === 2) {
      args.unshift("eunos-lancer-hacks");
    }
    return game.settings.set(...args as [string, string, unknown]);
  }

  static SubmenuGet(menuKey: string): Maybe<EHS.Submenu.Data>
  static SubmenuGet(menuKey: string, dataKey: string): Maybe<EHS.Submenu.Data>
  static SubmenuGet(menuKey: string, dataKey?: string): Maybe<EHS.Submenu.Data> | Maybe<EHS.Submenu.Setting.Data> {
    const toggleKey = `${menuKey}Toggle`;
    if (
      game.settings.settings.has(`eunos-lancer-hacks.${toggleKey}`)
      && !game.settings.get("eunos-lancer-hacks", toggleKey)
    ) {return undefined;}
    return game.settings.get("eunos-lancer-hacks", [menuKey, dataKey].filter(Boolean).join("."));
  }

  static async SubmenuSet(menuKey: string, value: EHS.Submenu.Data): Promise<unknown>
  static async SubmenuSet(menuKey: string, dataKey: string, value: EHS.Submenu.Setting.Data): Promise<unknown>
  static async SubmenuSet(menuKey: string, dataKey: string, propKey: string, value: unknown): Promise<unknown>
  static async SubmenuSet(...args:
    [string, EHS.Submenu.Data]
    | [string, string, EHS.Submenu.Setting.Data]
    | [string, string, string, unknown]): Promise<unknown> {
    const value = args.pop();
    return game.settings.set("eunos-lancer-hacks", args.filter(Boolean).join("."), value);
  }

  static RegisterSettingsMenu(
    key: string,
    menuData: EHS.Submenu.Config,
    settingsData: List<EHS.Submenu.Setting.Config<unknown, InputType>>
  ) {

    const toggleConfig: SettingConfig<boolean> = {
      key: `${key}Toggle`,
      namespace: "eunos-lancer-hacks",
      scope: "world",
      config: true,
      type: Boolean,
      default: false
    };
    game.settings.register("eunos-lancer-hacks", toggleConfig.key, toggleConfig);

    const menuApp = EunosHacksSettings.GetSubmenuApplication(key, menuData, settingsData);

    const menuConfig: ClientSettings.PartialSettingSubmenuConfig = {
      label: menuData.label ?? menuData.name,
      icon: "fa-duotone fa-gear",
      type: EunosHacksSettings.GetSubmenuApplication(key, menuData, settingsData),
      restricted: true,
      ...menuData
    };

    const settingConfig: ClientSettings.PartialSettingConfig = {
      scope: "world",
      config: false,
      type: Object,
      default: menuApp.DefaultData
    };

    console.log(`Registering Menu "${key}Menu"`, menuConfig, toggleConfig);
    game.settings.registerMenu("eunos-lancer-hacks", `${key}Menu`, menuConfig);
    console.log(`Registering Setting "${key}"`, settingConfig);
    game.settings.register("eunos-lancer-hacks", key, settingConfig);
  }
}
