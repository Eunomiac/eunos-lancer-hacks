// @ts-nocheck
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

  class TokenMagic {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [k: string]: any;
  }

}

export default class Hack_TokenTweaks {

  // #region Environment Viability Checks ~
  static get canEnable(): boolean {
    return true;
  }
  static get isEnabled(): boolean {
    return this.canEnable && ELH.Settings.IsSubmenuEnabled("tokenTweaks");
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

  static RegisterSettings() {
    if (!game.user?.isGM) { return; }
    ELH.Settings.RegisterSettingsMenu(
      "tokenTweaks",
      {
        name: "Token Tweaks",
        hint: "Various tweaks to token appearances, scaling, offsets, effects.",
        icon: "fa-duotone fa-location",
        hasSubmenu: true,
        toggleDefault: false,
        dependencies: [],
        async onEnable() {
          ui.notifications.info("Enabling token tweaks...");
          Hack_TokenTweaks.RegisterHooks();
          await Hack_TokenTweaks.ApplyTokenTweaks();
          ui.notifications.info("Token tweaks enabled successfully.");
        },
        async onDisable() {
          return Hack_TokenTweaks.UnregisterHooks();
        },
        async onRefresh() {
          ui.notifications.info("Refreshing tokens...");
          await Hack_TokenTweaks.ApplyTokenTweaks();
          ui.notifications.info("Tokens refreshed successfully.");
        }
      },
      {
        applyDropShadow: {
          name: "Apply Drop Shadow",
          hint: "Applies a drop shadow to tokens.",
          inputType: ELH.Settings.InputType.Checkbox,
          default: true,
          async onChange() {
            ui.notifications.info("Updating Tokens...");
            await Hack_TokenTweaks.ApplyTokenTweaks();
            ui.notifications.info("Tokens updated successfully.");
          }
        },
        applyOutline: {
          name: "Apply Outline",
          hint: "Applies a faint, color-coded outline to tokens.",
          inputType: ELH.Settings.InputType.Checkbox,
          default: true,
          async onChange() {
            ui.notifications.info("Updating Tokens...");
            await Hack_TokenTweaks.ApplyTokenTweaks();
            ui.notifications.info("Tokens updated successfully.");
          }
        },
        adjustYLevel: {
          name: "Adjust Y Level",
          hint: "Adjusts the y-level of tokens, shifting them upwards slightly for a 3D effect.",
          inputType: ELH.Settings.InputType.Checkbox,
          default: true,
          async onChange() {
            ui.notifications.info("Updating Tokens...");
            await Hack_TokenTweaks.ApplyTokenTweaks();
            ui.notifications.info("Tokens updated successfully.");
          }
        }
      },
      []
    );
  }

  static readonly registeredHookIDs: Array<Tuple<string, number>> = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static readonly registeredHooks: Record<string, (...args: any[]) => Promise<any>> = {
    drawToken: async (token: EunosLancerToken|EunosLancerTokenDocument): Promise<void> => {
      // Verify component is active
      if (!this.isEnabled) { return; }

      if (token instanceof LancerToken) {
        token = token.document;
      }

      await Hack_TokenTweaks.ApplyTokenTweaks(token);

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

  static GetDropShadowFilter() {
    return {
      filterType: "shadow",
      filterId: "euno_dropShadow",
      rotation: 120,
      blur: 4,
      quality: 3,
      distance: -10,
      alpha: 1,
      padding: 1000,
      shadowOnly: false,
      color: 0x000000,
      animated: {
        blur: {
          active: true,
          loopDuration: 1500,
          animType: "syncCosOscillation",
          val1: 4,
          val2: 5
        }
      }
    };
  }

  static GetOutlineFilter(disposition: ValueOf<typeof CONST.TOKEN_DISPOSITIONS>, type: EntryType, isCurrentActor = false) {

    const dispositionColors = ({
      1 : [0x00FF00, 0x009900],
      0 : [0xFFFF00, 0x999900],
      [-1] : [0xFF0000, 0x990000]
    })[disposition as 1|0|-1];

    return {
        filterType: "outline",
        filterId: "eunos_outline",
        padding: 100,
        color: dispositionColors[isCurrentActor ? 0 : 1],
        thickness: isCurrentActor ? 2 : 1,
        quality: 1,
        zOrder: 9,
        animated: {
          thickness: {
             active: isCurrentActor,
             loopDuration: 10,
             animType: "syncCosOscillation",
             val1: type === EntryType.MECH ? 2 : 1,
             val2: type === EntryType.MECH ? 3 : 2
          }
       }
    };
  }

  static async ApplyTokenTweaks(token?: EunosLancerTokenDocument, isRefreshing = false): Promise<unknown> {
    if (!token) {
      // For now, can't add filters to actor prototype tokens -- will have to figure that out.
      // Run ApplyTokenTweaks in a Promise.all on all tokens in all scenes
      return await Promise.all(
        (game.scenes ?? []).map(async (s: Scene) => {
          const updates = await Promise.all(s.tokens.map(async (t: LancerTokenDocument) => {
            const {type} = t.actor ?? {};
            if (!type) { return; }
            return Hack_TokenTweaks.ApplyTokenTweaks(t as EunosLancerTokenDocument, true);
          }));
          return s.updateEmbeddedDocuments("Token", updates.filter(Boolean) as Array<Record<string, unknown>>);
        })
      );
    }

    if (token instanceof LancerToken) {
      token = token.document as EunosLancerTokenDocument;
    }

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

    // If applying drop shadow, apply it; otherwise, clear it.
    if (/* ELH.Settings.Get("tokenTweaks", "applyDropShadow") && */ (isRefreshing || !TokenMagic.hasFilterId(token, "eunos_dropShadow"))) {
      filterData.push(this.GetDropShadowFilter());
    } else if (TokenMagic.hasFilterId(token, "eunos_dropShadow")) {
      TokenMagic.deleteFilters(token, "eunos_dropShadow");
    }

    // If applying outline, apply it; otherwise, clear it.
    if (/* ELH.Settings.Get("tokenTweaks", "applyOutline") && */ (isRefreshing || !TokenMagic.hasFilterId(token, "eunos_outline"))) {
      filterData.push(this.GetOutlineFilter(updateData.disposition as 0|1|-1, token.actor?.type ?? EntryType.DEPLOYABLE));
    } else if (TokenMagic.hasFilterId(token, "eunos_outline")) {
      TokenMagic.deleteFilters(token, "eunos_outline");
    }

    // If adjusting image y-level, apply it; otherwise, clear it.
    // if (ELH.Settings.Get("tokenTweaks", "adjustYLevel")) {
      const tokenScale = token.data.texture.scaleX ?? 1;
      token.setFlag("hex-size-support", "pivoty", 60 * tokenScale);
    // } else if (token.hasFlag("hex-size-support", "pivoty")
    //   && token.getFlag("hex-size-support", "pivoty") !== 0) {
    //   token.setFlag("hex-size-support", "pivoty", 0);
    // }

    // Check if the updateData object is empty
    if (Object.keys(updateData).length > 0) {
      token.update(updateData);
    }
    if (filterData.length > 0) {
      await TokenMagic.updateFiltersByPlaceable(filterData, token);
    }
  }
}
// #endregion
