// #region ▮▮▮▮▮▮▮ IMPORTS ▮▮▮▮▮▮▮ ~
import {EntryType} from "machine-mind";
import {changeBrightness} from "../core/utilities";
// #endregion ▮▮▮▮[IMPORTS]▮▮▮▮

// #region ▮▮▮▮▮▮▮ TYPES ▮▮▮▮▮▮▮ ~
declare global {
  class TokenMagic {
    static hasFilterId(token: EunosLancerTokenDocument, filterId: string): boolean;
    static deleteFilters(token: EunosLancerTokenDocument, filterId: string): void;
    static updateFiltersByPlaceable(filterData: Array<Record<string, unknown>>, token: EunosLancerTokenDocument): Promise<void>;
  }

  namespace ETT {
    export interface FilterSetOptions {
      shadowConfig?: string;
      isClearingFilters?: boolean|string[];
    }
  }
}

export enum Disposition {
  Friendly = 1,
  Neutral = 0,
  Hostile = -1
}
// #endregion ▮▮▮▮[TYPES]▮▮▮▮

// #region ▮▮▮▮▮▮▮ CONSTANTS ▮▮▮▮▮▮▮ ~
const BASE_WALKING_TOKEN_SHIFT = 60;
const BASE_FLYING_TOKEN_SHIFT = 90;
const BASE_OUTLINE_THICKNESS = 1;
const PRIMARY_BRIGHTNESS_MULT = 1;
const NON_PRIMARY_BRIGHTNESS_MULT = 0.75;
const OUTLINE_ANIMATION_DURATION = 1800;

const DISPOSITION_COLORS = {
  [Disposition.Friendly]: 0x00FF00,
  [Disposition.Neutral]: 0xFFFF00,
  [Disposition.Hostile]: 0xFF0000
};
const FILTER_SETS: Record<string, (token: EunosLancerTokenDocument) => Array<Record<string, unknown>>> = {
  DropShadow(token: EunosLancerTokenDocument) {
    const filterConfig = {
      filterType: "shadow",
      filterId: "dropShadow",
      quality: 5,
      shadowOnly: false,
      color: 0x000000,
      padding: 100,
      zOrder: 6000,
      rotation: 140,
      blur: 5,
      distance: -40,
      alpha: 1
    };

    return [filterConfig];
  },
  Outline(token: EunosLancerTokenDocument) {

    const disposition = Hack_TokenTweaks.GetTokenDisposition(token);
    const outlineColor = DISPOSITION_COLORS[disposition];
    const isPrimary = Hack_TokenTweaks.IsPrimaryToken(token);
    const outlineThickness = BASE_OUTLINE_THICKNESS * (isPrimary ? 2 : 1);
    const filterConfig = {
      filterType: "outline",
      filterId: "dispositionOutline",
      padding: 100,
      color: isPrimary
        ? changeBrightness(outlineColor, PRIMARY_BRIGHTNESS_MULT)
        : changeBrightness(outlineColor, NON_PRIMARY_BRIGHTNESS_MULT),
      thickness: outlineThickness,
      quality: 1,
      zOrder: 9,
      animated: {
        thickness: {
          active: Hack_TokenTweaks.IsTokenTurn(token),
          loopDuration: OUTLINE_ANIMATION_DURATION,
          animType: "syncCosOscillation",
          val1: outlineThickness,
          val2: outlineThickness * 2
        }
      }
    };
    return [filterConfig];
  },
  Destruction(token: EunosLancerTokenDocument) {
    return [];
  }
};
// #endregion ▮▮▮▮[CONSTANTS]▮▮▮▮

export default class Hack_TokenTweaks {

  // #region ▶▶►► Class Identity ~
  /**
   * A string key which uniquely identifies this class.
   * @type {string}
   */
  public static readonly id: string = "tokenTweaks";

  /**
   * Represents the human-readable title of the class, which is used in menu headers and similar UI components.
   * @type {string}
   */
  public static readonly title: string = "Token Tweaks";

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
    {
      id: "token-magic",
      type: "module",
      display: "Token Magic"
    }
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
  private static _registerTemplates(): Promise<Handlebars.TemplateDelegate[]|undefined> {
    return Promise.resolve(undefined);
  }

  /**
   * Registers the settings for the component using the Foundry VTT settings system.
   */
  private static _registerSettings(): void {
    ELH.Settings.RegisterSettingsMenu(
      this.id,
      {
        name: this.title,
        hint: "Various tweaks to token appearances, scaling, offsets, effects.",
        icon: "fa-duotone fa-location",
        toggleDefault: true,
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
        applyDropShadow: {
          name: "Drop Shadows",
          hint: "Select which tokens to apply drop shadow filters to:",
          inputType: ELH.Settings.InputType.Select,
          default: "primary",
          choices: {
            primary: "Player Mechs & Bosses Only",
            all: "All Tokens",
            none: "None"
          },
          handlers: {
              change: async (_event, elem$, data) => {
                  const selectedValue = elem$.val() as string;
                  const currentValue = data.applyDropShadow;
                  if (currentValue !== selectedValue) {
                      ui.notifications.info(`Applying token drop shadows to ${selectedValue} tokens...`);
                      await ELH.Settings.Set("eunos-lancer-hacks", "tokenTweaks", {...data, applyDropShadow: selectedValue});
                      await Hack_TokenTweaks.ApplyFilterSet("ALL", "DropShadow", {shadowConfig: selectedValue});
                      ui.notifications.info("Token drop shadows updated successfully.");
                  }
              }
          },
          async onEnable() {
            const dropShadowConfig = ELH.Settings.Get("eunos-lancer-hacks", "tokenTweaks", "applyDropShadow") as string;
            if (!dropShadowConfig) { return Promise.resolve(); }
            ui.notifications.info(`Applying token drop shadows to ${dropShadowConfig} tokens...`);
            await Hack_TokenTweaks.ApplyFilterSet("ALL", "DropShadow", {shadowConfig: dropShadowConfig});
            ui.notifications.info("Token drop shadows updated successfully.");
          },
          async onDisable() {
            ui.notifications.info("Disabling token drop shadow configuration...");
            await Hack_TokenTweaks.ApplyFilterSet("ALL", null, {isClearingFilters: ["dropShadow"] });
            ui.notifications.info("Token drop shadows disabled successfully.");
          },
          async onRefresh() { return this.onEnable?.(); }
        },
        applyOutline: {
          name: "Outlines",
          hint: "Applies a faint, color-coded outline to tokens.",
          inputType: ELH.Settings.InputType.Checkbox,
          default: true,
          handlers: {
            change: async (_event, elem$, data) => {
              const selectedValue = elem$.prop("checked") as boolean;
              const currentValue = data.applyOutline;
              if (currentValue !== selectedValue) {
                ui.notifications.info(selectedValue ? "Applying token outlines..." : "Disabling token outlines...");
                await ELH.Settings.Set("eunos-lancer-hacks", "tokenTweaks", {...data, applyOutline: selectedValue});
                await Hack_TokenTweaks.ApplyFilterSet(
                  "ALL",
                  selectedValue ? "Outline" : null,
                  {isClearingFilters: selectedValue ? ["dispositionOutline"] : undefined}
                );
                ui.notifications.info(selectedValue ? "Token outlines applied successfully." : "Token outlines disabled successfully.");
              }
            }
          },
          async onEnable() {
            const outlineConfig = ELH.Settings.Get("eunos-lancer-hacks", "tokenTweaks", "applyOutline") as string;
            if (!outlineConfig) { return Promise.resolve(); }
            ui.notifications.info("Applying token outlines...");
            await Hack_TokenTweaks.ApplyFilterSet("ALL", "Outline");
            ui.notifications.info("Token outlines applied successfully.");
          },
          async onDisable() {
            ui.notifications.info("Disabling token outlines...");
            await Hack_TokenTweaks.ApplyFilterSet("ALL", null, {isClearingFilters: ["dispositionOutline"] });
            ui.notifications.info("Token outlines disabled successfully.");
          },
          async onRefresh() { return this.onEnable?.(); }
        },
        shiftTokenArt: {
          name: "Art Shift",
          hint: "Shifts token art upwards slightly for a 3D effect.",
          inputType: ELH.Settings.InputType.Checkbox,
          default: true,
          handlers: {
            change: async (_event, elem$, data) => {
              const isShifting = elem$.prop("checked") as boolean;
              const currentValue = data.shiftTokenArt;
              if (currentValue !== isShifting) {
                ELH.Settings.Set("eunos-lancer-hacks", "tokenTweaks", {...data, shiftTokenArt: isShifting});
                if (isShifting) {
                  ui.notifications.info("Shifting token art...");
                  await Hack_TokenTweaks.ApplyArtShift();
                  ui.notifications.info("Token art shifted successfully.");
                } else {
                  ui.notifications.info("Reverting token art shift...");
                  await Hack_TokenTweaks.RevertArtShift();
                  ui.notifications.info("Token art shift reverted successfully.");
                }
              }
            }
          },
          async onEnable() {
            const isShifting = ELH.Settings.Get("eunos-lancer-hacks", "tokenTweaks", "shiftTokenArt") as boolean;
            if (!isShifting) { return Promise.resolve(); }
            ui.notifications.info("Shifting token art...");
            await Hack_TokenTweaks.ApplyArtShift();
            ui.notifications.info("Token art shifted successfully.");
          },
          async onDisable() {
            ui.notifications.info("Reverting token art shift...");
            await Hack_TokenTweaks.RevertArtShift();
            ui.notifications.info("Token art shift reverted successfully.");
          },
          async onRefresh() {
            const isShifting = ELH.Settings.Get("eunos-lancer-hacks", "tokenTweaks", "shiftTokenArt") as boolean;
            if (isShifting) {
              return this.onEnable?.();
            } else {
              return this.onDisable?.();
            }
          }
        }
      },
      [
        ["hex-size-support", "pivoty"]
      ]
    );
  }
  // #endregion ***[INITIALIZATION]***
  // #region ****** HOOKS ****** ~
  private static readonly _registeredHookIDs: Array<Tuple<string, number>> = [];
  static readonly registeredHooks: {
    preUpdateToken: Hooks.PreUpdateDocument<typeof LancerTokenDocument>
  } = {
    preUpdateToken: (lToken, change, {diff}) => {
      const token = lToken as EunosLancerTokenDocument;
      console.log("*** ELH: Hack_TokenTweaks.updateToken ***", {token, change});
      // Verify component is active
      if (!this.isEnabled) { return true; }
      if (!change || !diff) { return true; }
      const {actor} = token;
      if (!actor) { return true; }

      const {overlayEffect} = change;
      if (overlayEffect === "icons/svg/skull.svg") {
        token.setFlag("eunos-lancer-hacks", "storedData", {
          disposition: token.data.disposition,
          scale: token.data.texture.scaleX ?? 1,
          artShift: token.getFlag("hex-size-support", "pivoty"),
          isFlying: token.getFlag("eunos-lancer-hacks", "isFlying")
        });
        Object.assign(
          change,
          {
            disposition: Disposition.Neutral,
            overlayEffect: ""
          }
        );

        actor.remove_all_active_effects().then(() => {
          Hack_TokenTweaks.ApplyFilterSet(token, "Destruction", {isClearingFilters: true});
          Hack_TokenTweaks.RevertArtShift(token);
          Hack_TokenTweaks.DisableHoverEffects(token);
        });
        return true;
      }

      return true;
    }
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
    await Promise.all((game.scenes ?? [])
        .map((s: Scene) => Promise.all(s.tokens
          .map(async (t: LancerTokenDocument) => {
            return Hack_TokenTweaks.ApplyTokenTweaks(t as EunosLancerTokenDocument);
          })
        ))
    );
  }

  /**
   * Reverts the changes to the system.
   * @returns {Promise<void>} A promise that resolves when the changes are reverted.
   */
  public static async Revert(): Promise<void> {
    await Promise.all((game.scenes ?? [])
        .map((s: Scene) => Promise.all(s.tokens
          .map(async (t: LancerTokenDocument) => {
            return Hack_TokenTweaks.DisableTokenTweaks(t as EunosLancerTokenDocument);
          })
        ))
    );
  }

  /**
   * Refreshes the component.
   * @returns {Promise<void>} A promise that resolves when the component is refreshed.
   */
  public static async Refresh(): Promise<void> {
    await Promise.all((game.scenes ?? [])
        .map((s: Scene) => Promise.all(s.tokens
          .map(async (t: LancerTokenDocument) => {
            return Hack_TokenTweaks.ApplyTokenTweaks(t as EunosLancerTokenDocument, true);
          })
        ))
    );
  }
  // #endregion ***[APPLY, REVERT, REFRESH]***

  static GetTokenDisposition(token: EunosLancerTokenDocument) {
    return token.data.disposition;
  }
  static IsPrimaryToken(token: EunosLancerTokenDocument) {
    if (token.hasPlayerOwner && token.actor?.type === EntryType.MECH) { return true; }
    if (token.actor?.type === EntryType.NPC /* && isBoss(token.actor) */) { return true; }
    return false;
  }
  static IsTokenTurn(token: EunosLancerTokenDocument) {
    return false;
  }
  static IsFlyingToken(token: EunosLancerTokenDocument) {
    return token.getFlag("eunos-lancer-hacks", "isFlying") ?? false;
  }
  static GetTokenScale(token: EunosLancerTokenDocument) {
    return token.data.texture.scaleX ?? 1;
  }
  static GetTokenArtShift(token: EunosLancerTokenDocument) {
    return token.getFlag("hex-size-support", "pivoty") ?? 0;
  }

  static async ApplyTokenTweaks(token: EunosLancerTokenDocument, isRefreshing = false): Promise<unknown> {

    const updateData: Record<string, unknown> = {};
    const filterData: Array<Record<string, unknown>> = [];

    // Determine whether this is a player-controlled character
    if (token.hasPlayerOwner) {
      // If so: Friendly disposition, no name display
      updateData.disposition = CONST.TOKEN_DISPOSITIONS.FRIENDLY;
      updateData.displayName = CONST.TOKEN_DISPLAY_MODES.NONE;
    } else {
      // Otherwise, read disposition from token
      updateData.disposition = token.data.disposition;
    }

    // If applying outline, apply it; otherwise, clear it.
    if (ELH.Settings.Get("tokenTweaks", "applyOutline")) {
      if (isRefreshing || !TokenMagic.hasFilterId(token, "dispositionOutline")) {
        filterData.push(...(this.GetFilterSet(token, "Outline").flat()));
      }
    } else if (TokenMagic.hasFilterId(token, "dispositionOutline")) {
      this.ApplyFilterSet(token, null, {isClearingFilters: ["dispositionOutline"] });
    }

    // If adjusting image y-level, apply it; otherwise, clear it.
    if (ELH.Settings.Get("tokenTweaks", "shiftTokenArt")) {
      this.ApplyArtShift(token);
    } else {
      this.RevertArtShift(token);
    }

    // Check if the updateData object is empty
    if (Object.keys(updateData).length > 0) {
      token.update(updateData);
    }
    if (filterData.length > 0) {
      await TokenMagic.updateFiltersByPlaceable(filterData, token);
    }
    return undefined;
  }
  static async DisableTokenTweaks(token: EunosLancerTokenDocument): Promise<unknown> {
    return Promise.resolve();
  }

  static GetFilterSet(
    token: EunosLancerTokenDocument,
    setId: keyof typeof FILTER_SETS
  ) {
    if (!setId) { return []; }
    return [FILTER_SETS[setId](token)];
  }
  static async ApplyFilterSet(
    tokens: EunosLancerTokenDocument|EunosLancerTokenDocument[]|"ALL",
    setId: keyof typeof FILTER_SETS | null,
    options: ETT.FilterSetOptions = {}
  ) {
    return Promise.resolve();
  }

  static async ApplyArtShift(token?: EunosLancerTokenDocument): Promise<unknown> {
    if (!token) {
      return Promise.all((game.scenes ?? [])
        .map((s: Scene) => Promise.all(s.tokens
          .map((t: LancerTokenDocument) => this.ApplyArtShift(t as EunosLancerTokenDocument))
        ))
        .flat(2)
      ).then(() => {});
    }
    const isFlying = this.IsFlyingToken(token);
    const tokenScale = this.GetTokenScale(token);
    const yShift = (isFlying ? BASE_FLYING_TOKEN_SHIFT : BASE_WALKING_TOKEN_SHIFT) * tokenScale;
    if (this.GetTokenArtShift(token) === yShift) { return Promise.resolve(); }
    return token.setFlag("hex-size-support", "pivoty", yShift);
  }
  static async RevertArtShift(token?: EunosLancerTokenDocument): Promise<unknown> {
    if (!token) {
      return Promise.all((game.scenes ?? [])
        .map((s: Scene) => Promise.all(s.tokens
          .map((t: LancerTokenDocument) => this.RevertArtShift(t as EunosLancerTokenDocument))
        ))
        .flat(2)
      ).then(() => {});
    }
    if (this.GetTokenArtShift(token) === 0) { return Promise.resolve(); }
    return token.setFlag("hex-size-support", "pivoty", 0);
  }

  static async DisableHoverEffects(token: EunosLancerTokenDocument): Promise<unknown> {
    const updateData = {
      displayName: CONST.TOKEN_DISPLAY_MODES.NONE
    };
    return token.update(updateData);
  }

}
