// @ts-nocheck
/**
 * This is a template for generating classes for the Eunos Lancer Hacks module
 * that adhere to the common format expected by @see {@link ../src/ts/eunos-lancer-hacks.ts}.
 *
 * Find and replace all placeholders by searching for '@@@' markers.
 *
 * Delete this comment block and the @ts-nocheck above.
 */

// #region ▮▮▮▮▮▮▮ IMPORTS ▮▮▮▮▮▮▮ ~
import {InputType} from /* @@@ */ "../core/utilities";
// #endregion ▮▮▮▮[IMPORTS]▮▮▮▮
// #region ▮▮▮▮▮▮▮ TYPES ▮▮▮▮▮▮▮ ~
declare global {
  namespace /* @@@ */ __NAMESPACE__ {

  }
}
// #endregion ▮▮▮▮[TYPES]▮▮▮▮
// #region ▮▮▮▮▮▮▮ CONSTANTS ▮▮▮▮▮▮▮ ~
/* @@@ Any constants that are used in the class */
// #endregion ▮▮▮▮[CONSTANTS]▮▮▮▮

export default class /* @@@ */ __CLASS_NAME__ {

  // #region ▶▶►► Class Identity ~
  /**
   * A string key which uniquely identifies this class.
   * @type {string}
   */
  public static readonly id: string = /* @@@ */"__CLASS_ID__";

  /**
   * Represents the human-readable title of the class, which is used in menu headers and similar UI components.
   * @type {string}
   */
  public static readonly title: string = /* @@@ */"__CLASS_TITLE__";

  /**
   * Gets the last part of the class name after the underscore. Used to construct settings keys and similar.
   * @returns {string} The substring after the last underscore in the class name.
   * @example If the class name is "Hack_FooBar", it returns "FooBar". The toggle setting will be stored under "toggleFooBar", etc.
   */
  static get simpleClassName(): string {
    return this.constructor.name.split(/_/).pop() ?? "";
  }
  // #endregion Class Identity
  // #region ▶▶►► Environment Viability Checks ~
  // #region     ►►►► Dependency Checks ~
  /**
   * The list of dependencies for the module.
   * @type {string[]}
   */
  private static readonly _dependencyList: EHS.DependencyData[] = [
    /* @@@ Insert dependencies here, with the format:
     {
       id: string; // The module/system ID as defined in package manifest
       type: "system"|"module"; // The type of dependency
       display: string; // The human-readable name of the dependency
     }
     */
  ];

  /**
   * Gets the dependencies of the module.
   * @returns {string[]} The dependencies as an array of strings.
   */
  public static get dependencies(): EHS.DependencyData[] {
    return this._dependencyList;
  }

  /**
   * Gets the disabled dependencies of the module.
   * @returns {string[]} The disabled dependencies as an array of strings.
   */
  private static get _disabledDependencies(): string[] {
    return this.dependencies
      .filter((dependency) => !game.modules.has(dependency.id))
      .map((dependency) => dependency.display);
  }
  // #endregion  Dependency Checks
  // #region     ►►►► Enable Checks ~
  /**
   * Checks if all dependencies are enabled for the module.
   * @returns {boolean} True if all dependencies are enabled, false otherwise.
   */
  static get canEnable(): boolean {
    return this._disabledDependencies.length === 0;
  }

  /**
   * Checks if the module is enabled.
   * @returns {boolean} True if the module is enabled, false otherwise.
   */
  static isEnabled(): boolean {
    return this.canEnable
      && (!game.settings.settings.has(`eunos-lancer-hacks.toggle${this.simpleClassName}`)
        || game.settings.get("eunos-lancer-hacks", `toggle${this.simpleClassName}`) === true);
  }
  // #endregion  Enable Checks
  // #endregion Environment Viability Checks

  // #region ****** INITIALIZATION ****** ~
  /**
   * Initializes the component if all dependencies are enabled and the component itself is enabled.
   * It registers templates, settings, and hooks related to the component.
   * @returns {Promise<void>} A promise that resolves when the initialization process is complete or exits early if conditions are not met.
   */
  public static async Initialize(): Promise<void> {
    // Check if the component can be enabled based on dependencies
    if (!this.canEnable) {
      ui.notifications?.error(`'${this.constructor.name}' disabled. (Required dependencies are disabled: ${this._disabledDependencies.join(", ")}`);
      return;
    }

    // Load templates related to this component
    void this._registerTemplates();

    // Register settings related to this component
    this._registerSettings();

    // Check if component is enabled before continuing
    if (!this.isEnabled) {
      return;
    }

    // Register hooks related to this component
    this.RegisterHooks();
  }

  /**
   * Asynchronously registers the Handlebars templates required by the component.
   * @returns {Promise<void>} A promise that resolves when the templates are loaded.
   */
  private static _registerTemplates(): Promise<Handlebars.TemplateDelegate[]>|undefined {
    return loadTemplates([
      /* @@@ */ "modules/eunos-lancer-hacks/templates/ ... .hbs"
    ]);
    return Promise.resolve(undefined); // Return if no templates required.
  }

  /**
   * Registers the settings for the component using the Foundry VTT settings system.
   */
  private static _registerSettings(): void {
    ELH.Settings.RegisterSettingsMenu(
      this.id,
      {
        name: this.title,
        hint: /* @@@ */ "__DESCRIPTION__",
        icon: /* @@@ */ "__ICON__", /* e.g. "fa-duotone fa-eye" */
        toggleDefault: /* @@@ */ true,
        dependencies: this.dependencies,
        onEnable: async () => {
          ui.notifications.info(`Enabling ${this.title}...`);
          this.RegisterHooks();
          await this.Apply();
          ui.notifications.info(`${this.title} enabled successfully.`);
        },
        onDisable: async () => {
          ui.notifications.info(`Disabling ${this.title}...`);
          this.UnregisterHooks();
          await this.Revert();
          ui.notifications.info(`${this.title} disabled successfully.`);
        },
        onRefresh: async () => {
          ui.notifications.info(`Refreshing ${this.title}...`);
          await this.Refresh();
          ui.notifications.info(`${this.title} refreshed successfully.`);
        }
      },
      {
        /** @@@ Add submenu Config settings here, in the following format:
        settingName: {
          name: "Title",
          hint: "Description.",
          scope: "world",
          config: true,
          default: true,
          type: Boolean,
          inputType: InputType.Checkbox,

          choices: Record<string, string>,  // For InputType.Select only
          icon: string,                     // For InputType.Button only

          handlers: { // Events triggered as soon as the inputType element is changed.
            click: (event, elem$, data) => {
              // Handle click event
            },
            contextmenu: (event, elem$, data) => {
              // Handle context menu event
            },
            change: (event, elem$, data) => {
              // Handle change event
            },
            mouseenter: (event, elem$, data) => {
              // Handle mouse enter event
            },
            mouseleave: (event, elem$, data) => {
              // Handle mouse leave event
            },
          },
          onEnable: async () => {
            // Perform actions when the setting is enabled
          },
          onDisable: async () => {
            // Perform actions when the setting is disabled
          },
          onRefresh: async () => {
            // Perform actions when the setting is refreshed
          },
        }
        */
      },
      [
        /** @@@ Add settings changed by this class so they can be reverted, in the following format:
         ["module_id", "setting_key"]
        */
      ]
    );
  }
  // #endregion ***[INITIALIZATION]***
  // #region ****** HOOKS ****** ~
  /**
   *
   * @example Using a callback type with a static name:
   * Hooks.on('updateWorldTime', (worldTime, dt) => {
   *   // [...]
   * })
   *
   * @example Using a callback with a dynamic name:
   * Hooks.on<Hooks.GetCompendiumDirectoryEntryContext>('getJournalEntryContext', (jq, entryOptions) => {
   *   // [...]
   * })
   *
   * @example Using a callback with a dynamic name and generic parameter
   * Hooks.on<Hooks.CloseApplication<FormApplication>>('closeFormApplication', (app, jq) => {
   *   // [...]
   * })
  **/
  private static readonly _registeredHookIDs: Array<Tuple<string, number>> = [];
  private static readonly registeredHooks: {
    /* @@@ Define types, in the following format:
    hookName: Hooks.RefreshPlaceableObject<EunosLancerToken> // (for example)
    */
  } = {
    /** @@@ Add hooks here, in the following format:
    hookName: async (...args: any[]) => {
      // Handle hook
    }
    */
  };

  static RegisterHooks() {
    for (const [name, hook] of Object.entries(this.registeredHooks)) {
      this._registeredHookIDs.push([name, Hooks.on(name, hook)]);
    }
  }

  static UnregisterHooks() {
    this._registeredHookIDs.forEach(([name, id]) => Hooks.off(name, id));
  }
  // #endregion ***[HOOKS]***
  // #region ***** APPLY, REVERT, REFRESH ****** ~
  /**
   * Applies the changes to the system.
   * @returns {Promise<void>} A promise that resolves when the changes are applied.
   */
  public static async Apply(): Promise<void> {
    // @@@ Implement changes to the system
    return Promise.resolve(true);
  }

  /**
   * Reverts the changes to the system.
   * @returns {Promise<void>} A promise that resolves when the changes are reverted.
   */
  public static async Revert(): Promise<void> {
    // @@@ Implement changes to the system
    return Promise.resolve(true);
  }

  /**
   * Refreshes the component.
   * @returns {Promise<void>} A promise that resolves when the component is refreshed.
   */
  public static async Refresh(): Promise<true> {
    // @@@ Implement changes to the system
    return Promise.resolve(true);
  }
  // #endregion ***[APPLY, REVERT, REFRESH]***

}