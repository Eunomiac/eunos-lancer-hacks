/* eslint-disable @typescript-eslint/no-unused-vars */
import "../scss/fonts.scss";
import "../scss/style.scss";

import C from "./core/constants";
import {registerHandlebarHelpers} from "./core/helpers";
import EunosHacksSettings from "./core/settings";

import Hack_LancerActor from "./overrides/eunos-lancer-actor";
import Hack_BarBrawl from "./module-hacks/barbrawl";
import Hack_BondsTab from "./components/enable-bonds-tab";
import Hack_ScanVision from "./components/enable-scan-vision";

// import {LancerToken, LancerActorType} from "./;

// import {LancerActor, type LancerActorType} from "./@types/module/actor/lancer-actor";
// import {LancerActorSheet} from "./@types/module/actor/lancer-actor-sheet";
// import {LancerToken} from "./@types/module/token";
import {EntryType} from "machine-mind";
// import {ChatMessageConstructorData} from "@league-of-foundry-developers/foundry-vtt-types";
/* eslint-enable @typescript-eslint/no-unused-vars */

class EunosLancerHacks {
  static lancerSystemInitialized: Promise<boolean>;

  static async Initialize() {
    // Disable Compatibility Warnings
    CONFIG.compatibility.mode = 0;

    // Register settings to show up in module settings configuration
    // ELHSettings.RegisterSettings();

    // Define a promise that resolves when the lancer system is initialized.
    console.log("[Eunos-Lancer-Hacks] Awaiting Lancer System Initialization ...");
    EunosLancerHacks.lancerSystemInitialized = new Promise<boolean>((resolve) => {
      function checkLancerStatus() {
        const entities = (game.lancer?.entities ?? {}) as Record<string, unknown>;
        if ("LancerActor" in entities) {
          resolve(true); // Resolve the promise when LancerActor is found
        } else {
          setTimeout(checkLancerStatus, 100); // Check again after 100ms
        }
      }
      checkLancerStatus();
    });

    // Wait for lancer system to initialize
    await EunosLancerHacks.lancerSystemInitialized;
    console.log("Lancer System Initialized!");
    console.log("*** INITIALIZING EUNO'S LANCER HACKS ***");

    // Prepare settings
    await EunosHacksSettings.Initialize();

    // Override lancer document classes
    await Promise.all([
      Hack_LancerActor.Initialize()
    ]);

    // Proceed with initialization of other components.
    Hack_BarBrawl.Initialize();
    Hack_BondsTab.Initialize();
    Hack_ScanVision.Initialize();


    // Register handlebar helpers
    registerHandlebarHelpers();

    // Assign development functions to global context
    Object.assign(globalThis, {
      C, EunosHacksSettings, Hack_LancerActor, Hack_BarBrawl, Hack_BondsTab, Hack_ScanVision
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

// Extend the global Window interface
declare global {
  const ELH: typeof EunosLancerHacks;
}

Object.assign(globalThis, {ELH: EunosLancerHacks});

/* Wait for Foundry to signal the 'init' event, then initialize module. */
Hooks.on("init", ELH.Initialize);
