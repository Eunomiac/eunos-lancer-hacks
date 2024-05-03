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

export default class Hack_EnableScanVision {

  // #region Environment Viability Checks ~
  static get canEnable(): boolean {
    return true;
  }
  static get isEnabled(): boolean {
    return this.canEnable && ELH.Settings.IsSubmenuEnabled("sensorVision");
  }
  // #endregion

  // #region *** INITIALIZATION *** ~
  static async Initialize() {

    // Register settings related to this component
    this.RegisterSettings();

    if (!this.isEnabled) { return; }

    // Register hooks related to this component
    this.RegisterHooks();
  }

  static async ApplyScanVision() {
    ui.notifications.info("Refreshing token sensor ranges...");
    await Promise.all((game.scenes ?? [])
      .map((s: Scene) => Promise.all(s.tokens
        .map(
          async (t) => Hack_EnableScanVision.SetScanAura(t as EunosLancerTokenDocument, true)
        )
      ))
    );
    ui.notifications.info("Token sensor ranges refreshed.");
  }

  static RegisterSettings() {
    if (!game.user?.isGM) { return; }
    ELH.Settings.RegisterSettingsMenu(
      "sensorVision",
      {
        name: "Sensor Vision",
        hint: "Maintain sight range and detection modes for mech tokens.",
        icon: "fa-duotone fa-eye",
        toggleDefault: true,
        dependencies: [],
        async onEnable() {
          Hack_EnableScanVision.RegisterHooks();
          return Hack_EnableScanVision.ApplyScanVision();
        },
        onDisable: async () => this.UnregisterHooks(),
        async onRefresh() { return Hack_EnableScanVision.ApplyScanVision(); }
      },
      {
      },
      []
    );
  }

  static registeredHookIDs: Array<Tuple<string, number>> = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static readonly registeredHooks: {
    updateToken: Hooks.UpdateDocument<typeof LancerTokenDocument>
  } = {
    updateToken: (async (lToken, change, {diff}) => {
      // Verify component is active
      if (!this.isEnabled) { return true; }
      if (!change || !diff) { return true; }

      const token = lToken as EunosLancerTokenDocument;

      // Verify that this is a token, controlled by an actor, of type 'mech'.
      if (!token?.actor?.is_mech()) { return; }

      // Get sensor range of actor's active mech frame
      const sensorRange = this.GetSensorRange(token);

      // Update token with new data
      Object.assign(
        change,
        {
          // Enable sight, disable color, set range to sensors
          sight: {
            enabled: true,
            color: null,
            range: sensorRange
          },
          // Set up both detectionModes to equal sensor range
          detectionModes: [
            {id: "feelTremor", enabled: true, range: sensorRange},
            {id: "basicSight", enabled: true, range: sensorRange}
          ]
        }
      );

      return true;
    })
  };

  static RegisterHooks() {
    for (const [name, hook] of Object.entries(this.registeredHooks)) {
      this.registeredHookIDs.push([name, Hooks.on(name, hook)]);
    }
  }

  static UnregisterHooks() {
    this.registeredHookIDs.forEach(([name, id]) => Hooks.off(name, id));
  }

  static GetSensorRange(token?: EunosLancerTokenDocument) {
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

  static SetScanAura(token: EunosLancerTokenDocument, isEnabling: boolean) {

    // Verify that this is a token, controlled by an actor, of type 'mech'.
    if (!token?.actor?.is_mech()) { return; }

    // Get sensor range of actor's active mech frame
    const activeFrameID = token.actor.data.data.loadout.frame?.id;
    const activeFrame = token.actor.items.get(activeFrameID ?? "");
    if (!activeFrame?.is_frame()) { return; }
    const sensorRange = activeFrame.system.stats.sensor_range;
    if (typeof sensorRange !== "number") { return; }
    token.update({
      detectionModes: [
        {id: "feelTremor", enabled: isEnabling, range: sensorRange},
        {id: "basicSight", enabled: isEnabling, range: sensorRange}
      ]
    });
  }
}
// #endregion
