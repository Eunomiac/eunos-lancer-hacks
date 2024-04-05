import C from "../core/constants";
import Hack_BarBrawl from "../module-hacks/barbrawl";

declare global {
  type SettingType<T = unknown> = SettingConfig<T>["type"];

  type SettingsActionFunctionData = Record<string, {
    click?: (event: Event, elem$: JQuery<HTMLElement>) => void;
    contextmenu?: (event: Event, elem$: JQuery<HTMLElement>) => void;
    change?: (event: Event, elem$: JQuery<HTMLElement>) => void;
  }>;


  interface EunosSettingConfig<T> extends Partial<Omit<SettingConfig<T>, "key"|"namespace"|"type">> {
    default: T;
  }

  interface EunosSubmenuSettingConfig {
    type: "Button"|"Select"|"Text"|"Number"|"File"|"Color"|"Checkbox";
    icon?: string;
    actions?: {
      click?: (event: Event) => void;
      contextmenu?: (event: Event) => void;
      change?: (event: Event) => void;
    };
    name?: string;
    hint?: string;
    default?: unknown;
    value?: unknown;
    choices?: Array<{name: string, display: string}>
  }

  interface EunosSubmenuConfig extends Partial<Omit<SettingSubmenuConfig, "key"|"namespace"|"type">> {
    name: string,
    template?: string
  }
}

/**
 * Gets the constructor of the given value.
 * For primitive values, it returns their wrapper object constructors (Number, String, Boolean).
 * For object types, it returns their constructor directly.
 * @param {T} value - The value to get the constructor of.
 * @returns {SettingType<T> | null} The constructor of the value, or null if it cannot be determined.
 */
function getConstructor<T>(value: T): SettingType<T> | null {
  if (value === null || value === undefined) { return null; }
  switch (typeof value) {
    case "string": return String as SettingType<T>;
    case "number": return Number as SettingType<T>;
    case "boolean": return Boolean as SettingType<T>;
    case "object": return (Array.isArray(value) ? Array : value.constructor) as SettingType<T>;
    default: return null;
  }
}

export default class EunosHacksSettings {

  static Initialize(): Promise<unknown> {
    return loadTemplates([
      this.defaultTemplate,
      ...Object.values(this.customTemplates)
    ]);
  }

  static defaultTemplate = "modules/eunos-lancer-hacks/templates/settings/default-submenu.hbs";

  static customTemplates: Record<string, string> = {};

  static GetSubmenuType(key: string, menuConfig: EunosSubmenuConfig, actionFunctions: SettingsActionFunctionData) {
    return class extends FormApplication {

      constructor(object = {}, formApplicationOptions = {}) {
        super(object, formApplicationOptions);
      }

      /**
     * Default Options for this FormApplication
     */
      static override get defaultOptions() {
        return mergeObject(super.defaultOptions, {
          id:             `${key}Menu`,
          title:          menuConfig.name,
          popOut:         true,
          template:       menuConfig.template ?? EunosHacksSettings.defaultTemplate,
          classes:        ["eunos-blades", "settings"],
          width:          500,
          closeOnSubmit:  true,
          submitOnChange: false,
          submitOnClose:  true
        });
      }

      /**
      * Provide data to the template
      */
      override async getData() {
        // const superData = await super.getData();
        const settingsData = game.settings.get("eunos-lancer-hacks", key) as List<EunosSubmenuSettingConfig>;
        console.log(`getData settingsData: ${key}`, settingsData);
        return settingsData as unknown as ReturnType<FormApplication["getData"]>;
      }

      /**
       * Executes on form submission.
       * @param _event - the form submission event
       * @param formData - the form data
       */
      override async _updateObject(_event: Event, formData: Record<string, unknown>|undefined) {
        if (!formData) { return; }
        console.log("Form Data", {received: formData, expanded: expandObject(formData)});
        const data = await this.getData();
        Object.entries(expandObject(formData)).forEach(([settingKey, value]: [keyof List<EunosSubmenuSettingConfig>, unknown]) => {
          const setting = data[settingKey as keyof typeof data & keyof List<EunosSubmenuSettingConfig>];
          if (setting && typeof setting === "object" && "value" in setting) {
            (setting as EunosSubmenuSettingConfig).value = value;
          }
        });
        game.settings.set("eunos-lancer-hacks", key, data);
      }

      override async activateListeners(html: JQuery) {
        super.activateListeners(html);

        html.find("[data-key]").each((_i, elem) => {
          const elem$ = $(elem);
          const events$: JQuery.TypeEventHandlers<HTMLElement, undefined, HTMLElement, HTMLElement> = {};
          const settingKey = elem$.data("key");

          if (!settingKey) { return; }

          const actionFunctionData = actionFunctions[settingKey];
          const {click, contextmenu, change} = actionFunctionData;

          if (click) {
            events$.click = async (event: Event) => {
              event.preventDefault();
              await click(event, elem$);
            };
          }

          if (contextmenu) {
            events$.contextmenu = (event: Event) => {
              event.preventDefault();
              contextmenu(event, elem$);
            };
          }

          if (change) {
            events$.change = (event: Event) => {
              event.preventDefault();
              change(event, elem$);
            };
          }

          elem$.on(events$);
        });
      }
    };
  }

  static RegisterSetting<T>(key: string, configData: EunosSettingConfig<T>) {
    const settingType = getConstructor(configData.default);
    if (!settingType) {
      throw new Error(`Failed to determine setting type for ${key} using provided default value: ${configData.default}`);
    }
    const config: InexactPartial<Omit<SettingConfig<T>, "key"|"namespace">> = {
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

  static SubmenuGet(menuKey: string): List<EunosSubmenuSettingConfig>
  static SubmenuGet(menuKey: string, dataKey: string): EunosSubmenuSettingConfig
  static SubmenuGet(menuKey: string, dataKey?: string) {
    return game.settings.get("eunos-lancer-hacks", [menuKey, dataKey].filter(Boolean).join("."));
  }

  static async SubmenuSet(menuKey: string, value: List<EunosSubmenuSettingConfig>): Promise<unknown>
  static async SubmenuSet(menuKey: string, dataKey: string, value: DeepPartial<EunosSubmenuSettingConfig>): Promise<unknown>
  static async SubmenuSet(menuKey: string, dataKey: string, propKey: string, value: unknown): Promise<unknown>
  static async SubmenuSet(...args:
      [string, DeepPartial<List<EunosSubmenuSettingConfig>>]
    | [string, string, DeepPartial<EunosSubmenuSettingConfig>]
    | [string, string, string, unknown]): Promise<unknown> {
    const value = args.pop();
    return game.settings.set("eunos-lancer-hacks", args.filter(Boolean).join("."), value);
  }

  static RegisterSettingsMenu(key: string, menuData: EunosSubmenuConfig, settingsData: List<EunosSubmenuSettingConfig>, actionFunctions: SettingsActionFunctionData) {

    const menuConfig: ClientSettings.PartialSettingSubmenuConfig = {
      label: menuData.label ?? menuData.name,
      icon: "fa-duotone fa-gear",
      type: EunosHacksSettings.GetSubmenuType(key, menuData, actionFunctions),
      restricted: true,
      ...menuData
    };

    const settingConfig: ClientSettings.PartialSettingConfig = {
      scope: "world",
      config: false,
      type: Object,
      default: settingsData
    };

    console.log(`Registering Menu "${key}Menu"`, menuConfig);
    game.settings.registerMenu("eunos-lancer-hacks", `${key}Menu`, menuConfig);
    console.log(`Registering Setting "${key}"`, settingConfig);
    game.settings.register("eunos-lancer-hacks", key, settingConfig);
  }
}
