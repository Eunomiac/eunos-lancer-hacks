/* eslint-disable @typescript-eslint/no-unused-vars */
import C from "../core/constants";
import OverrideLancerPilot from "../overrides/eunos-lancer-actor";
import {registerHandlebarHelpers} from "../core/helpers";
import Hack_BarBrawl from "../module-hacks/barbrawl";
import type {LancerActor, LancerActorType} from "eunosTypes/module/actor/lancer-actor";
import {LancerActorSheet} from "eunosTypes/module/actor/lancer-actor-sheet";
import {LancerToken} from "eunosTypes/module/token";
import {EntryType} from "machine-mind";
/* eslint-enable @typescript-eslint/no-unused-vars */

declare global {

}

export default class Hack_EnableScanVision {

  // #region Environment Viability Checks ~
  static get canEnable(): boolean {
    return game.modules.has("__DEPENDENCY_NAME__");
  }
  static isEnabled(): boolean {
    return this.canEnable && game.settings.get("eunos-lancer-hacks", "enableScanVision") === true;
  }
  // #endregion

  // #region *** INITIALIZATION *** ~

  static _registerComponentToggle() {
    game.settings.register("eunos-lancer-hacks",
      "enableScanVision",
      {
        name: "Title",
        hint: "Description.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean
      }
    );
  }

  static _registerComponentSettings() {

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

  static RegisterSettings() {

    this._registerComponentToggle();
    this._registerComponentSettings();

  }

  static RegisterHooks() {
    Hooks.on("drawToken", (token: EunosLancerToken): void => {

      // Verify that this is a token, controlled by an actor, of type 'mech'.
      if (!token?.actor?.is_mech()) { return; }

      // Initialize update data
      const updateData: DeepPartial<EunosLancerTokenData> = {};

      // Assign heat and hp to token bars (but don't make them visible yet)
      updateData.bar1 = {attribute: "derived.heat"};
      updateData.bar2 = {attribute: "derived.hp"};

      // Get sensor range of actor's active mech frame
      const sensorRange = this.getSensorRange(token);

      // Extract sight data, update to show sensor range as faint glow
      updateData.sight = token.document.data.sight ?? {};
      updateData.sight.enabled = true;
      updateData.sight.color = "#0f000f";
      updateData.sight.range = sensorRange;
      updateData.sight.attenuation = 0;

      // Set up both detectionModes to equal sensor range
      updateData.detectionModes = [
        {id: "feelTremor", enabled: true, range: sensorRange},
        {id: "basicSight", enabled: true, range: sensorRange}
      ];

      // Update token with new data
      token.document.update(updateData);
    });
  }

  static async RegisterTemplates() {
    return loadTemplates([
      // "modules/eunos-lancer-hacks/templates/ ... .hbs"
    ]);

  }

  static async Initialize() {

    // Register settings related to this component
    this.RegisterSettings();

    if (!this.isEnabled) { return; }

    // Register hooks related to this component
    this.RegisterHooks();

    return this.RegisterTemplates();
  }
  static getSensorRange(token?: LancerToken) {
    // Verify that this is a token, controlled by an actor, of type 'mech'.
    if (!token?.actor?.is_mech()) { return; }

    // Get sensor range of actor's active mech frame
    const activeFrameID = token.actor.data.data.loadout.frame?.id;
    const activeFrame = token.actor.items.get(activeFrameID ?? "");
    if (!activeFrame?.is_frame()) { return; }
    const sensorRange = activeFrame.system.stats.sensor_range;
    if (typeof sensorRange !== "number") { return; }

    return sensorRange;
  }

  static setScanAura(token: LancerToken, isEnabling: boolean) {
    const sensorRange = this.getSensorRange(token);
    token.document.update({
      detectionModes: [
        {id: "feelTremor", enabled: isEnabling, range: sensorRange},
        {id: "basicSight", enabled: isEnabling, range: sensorRange}
      ]
    });
  }
}
// #endregion
