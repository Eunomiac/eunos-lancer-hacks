/* eslint-disable @typescript-eslint/no-unused-vars */
import C from "../core/constants";
import ELHSettings from "../core/settings";
import OverrideLancerPilot from "../overrides/eunos-lancer-actor";
import {registerHandlebarHelpers} from "../core/helpers";
import Hack_BarBrawl from "../module-hacks/barbrawl";
import {LancerActor, LancerActorType} from "../@types/module/actor/lancer-actor";
import {LancerActorSheet} from "../@types/module/actor/lancer-actor-sheet";
import {LancerToken} from "../@types/module/token";
import {EntryType} from "machine-mind";
// import {ChatMessageConstructorData} from "@league-of-foundry-developers/foundry-vtt-types";
/* eslint-enable @typescript-eslint/no-unused-vars */

export default class Hack_EnableScanVision {
  static RegisterSettings() {
    game.settings.register("eunos-lancer-hacks",
      "isLinkingFeelTremorToScanningRadius",
      {
        name: "Dynamic Scanning Radius",
        hint: "Automatically update the 'Feel Tremor' vision mode of tokens to match their Scanning range.",
        scope: "world",
        config: true,
        default: true,
        type: Boolean
      }
    );
  }

  static Initialize() {

    this.RegisterSettings();

    Hooks.on("drawToken", (token: LancerToken) => {

      // Verify that this is a token, controlled by an actor, of type 'mech'.
      if (!token?.actor?.is_mech()) { return; }

      // Initialize update data
      const updateData = {};

      // Assign heat and hp to token bars (but don't make them visible yet)
      updateData.bar1 = {attribute: "derived.heat"};
      updateData.bar2 = {attribute: "derived.hp"};

      // Get sensor range of actor's active mech frame
      const sensorRange = this.getSensorRange(token);

      // Extract sight data, update to show sensor range as faint glow
      updateData.sight = token.document.sight;
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
