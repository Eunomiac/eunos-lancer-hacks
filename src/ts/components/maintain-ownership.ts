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

export default class Hack_MaintainOwnership {

  // #region Environment Viability Checks ~
  static get canEnable(): boolean {
    return true;
  }
  static get isEnabled(): boolean {
    return this.canEnable && ELH.Settings.IsSubmenuEnabled("maintainPermissions");
  }
  // #endregion

  // #region *** INITIALIZATION *** ~
  static async Initialize() {

    // Register settings related to this component
    this.RegisterSettings();

    if (!this.isEnabled) { return; }

    // Register hooks related to this component
    this.RegisterHooks();

    // Fix actor permissions
    this.FixCharacterPermissions();
  }

  static RegisterSettings() {
    if (!game.user?.isGM) { return; }
    ELH.Settings.RegisterSettingsMenu(
      "maintainPermissions",
      {
        name: "Maintain Ownership",
        hint: "Maintain ownership permissions based on Actors folder structure.",
        icon: "fa-duotone fa-lock",
        hasSubmenu: false,
        toggleDefault: false,
        dependencies: [],
        async onEnable() {
          ui.notifications.info("Fixing character permissions...");
          Hack_MaintainOwnership.RegisterHooks();
          await Hack_MaintainOwnership.FixCharacterPermissions();
          ui.notifications.info("Character permissions fixed successfully.");
        },
        async onDisable() {
          return Hack_MaintainOwnership.UnregisterHooks();
        },
        async onRefresh() {
          ui.notifications.info("Fixing character permissions...");
          await Hack_MaintainOwnership.FixCharacterPermissions();
          ui.notifications.info("Character permissions fixed successfully.");
        }
      },
      {
      },
      []
    );
  }

  static registeredHookIDs: Array<Tuple<string, number>> = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static registeredHooks: Record<string, (...args: any[]) => Promise<any>> = {
    createActor: async (actor: EunosLancerActor) => {
      // Verify component is active
      if (!this.isEnabled || !actor.id) { return; }

      return this.FixActorPermission(actor.id);
    }
  };

  static RegisterHooks() {
    for (const [name, hook] of Object.entries(this.registeredHooks)) {
      this.registeredHookIDs.push([name, Hooks.on(name, hook)]);
    }
  }

  static UnregisterHooks() {
    this.registeredHookIDs.forEach(([name, id]) => Hooks.off(name, id));
  }

  static get FolderMap() {
    return {
      Bonzai: "gtHBUPmvt8vCspVm",
      Brett: "KTdlrQzuyWK07Xkt",
      Dusty: "WZJWNtJanCwCqElu",
      Rook: "kxCQw5uFcltncQ21",
      Rotary: "4Od7K4A7j502fSTc",
      Ryan: "uxU2RSlBeQXFZ7CX",
      Truth: "rgdkWUOv0g1zy5aM"
    };
  }

  static async FixActorPermission(actorID: string) {
    const gmID = (game.users as unknown as Collection<User>).getName("Gamemaster")?.id ?? "";
    const actor = game.actors.get(actorID);
    const userID = this.FolderMap[(actor?.folder?.name ?? "") as keyof typeof this.FolderMap];
    const user = (game.users as unknown as Collection<User>).get(userID);
    console.log(`Fixing Permissions for actor '${actor?.name}' for user '${user?.name}' in folder '${actor?.folder?.name}'`, {actor, user});
    if (!actor || !user) { return undefined; }
    // @ts-expect-error: 'ownership' not recognized
    const {ownership} = actor as {ownership: Record<string, number>};
    ownership.default ??= 10;
    ownership[userID] ??= 10;
    ownership[gmID] ??= 10;
    const updateData: Record<string, number> = {};
    for (const [key, value] of Object.entries(ownership)) {
      if (key === "default") {
        if (value !== 2) {
          updateData[key] = 2;
        }
      } else if ([userID, gmID].includes(key)) {
        if (value !== 3) {
          updateData[key] = 3;
        }
      } else if (value !== -1) {
        updateData[key] = -1;
      }
    }
    if (Object.keys(updateData).length > 0) {
      return actor.update({ownership: updateData});
    }

    return undefined;
  }

  static async FixCharacterPermissions(actor?: EunosLancerActor) {
    if (!game.user?.isGM) { return undefined; }
    if (actor && actor.id) {
      return this.FixActorPermission(actor.id);
    }
    const actorIDs = Array.from(game.actors)
      .filter((a) => a.id && (a.folder?.name ?? "") in this.FolderMap)
      .map((a) => a.id) as string[];
    return Promise.all(actorIDs.map(this.FixActorPermission.bind(this)));
  }


}
// #endregion
