/* eslint-disable @typescript-eslint/no-unused-vars */
import C from "../core/constants";
import {EntryType} from "machine-mind";

import EunosLancerPilot from "../overrides/eunos-lancer-actor";
import {LancerActorSheet} from "eunosTypes/module/actor/lancer-actor-sheet";
import {LancerToken} from "eunosTypes/module/token";
/* eslint-enable @typescript-eslint/no-unused-vars */

/* Replace __DEPENDENCY_NAME__ with the name of the module that this component depends on. */

declare global {
  interface EunosLancerPilotSheet extends LancerActorSheet<EntryType.PILOT> {
    actor: EunosLancerPilot;
    isBondsTabActive?: boolean;
  }

  interface LancerClockData {
    id: IDString,
    name: string,
    value: number,
    max: number,
    color: string,
    targetFlag: string,
    placeholder: string
  }

  type BurdenKey = "minor4" | "minor6" | "major";
  type PowerKey = keyof typeof C["bondPowersMap"];

  interface CollapseFlags {
    main: boolean,
    stress: boolean,
    clocks: boolean,
    powers: Record<PowerKey|"main", boolean>
  }
}

export default class Hack_EnableBondsTab {

  // #region Environment Viability Checks ~
  static get canEnable(): boolean {
    return true;
  }
  static isEnabled(): boolean {
    return this.canEnable && game.settings.get("eunos-lancer-hacks", "enableBondsTab") === true;
  }
  // #endregion

  // #region *** INITIALIZATION *** ~
  static RegisterSettings() {

    game.settings.register("eunos-lancer-hacks",
      "enableBondsTab",
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
    Hooks.on("renderLancerActorSheet", (actorSheet: EunosLancerPilotSheet, elem$: JQuery) => {
      if (actorSheet.actor.is_pilot()) {
        this.addBondsTab(actorSheet, elem$).then(function() {
          if (actorSheet.isBondsTabActive) {
            // @ts-expect-error: Need to access protected method.
            actorSheet._tabs[0].activate("bonds");
          }
        });
      }
    });
  }

  static async RegisterTemplates() {
    loadTemplates([
      "modules/eunos-lancer-hacks/templates/partials/clock.hbs",
      "modules/eunos-lancer-hacks/templates/partials/bonds.hbs",
      "modules/eunos-lancer-hacks/templates/partials/power-chat.hbs",
      "modules/eunos-lancer-hacks/templates/partials/dotline.hbs"
    ]);
  }

  static async Initialize() {

    // Register settings related to this component
    this.RegisterSettings();

    // Register hooks related to this component
    this.RegisterHooks();

    return this.RegisterTemplates();
  }

  static getBondsTabData(actor: EunosLancerPilot) {
    if (!actor.is_pilot()) { return; }

    if (
      !actor.fData
      || !actor.fData.bond
      || !Object.values(actor.fData.clocks ?? {}).length
      || Object.values(actor.fData.burden_clocks ?? {}).length !== 3
    ) {
      return {
        isBondsActive: false
      };
    }

    const {
      bond,
      clocks: clocksFlagData,
      burden_clocks,
      bondPowers
    } = actor.fData as EunosLancerFlags;
    const burdens = {
      minor4: clocksFlagData[burden_clocks.minor4],
      minor6: clocksFlagData[burden_clocks.minor6],
      major: clocksFlagData[burden_clocks.major]
    };
    const burdenIds = Object.values(burden_clocks);
    const clocks = Object.fromEntries(
      (Object.entries(clocksFlagData) as Array<[IDString, LancerClockData]>)
        .filter(([clockID]) => !burdenIds.includes(clockID))
    );

    const bondQuestions = C.bondQuestions[bond];
    bondQuestions.a.answer = `${actor.fData.bondAnswers?.a ?? ""}.`.replace(/\.+/g, ".").trim();
    bondQuestions.b.answer = `${actor.fData.bondAnswers?.b ?? ""}.`.replace(/\.+/g, ".").trim();

    return {
      pilotXP: {
        dotlineClass: "xp",
        target: "pilot_xp",
        value: actor.getFlagVal("pilot_xp.value") ?? 0,
        max: actor.getFlagVal("pilot_xp.max") ?? 8
      },
      pilotStress: {
        dotlineClass: "stress",
        target: "pilot_stress",
        value: actor.getFlagVal("pilot_stress.value") ?? 0,
        max: actor.getFlagVal("pilot_stress.max") ?? 8
      },
      bond,
      bondTitle: C.bondTypes[bond],
      bondMinorIdeal: actor.fData.minorIdeal,
      bondPowers,
      bondMajorIdeals: C.bondMajorIdeals[bond],
      bondMinorIdeals: C.bondMinorIdeals[bond],
      bondQuestions,
      bondBoon: C.bondBoons[bond],
      isBoonActive: Object.values(actor.fData.bondPowers ?? {}).some((power) => power.bond !== bond),
      collapse: actor.fData.collapse,
      burdens,
      clocks,
      isBondsActive: true
    };
  }

  static async usePower(
    actor: EunosLancerPilot,
    powerKey: string
  ) {
    const powerData = actor.fData.bondPowers?.[powerKey];
    if (!powerData) { return; }
    const html = await renderTemplate(
      "modules/eunos-lancer-hacks/templates/partials/power-chat.hbs",
      powerData
    );
    const chat_data = {
      type: CONST.CHAT_MESSAGE_TYPES.IC,
      speaker: {
        actor: actor,
        token: actor?.token?.id,
        alias: actor?.token ? actor.token.name : null
      },
      content: html
    };
    if ("frequency" in powerData) {
      const uses = (actor.getFlagVal(`bondPowers.${powerKey}.uses`) ?? powerData.frequency) as number;
      actor.setFlagVal(`bondPowers.${powerKey}.uses`, uses - 1);
    }
    const cm = await ChatMessage.create(chat_data);
    cm?.render();
    return Promise.resolve();
  }


  static async addBondsTab(actorSheet: EunosLancerPilotSheet, sheetElem$: JQuery) {
    // Gather JQuery references to relevant elements
    const nav$ = sheetElem$.find("nav.lancer-tabs");
    const sheetBody$ = sheetElem$.find(".sheet-body");

    // Generate new elements to be appended to the sheet
    const bondsTab$ = $("<a class=\"item lancer-tab medium\" data-tab=\"bonds\">&lt;PILOT//BONDS&gt;</div>");
    const tabHTML = await renderTemplate(
      "modules/eunos-lancer-hacks/templates/partials/bonds.hbs",
      this.getBondsTabData(actorSheet.actor as EunosLancerPilot) ?? {}
    );
    const tabContent$ = $(tabHTML);

    // Append new elements to the sheet
    nav$.append(bondsTab$);
    sheetBody$.append(tabContent$);

    // Activate event listeners relevant to the new tab
    this.activateBondListeners(actorSheet, sheetElem$);
  }

  static async activateBondListeners(
    actorSheet: EunosLancerPilotSheet,
    sheetElem$: JQuery
  ) {
    // Track the active status of the bonds tab as tabs are clicked
    sheetElem$.find("nav.lancer-tabs .item").click((event) => {
      const tab$ = $(event.currentTarget);
      actorSheet.isBondsTabActive = tab$.data("tab") === "bonds";
    });

    // Manually handle changes to the bond tab's input and select elements
    // Manually handle changes to the bond tab's input and select elements
    sheetElem$.find("[data-flag-target]").off("change keydown").on("change keydown", (event) => {
      // Check if the event is a keydown event and the Enter key was pressed
      if (event.type === "keydown" && event.which === 13) {
        event.preventDefault(); // Prevent the default action (form submission in this case)
        event.stopPropagation(); // Stop the event from propagating up the DOM tree
        $(event.currentTarget).blur(); // Remove focus from the input element
        return; // Exit the function early
      }

      // Handle the change event
      if (event.type === "change") {
        event.preventDefault();
        event.stopPropagation();

        const elem$ = $(event.currentTarget);
        const val = elem$.val();
        const target = elem$.data("flag-target");
        actorSheet.actor.setFlagVal(target, val, true);
      }
    });

    // Handle collapse listeners
    sheetElem$.find("[data-flag-target^='collapse']").each(function() {
      const elem$ = $(this);
      const target = elem$.data("flag-target");
      const val = actorSheet.actor.getFlagVal(target);
      const container$ = elem$.siblings(".collapse-container");

      // Set initial container height based on the flag value
      if (val) {
        // If flag value is true, expand the section by setting height to auto
        // This assumes the content is visible by default or through initial JS logic
        container$.css("height", "auto");
      } else {
        // If flag value is false, collapse the section by setting height to 0
        container$.css("height", 0);
      }

      // console.log("Collapse Checkbox Initialization", {
      //   elem$, target, val,
      //   flagVal: getFlagVal(actorSheet.actor, target),
      //   checkVal: elem$.prop("checked")
      // });

      // Attach click event listener for toggling
      elem$.click(async (event) => {
        event.preventDefault();
        const newVal = !actorSheet.actor.getFlagVal(target);
        await actorSheet.actor.setFlagVal(target, newVal, true);
        elem$.prop("checked", newVal);

        if (newVal) {
          // Expanding
          // console.log("EXPANDING Collapse Checkbox", {
          //   elem$, target,
          //   flagVal: getFlagVal(actorSheet.actor, target),
          //   newVal,
          //   checkVal: elem$.prop("checked")
          // });
          container$.height("auto");
          const fullHeight = container$.height();
          container$.height(0); // Start the animation from 0
          container$.animate({ height: fullHeight }, 500, function() {
            container$.css("height", "auto"); // Set to auto for dynamic content changes
          });
        } else {
          // Collapsing
          // console.log("COLLAPSING Collapse Checkbox", {
          //   elem$, target,
          //   flagVal: getFlagVal(actorSheet.actor, target),
          //   newVal,
          //   checkVal: elem$.prop("checked")
          // });
          const currentHeight = container$.height() ?? 0;
          container$.height(currentHeight).animate({ height: 0 }, 500);
        }
      });
    });

    // Handle power usage listeners
    sheetElem$.find(".use-power-button").click((event) => {
      const elem$ = $(event.currentTarget);
      const power = elem$.data("power");
      this.usePower(actorSheet.actor as EunosLancerPilot, power);
    });

    // Activate dotline event listeners
    sheetElem$.find(".dot[data-action='toggle-dot']").on({
      click: (event) => {
        const elem$ = $(event.currentTarget);
        const target = elem$.data("target");
        const dotlineData = (actorSheet.actor.getFlagVal(target) ?? {value: 0, max: 8}) as ValueMax;
        const index = elem$.data("index");

        // If dot is EMPTY, set value equal to its index.
        if (dotlineData.value < index) {
          dotlineData.value = index;
        } else {
          dotlineData.value = index - 1;
        }
        actorSheet.actor.setFlagVal(target, dotlineData);
      }
    });

    // Handle clock listeners
    function changeClock(frameElem$: JQuery, delta: number) {
      const elem$ = frameElem$.closest(".clock");
      const clockID = elem$.attr("id") as IDString;
      const clock = actorSheet.actor.fData.clocks?.[clockID];
      if (!clock) { return; }
      const newValue = Math.max(0, Math.min(clock.value + delta, clock.max));
      actorSheet.actor.setFlagVal(`clocks.${clockID}.value`, newValue, true);
      elem$.attr("data-value", newValue);
    }
    sheetElem$.find(".clock-frame").on({
      click: (event) => { changeClock($(event.currentTarget), 1); },
      contextmenu: (event) => {
        event.preventDefault(); // Prevent the context menu from appearing
        changeClock($(event.currentTarget), -1);
      },
      wheel: (event) => {
        event.preventDefault(); // Prevent the page from scrolling
        // Casting the event to any to access deltaY for wheel event
        const wheelEvent = event.originalEvent as WheelEvent;
        if (wheelEvent.deltaY < 0) {
          // Scrolled up
          changeClock($(event.currentTarget), 1);
        } else {
          // Scrolled down
          changeClock($(event.currentTarget), -1);
        }
      }
    });

    // Handle add clock buttons
    sheetElem$.find("[data-action='add-clock']").on({
      click: (event) => {
        const newClock = actorSheet.actor.buildClockData(
          C.randomColor,
          Number($(event.currentTarget).data("size")),
          0
        );
        actorSheet.actor.setFlagVal(`clocks.${newClock.id}`, newClock, false);
      }
    });

    // Handle delete clock buttons
    sheetElem$.find("[data-action='delete-clock']").on({
      click: (event) => {
        const clock$ = $(event.currentTarget).closest(".clock");
        const clockID = clock$.attr("id");
        actorSheet.actor.setFlagVal(`clocks.-=${clockID}`, null, false);
      }
    });
  }
}
// #endregion
