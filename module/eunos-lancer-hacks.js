// @ts-nocheck
import C from "./core/constants.js";
import OverrideLancerActor from "./overrides/eunos-lancer-actor.js";
import { registerHandlebarHelpers } from "./core/helpers.js";
import Hack_BarBrawl from "./module-hacks/barbrawl.js";
function getSensorRange(token) {
    // Verify that this is a token, controlled by an actor, of type 'mech'.
    if (!token) {
        return;
    }
    if (!token.actor) {
        return;
    }
    if (token.actor.type !== "mech") {
        return;
    }
    // Get sensor range of actor's active mech frame
    const activeFrameID = token.actor.system.loadout.frame.id;
    const activeFrame = token.actor.items.get(activeFrameID ?? "");
    if (!activeFrame) {
        return;
    }
    const sensorRange = activeFrame.system.stats.sensor_range;
    if (typeof sensorRange !== "number") {
        return;
    }
    return sensorRange;
}
function setScanAura(token, isEnabling) {
    const sensorRange = getSensorRange(token);
    token.document.update({
        detectionModes: [
            { id: "feelTremor", enabled: isEnabling, range: sensorRange },
            { id: "basicSight", enabled: isEnabling, range: sensorRange }
        ]
    });
}
function getFlagVal(actor, key) {
    return actor.getFlag("eunos-lancer-hacks", key);
}
async function setFlagVal(actor, key, val, isSilent = false) {
    if (isSilent) {
        await actor.update({
            [`flags.eunos-lancer-hacks.${key}`]: val
        }, { render: false, noHook: true });
    }
    else {
        await actor.setFlag("eunos-lancer-hacks", key, val);
    }
}
function getBondsTabData(actor) {
    if (!actor.fData
        || !actor.fData.bond
        || !Object.values(actor.fData.clocks ?? {}).length
        || Object.values(actor.fData.burden_clocks ?? {}).length !== 3) {
        return {
            isBondsActive: false
        };
    }
    const { bond, clocks: clocksFlagData, burden_clocks, bondPowers } = actor.fData;
    const burdens = {
        minor4: clocksFlagData[burden_clocks.minor4],
        minor6: clocksFlagData[burden_clocks.minor6],
        major: clocksFlagData[burden_clocks.major]
    };
    const burdenIds = Object.values(burden_clocks);
    const clocks = Object.fromEntries(Object.entries(clocksFlagData)
        .filter(([clockID]) => !burdenIds.includes(clockID)));
    const bondQuestions = C.bondQuestions[bond];
    bondQuestions.a.answer = `${actor.fData.bondAnswers.a}.`.replace(/\.+/g, ".").trim();
    bondQuestions.b.answer = `${actor.fData.bondAnswers.b}.`.replace(/\.+/g, ".").trim();
    return {
        pilotXP: {
            dotlineClass: "xp",
            target: "pilot_xp",
            value: getFlagVal(actor, "pilot_xp.value") ?? 0,
            max: getFlagVal(actor, "pilot_xp.max") ?? 8
        },
        pilotStress: {
            dotlineClass: "stress",
            target: "pilot_stress",
            value: getFlagVal(actor, "pilot_stress.value") ?? 0,
            max: getFlagVal(actor, "pilot_stress.max") ?? 8
        },
        bond,
        bondTitle: C.bondTypes[bond],
        bondMinorIdeal: actor.fData.minorIdeal,
        bondPowers,
        bondMajorIdeals: C.bondMajorIdeals[bond],
        bondMinorIdeals: C.bondMinorIdeals[bond],
        bondQuestions,
        bondBoon: C.bondBoons[bond],
        isBoonActive: Object.values(actor.fData.bondPowers).some((power) => power.bond !== bond),
        collapse: actor.fData.collapse,
        burdens,
        clocks,
        isBondsActive: true
    };
}
async function usePower(actor, powerKey) {
    const powerData = actor.fData.bondPowers[powerKey];
    if (!powerData) {
        return;
    }
    const html = await renderTemplate("modules/eunos-lancer-hacks/templates/partials/power-chat.hbs", powerData);
    const chat_data = {
        type: CONST.CHAT_MESSAGE_TYPES.IC,
        speaker: {
            actor: actor,
            token: actor?.token,
            alias: actor?.token ? actor.token.name : null
        },
        content: html
    };
    if ("frequency" in powerData) {
        const uses = getFlagVal(actor, `bondPowers.${powerKey}.uses`) ?? powerData.frequency;
        setFlagVal(actor, `bondPowers.${powerKey}.uses`, uses - 1);
    }
    const cm = await ChatMessage.create(chat_data);
    cm?.render();
    return Promise.resolve();
}
async function addBondsTab(actorSheet, sheetElem$) {
    // Gather JQuery references to relevant elements
    const nav$ = sheetElem$.find("nav.lancer-tabs");
    const sheetBody$ = sheetElem$.find(".sheet-body");
    // Generate new elements to be appended to the sheet
    const bondsTab$ = $("<a class=\"item lancer-tab medium\" data-tab=\"bonds\">&lt;PILOT//BONDS&gt;</div>");
    const tabHTML = await renderTemplate("modules/eunos-lancer-hacks/templates/partials/bonds.hbs", getBondsTabData(actorSheet.actor));
    const tabContent$ = $(tabHTML);
    // Append new elements to the sheet
    nav$.append(bondsTab$);
    sheetBody$.append(tabContent$);
    // Activate event listeners relevant to the new tab
    activateBondListeners(actorSheet, sheetElem$, bondsTab$);
}
async function activateBondListeners(actorSheet, sheetElem$) {
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
            setFlagVal(actorSheet.actor, target, val, true);
        }
    });
    // Handle collapse listeners
    sheetElem$.find("[data-flag-target^='collapse']").each(function () {
        const elem$ = $(this);
        const target = elem$.data("flag-target");
        const val = getFlagVal(actorSheet.actor, target);
        const container$ = elem$.siblings(".collapse-container");
        // Set initial container height based on the flag value
        if (val) {
            // If flag value is true, expand the section by setting height to auto
            // This assumes the content is visible by default or through initial JS logic
            container$.css("height", "auto");
        }
        else {
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
            const newVal = !getFlagVal(actorSheet.actor, target);
            await setFlagVal(actorSheet.actor, target, newVal, true);
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
                container$.animate({ height: fullHeight }, 500, function () {
                    container$.css("height", "auto"); // Set to auto for dynamic content changes
                });
            }
            else {
                // Collapsing
                // console.log("COLLAPSING Collapse Checkbox", {
                //   elem$, target,
                //   flagVal: getFlagVal(actorSheet.actor, target),
                //   newVal,
                //   checkVal: elem$.prop("checked")
                // });
                const currentHeight = container$.height();
                container$.height(currentHeight).animate({ height: 0 }, 500);
            }
        });
    });
    // Handle power usage listeners
    sheetElem$.find(".use-power-button").click((event) => {
        const elem$ = $(event.currentTarget);
        const power = elem$.data("power");
        usePower(actorSheet.actor, power);
    });
    // Activate dotline event listeners
    sheetElem$.find(".dot[data-action='toggle-dot']").on({
        click: (event) => {
            const elem$ = $(event.currentTarget);
            const target = elem$.data("target");
            const dotlineData = getFlagVal(actorSheet.actor, target) ?? { value: 0, max: 8 };
            const index = elem$.data("index");
            // If dot is EMPTY, set value equal to its index.
            if (dotlineData.value < index) {
                dotlineData.value = index;
            }
            else {
                dotlineData.value = index - 1;
            }
            setFlagVal(actorSheet.actor, target, dotlineData);
        }
    });
    // Handle clock listeners
    function changeClock(frameElem$, delta) {
        const elem$ = frameElem$.closest(".clock");
        const clockID = elem$.attr("id");
        const clock = actorSheet.actor.fData.clocks[clockID];
        if (!clock) {
            return;
        }
        const newValue = Math.max(0, Math.min(clock.value + delta, clock.max));
        setFlagVal(actorSheet.actor, `clocks.${clockID}.value`, newValue, true);
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
            if (event.originalEvent.deltaY < 0) {
                // Scrolled up
                changeClock($(event.currentTarget), 1);
            }
            else {
                // Scrolled down
                changeClock($(event.currentTarget), -1);
            }
        }
    });
    // Handle add clock buttons
    sheetElem$.find("[data-action='add-clock']").on({
        click: (event) => {
            const newClock = actorSheet.actor.buildClockData(C.randomColor, Number($(event.currentTarget).data("size")), 0);
            setFlagVal(actorSheet.actor, `clocks.${newClock.id}`, newClock, false);
        }
    });
    // Handle delete clock buttons
    sheetElem$.find("[data-action='delete-clock']").on({
        click: (event) => {
            const clock$ = $(event.currentTarget).closest(".clock");
            const clockID = clock$.attr("id");
            setFlagVal(actorSheet.actor, `clocks.-=${clockID}`, null, false);
        }
    });
}
class ELH {
    static Initialize() {
        // Register settings to show up in module settings configuration
        // ELHSettings.RegisterSettings();
        Hack_BarBrawl.Initialize();
        // Initialize document overrides
        const EunosLancerActor = OverrideLancerActor(game.lancer.entities.LancerActor);
        EunosLancerActor.Initialize();
        // Register handlebar helpers
        registerHandlebarHelpers();
        // Load HBS partial for inserting bonds section into Lancer sheet
        loadTemplates([
            "modules/eunos-lancer-hacks/templates/partials/clock.hbs",
            "modules/eunos-lancer-hacks/templates/partials/bonds.hbs",
            "modules/eunos-lancer-hacks/templates/partials/power-chat.hbs",
            "modules/eunos-lancer-hacks/templates/partials/dotline.hbs"
        ]);
        // Assign development functions to global context
        globalThis.C = C;
        Hooks.on("renderLancerActorSheet", (actorSheet, elem$) => {
            if (["pilot"].includes(actorSheet.actor.type)) {
                addBondsTab(actorSheet, elem$).then(function () {
                    if (actorSheet.isBondsTabActive) {
                        actorSheet._tabs[0].activate("bonds");
                    }
                });
            }
        });
        // Hooks.on("drawToken", (token) => {
        //   // Verify that this is a token, controlled by an actor, of type 'mech'.
        //   if (!token) { return; }
        //   if (!token.actor) { return; }
        //   if (token.actor.type !== "mech") { return; }
        //   // Initialize update data
        //   const updateData = {};
        //   // Assign heat and hp to token bars (but don't make them visible yet)
        //   updateData.bar1 = {attribute: "derived.heat"};
        //   updateData.bar2 = {attribute: "derived.hp"};
        //   // Get sensor range of actor's active mech frame
        //   const sensorRange = getSensorRange(token);
        //   // Extract sight data, update to show sensor range as faint glow
        //   updateData.sight = token.document.sight;
        //   updateData.sight.enabled = true;
        //   updateData.sight.color = "#0f000f";
        //   updateData.sight.range = sensorRange;
        //   updateData.sight.attenuation = 0;
        //   // Set up both detectionModes to equal sensor range
        //   updateData.detectionModes = [
        //     {id: "feelTremor", enabled: true, range: sensorRange},
        //     {id: "basicSight", enabled: true, range: sensorRange}
        //   ];
        //   // Update token with new data
        //   token.document.update(updateData);
        // });
        Object.assign(globalThis, {
            resetBondFlags: () => {
                game.actors.filter((actor) => actor.type === "pilot").forEach((actor) => actor.update({ "flags.-=eunos-lancer-hacks": null }));
            },
            revealTokenBars: () => {
                canvas?.tokens.controlled.forEach((token) => {
                    token.document.update({
                        bar1: { attribute: "derived.heat" },
                        bar2: { attribute: "derived.hp" },
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
        });
    }
}
/* Wait for Foundry to signal the 'init' event, then initialize module. */
Hooks.on("init", ELH.Initialize);
