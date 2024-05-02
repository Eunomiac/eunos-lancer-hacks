/* eslint-disable @typescript-eslint/no-unused-vars */
import "../scss/style.scss";

import C from "./core/constants";
import EunosHacksSettings from "./core/settings";
import HandlebarHelpers from "./core/helpers";

import Hack_ApplyEunosSettings from "./components/apply-eunos-settings";
import Hack_MaintainOwnership from "./components/maintain-ownership";
import Hack_TokenTooltipAlt from "./module-hacks/token-tooltip-alt";
import Hack_LancerActor from "./overrides/eunos-lancer-actor";
import Hack_BarBrawl from "./module-hacks/barbrawl";
import Hack_BondsTab from "./components/enable-bonds-tab";
import Hack_ScanVision from "./components/enable-scan-vision";
import Hack_HexTokenSize from "./module-hacks/hex-token-size";
import Hack_TokenTweaks from "./components/eunos-token-tweaks";
/* eslint-enable @typescript-eslint/no-unused-vars */

declare global {
  type ELHComponent = { Initialize: () => ItemOrPromise };
  type ELHUtilityFunction = () => void;
}

/* Define the initialization queue. Each group initializes in sequence, with all members initializing together. */
const InitQueue: ELHComponent[][] = [
  [
    Hack_LancerActor
  ]
];

const ReadyQueue: ELHComponent[][] = [
  [
    EunosHacksSettings,
    HandlebarHelpers
  ],
  [
    Hack_BarBrawl,
    Hack_BondsTab,
    Hack_ScanVision,
    Hack_HexTokenSize,
    Hack_TokenTooltipAlt,
    Hack_ApplyEunosSettings,
    Hack_MaintainOwnership,
    Hack_TokenTweaks
  ]
];

/* Wait for Foundry to signal the 'init' event, then initialize module. */
Hooks.on("init", async function() {

  console.log("[Eunos-Lancer-Hacks] Initiating Wait ...");
  // Wait for lancer system to initialize
  await new Promise<boolean>((resolve) => {
    console.log("[Eunos-Lancer-Hacks] Awaiting Lancer System Initialization ...");
    (function checkLancerStatus() {
      if ("LancerActor" in (game.lancer?.entities as Maybe<List> ?? {})) {
        console.log("Lancer System Initialized!");
        resolve(true); // Resolve the promise when LancerActor is found
      } else {
        setTimeout(checkLancerStatus, 10); // Check again after 10ms
      }
    })();
  });

  console.log("*** INITIALIZING EUNO'S LANCER HACKS ***");

  // if (!game.user?.isGM) { return; }
  // Expose Lancer classes to global scope
  const {LancerActor: LancerActorClass, LancerItem: LancerItemClass} = game.lancer.entities as {LancerActor: typeof LancerActor, LancerItem: typeof LancerItem};
  Object.assign(globalThis, {
    LancerActor: LancerActorClass,
    LancerItem: LancerItemClass,
    LancerToken: CONFIG.Token.objectClass,
    LancerTokenDocument: CONFIG.Token.documentClass
  });

  // Initialize components in the InitQueue, in sequential groups.
  for (const queueGroup of InitQueue) {
    await Promise.all(queueGroup.map(
      async (component) => component.Initialize()
    ));
  }
});

/* Wait for the "ready" hook, then update general settings */
Hooks.on("ready", async function() {

  // Disable Compatibility Warnings
  CONFIG.compatibility.mode = 0;

  // Initialize components in the ReadyQueue, in sequential groups.
  for (const queueGroup of ReadyQueue) {
    await Promise.all(queueGroup.map(
      async (component) => component.Initialize()
    ));
  }
});

// Expose functionality to the global scope through the ELH namespace
const _ELH = {
  Settings: EunosHacksSettings,
  Hacks: {
    BarBrawl: Hack_BarBrawl,
    BondsTab: Hack_BondsTab,
    ScanVision: Hack_ScanVision,
    HexTokenSize: Hack_HexTokenSize,
    ApplyEunosSettings: Hack_ApplyEunosSettings,
    MaintainPermissions: Hack_MaintainOwnership,
    TokenTooltipAlt: Hack_TokenTooltipAlt,
    TokenTweaks: Hack_TokenTweaks
  },
  Utils: {
    resetBondFlags: () => {
      game.actors?.filter((actor) => actor.type === "pilot").forEach((actor) => actor.update({"flags.-=eunos-lancer-hacks": null}));
    },
    revealTokenBars: () => {
      canvas?.tokens?.controlled.forEach((token) => {
        token.document.update({
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
  }
} as const;

Object.assign(globalThis, {ELH: _ELH});

declare global {
  const ELH: typeof _ELH;
}