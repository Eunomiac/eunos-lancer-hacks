/* eslint-disable @typescript-eslint/no-unused-vars */
import C from "../core/constants";
// import OverrideLancerPilot from "../overrides/eunos-lancer-actor";
// import {registerHandlebarHelpers} from "../core/helpers";
// import Hack_BarBrawl from "../module-hacks/barbrawl";
// import type {LancerActor, LancerActorType} from "../@types/module/actor/lancer-actor";
// import {LancerActorSheet} from "../@types/module/actor/lancer-actor-sheet";
// import {LancerToken} from "../@types/module/token";
import {EntryType} from "machine-mind";
/* eslint-enable @typescript-eslint/no-unused-vars */

declare global {

}

export default class Hack_ApplyEunosSettings {

  // #region Environment Viability Checks ~
  static get canEnable(): boolean {
    return true;
  }
  static get isEnabled(): boolean {
    return this.canEnable && ELH.Settings.IsSubmenuEnabled("applyEunosSettings");
  }
  // #endregion

  static get EunosSettings() {
    return {
      "core": {
        chatBubblesPan: false,
        pixelRatioResolutionScaling: false,
        leftClickRelease: true
      },
      "lancer": {
        hideWelcome: true,
        actionTracker: {
          showHotbar: false
        }
      },
      "_CodeMirror": {
        macroEditor: true,
        indentUnit: 2,
        smartIndent: true,
        tabSize: 2,
        indentWithTabs: true,
        lineWrapping: true
      },
      "easy-target": {
        release: "standard"
      },
      "JB2A_DnD5e": {
        runonlyonce: true,
        fxmasterdb: false
      },
      "lib-wrapper": {
        "high-performance-mode": true
      },
      "popout": {
        showButton: true,
        useWindows: true,
        trueBoundingBox: true
      },
      "sequencer": {
        "permissions-preload": 0
      },
      "token-action-hud": {
        showHudTitle: false,
        style: "compact"
      }
    };
  }

  static get SettingsToStore(): Array<Tuple<string>|Threeple<string>> {
    const settingsToStore: Array<Tuple<string>|Threeple<string>> = [];
    Object.entries(this.EunosSettings)
      .forEach(([namespace, settingData]) => {
        Object.entries(settingData)
          .forEach(([settingKey, settingVal]) => {
            if (typeof settingVal === "object" && settingVal !== null && !Array.isArray(settingVal)) {
              // If the settingVal is an object literal, proceed with further processing
              Object.entries(settingVal)
                .forEach(([key, value]) => {
                  settingsToStore.push([namespace, settingKey, key]);
                });
            } else {
              settingsToStore.push([namespace, settingKey]);
            }
          });
      });
    return settingsToStore;
  }

  // #region *** INITIALIZATION *** ~
  static async Initialize() {

    // Register settings related to this component
    this.RegisterSettings();

    if (!this.isEnabled) { return; }

    // Register hooks related to this component
    this.RegisterHooks();

    // Fix actor permissions
    Hack_ApplyEunosSettings.UpdateSettings();
  }

  static RegisterSettings() {
    if (!game.user?.isGM) { return; }
    ELH.Settings.RegisterSettingsMenu(
      "applyEunosSettings",
      {
        name: "Euno's Settings",
        hint: "Apply customized settings to other installed modules.",
        icon: "fa-duotone fa-gear",
        hasSubmenu: false,
        toggleDefault: true,
        dependencies: [],
        async onEnable() {
          ui.notifications.info("Updating settings...");
          await Hack_ApplyEunosSettings.UpdateSettings();
          ui.notifications.info("Settings updated successfully.");
        },
        async onRefresh() { return this.onEnable?.call(this); }
      },
      {
      },
      this.SettingsToStore
    );
  }

  static registeredHookIDs: number[] = [];
  static RegisterHooks() {
    return true;
  }

  static UnregisterHooks() {
    return true;
  }

  static async UpdateSettings() {
    await ELH.Settings.SafeUpdate(this.EunosSettings);
  }
}
// #endregion
