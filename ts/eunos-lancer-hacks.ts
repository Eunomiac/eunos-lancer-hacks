/* eslint-disable @typescript-eslint/no-unused-vars */
import C from "./core/constants";
import {registerHandlebarHelpers} from "./core/helpers";

import EunosLancerPilot from "./overrides/eunos-lancer-actor";
import Hack_BarBrawl from "./module-hacks/barbrawl";
import Hack_EnableBondsTab from "./components/enable-bonds-tab";
import Hack_EnableScanVision from "./components/enable-scan-vision";

import {LancerActor, LancerActorType} from "./@types/module/actor/lancer-actor";
import {LancerActorSheet} from "./@types/module/actor/lancer-actor-sheet";
import {LancerToken} from "./@types/module/token";
import {EntryType} from "machine-mind";
// import {ChatMessageConstructorData} from "@league-of-foundry-developers/foundry-vtt-types";
/* eslint-enable @typescript-eslint/no-unused-vars */

class ELH {

  static Initialize() {
    // Disable Compatibility Warnings
    console.log("*** INITIALIZING EUNO'S LANCER HACKS");
    CONFIG.compatibility.mode = 0;
    // Register settings to show up in module settings configuration
    // ELHSettings.RegisterSettings();
    Hack_BarBrawl.Initialize();
    EunosLancerPilot.Initialize();
    Hack_EnableBondsTab.Initialize();
    Hack_EnableScanVision.Initialize();


    // Register handlebar helpers
    registerHandlebarHelpers();

    // Assign development functions to global context
    Object.assign(globalThis, {
      C
    });

    Object.assign(globalThis,
      {
        resetBondFlags: () => {
          game.actors?.filter((actor) => actor.type === "pilot").forEach((actor) => actor.update({"flags.-=eunos-lancer-hacks": null}));
        },
        revealTokenBars: () => {
          canvas?.tokens?.controlled.forEach((token) => {
            token.document.update({
              bar1: {attribute: "derived.heat"},
              bar2: {attribute: "derived.hp"},
              displayBars: 50
            });
          });
        },
        hideTokenBars: () => {
          canvas?.tokens?.controlled.forEach((token) => {
            token.document.update({
              displayBars: 0
            });
          });
        }
        // toggleScanAuras: () => {
        //   canvas?.tokens?.controlled.forEach((token) => {
        //     const isEnabling = !token.document.detectionModes[0].enabled;
        //     setScanAura(token, isEnabling);
        //   });
        // },
        // enableScanAura: () => {
        //   canvas?.tokens?.controlled.forEach((token) => {
        //     setScanAura(token, true);
        //   });
        // },
        // disableScanAura: () => {
        //   canvas?.tokens?.controlled.forEach((token) => {
        //     setScanAura(token, false);
        //   });
        // }
      }
    );
  }
}

/* Wait for Foundry to signal the 'init' event, then initialize module. */
Hooks.on("init", ELH.Initialize);
