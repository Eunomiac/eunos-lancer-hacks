/* eslint-disable @typescript-eslint/no-unused-vars */
import C from "../core/constants";
import {EntryType} from "machine-mind";

import EunosLancerPilot from "./eunos-lancer-actor";
import {LancerActor, type LancerActorType} from "../@types/module/actor/lancer-actor";
import {LancerActorSheet} from "../@types/module/actor/lancer-actor-sheet";
import {LancerToken} from "../@types/module/token";
/* eslint-enable @typescript-eslint/no-unused-vars */

/* Replace __DEPENDENCY_NAME__ with the name of the module that this component depends on. */
/* Replace __ENABLE_TOGGLE__ with the name of the settings key to toggle this component */

export default class EunosLancerItem {

  // #region Environment Viability Checks ~
  static get canEnable(): boolean {
    return game.modules.has("__DEPENDENCY_NAME__");
  }
  static isEnabled(): boolean {
    return this.canEnable && game.settings.get("eunos-lancer-hacks", "__ENABLE_TOGGLE__") === true;
  }
  // #endregion

  // #region *** INITIALIZATION *** ~
  static RegisterSettings() {

    game.settings.register("eunos-lancer-hacks",
      "__ENABLE_TOGGLE__",
      {
        name: "Title",
        hint: "Description.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
      }
    );

    // game.settings.register("eunos-lancer-hacks",
    //   "__setting_key__",
    //   {
    //     name: "Title",
    //     hint: "Description.",
    //     scope: "world",
    //     config: true,
    //     default: true,
    //     type: Boolean
    //   }
    // );
  }

  static RegisterHooks() {

  }

  static async RegisterTemplates() {
    return loadTemplates([
      // "modules/eunos-lancer-hacks/templates/ ... .hbs"
    ]);

  }

  static async Initialize() {

    if (!this.canEnable) {
      ui.notifications?.info("'eunos-lancer-item' disabled; __DEPENDENCY_NAME__ not enabled.");
      return;
    }

    // Register settings related to this component
    this.RegisterSettings();

    // Register hooks related to this component
    this.RegisterHooks();

    return this.RegisterTemplates();
  }
}
// #endregion
