// @ts-nocheck
import C from "../core/constants.js";
export default function OverrideLancerActor(lancerActorClass) {
    return class EunosLancerActor extends lancerActorClass {
        static Initialize() {
            // Register the new actor class
            CONFIG.Actor.documentClass = this;
        }
        parseBondPowersDownload(bond, bondPowers) {
            const getMapKey = (power) => power.name.replace(/[^A-Za-z]/g, "");
            return Object.fromEntries(bondPowers
                .map((power) => {
                const powerKey = getMapKey(power);
                const powerBond = C.bondPowersMap[powerKey];
                const powerData = C.bondPowers[powerBond].find((bPower) => getMapKey(bPower) === powerKey);
                powerData.key = powerKey;
                powerData.isVeteran = powerData.bond !== bond;
                powerData.uses = powerData.frequency;
                return [powerKey, powerData];
            }));
        }
        get fData() { return this.flags["eunos-lancer-hacks"] ?? {}; }
        buildClockData(color, max, value = 0, placeholder = "Name") {
            const id = randomID();
            return {
                id,
                name: "",
                value,
                max,
                color,
                targetFlag: `clocks.${id}`,
                placeholder
            };
        }
        buildBurdenData() {
            return [
                this.buildClockData("#ff9400", 4, 0, "Minor Burden"),
                this.buildClockData("#ff9400", 6, 0, "Minor Burden"),
                this.buildClockData("#FF0000", 10, 0, "Major Burden")
            ];
        }
        async importCC(data, clearFirst = false) {
            if (!data || this.type !== "pilot") {
                return;
            }
            await super.importCC(data, clearFirst);
            /**
             * [
          {
              "id": "88da0238-42ff-425a-b863-9091c5082769",
              "title": "First Burden",
              "description": "Burden Description",
              "resolution": "Burden Resolution",
              "segments": 4,
              "progress": 1
          },
          {
              "id": "e88650a5-b970-44f7-a856-301e48dde629",
              "title": "Second Burden",
              "description": "",
              "resolution": "",
              "segments": 6,
              "progress": 3
          },
          {
              "id": "858c35ee-557c-44de-acbe-aa940827ea0a",
              "title": "Third Burden",
              "description": "asd",
              "resolution": "",
              "segments": 10,
              "progress": 2
          }
      
      
          [
          {
              "id": "8466e920-80af-4f4a-a999-257e2174e5ac",
              "title": "General 10-Clock",
              "description": "10-Clock Description",
              "resolution": "10-Clock Resolution",
              "segments": "10",
              "progress": 0
          }
      ]
             */
            // Extract relevant data from retrieved Comp/Con data object
            const { bondId, bondPowers: bondPowerData, bondAnswers, minorIdeal, stress, xp } = data;
            if (typeof bondId !== "string" || bondId.length < 3) {
                ui.notifications.error("Bond not selected; bond tab will be disabled. Please configure your Bonds in the COMP/CON app, then sync again.");
                return;
            }
            // Convert bondId to bond
            const bond = bondId.split(/-/).pop();
            // Parse bond powers
            const bondPowers = this.parseBondPowersDownload(bond, bondPowerData);
            // Generate burden clocks if they aren't already registered under fData.burden_clocks
            const burden_clocks = this.fData.burden_clocks ?? {};
            const clocks = this.fData.clocks ?? {};
            const defaultBurdenClocks = this.buildBurdenData();
            ["minor4", "minor6", "major"].forEach((burdenKey, i) => {
                const burdenID = burden_clocks[burdenKey];
                if (burdenID && this.fData.clocks[burdenID]) {
                    return;
                }
                const burdenClock = defaultBurdenClocks[i];
                burden_clocks[burdenKey] = burdenClock.id;
                clocks[burdenClock.id] = burdenClock;
            });
            // Initialize collapse flags to true
            const collapse = {
                main: true,
                stress: true,
                clocks: true,
                powers: {
                    main: true
                }
            };
            for (const pKey of Object.keys(bondPowers)) {
                collapse.powers[pKey] = true;
            }
            // Prepare new flag update data
            const bondFlagData = Object.fromEntries(Object.entries({
                bond,
                bondPowers,
                bondAnswers: {
                    a: bondAnswers[0],
                    b: bondAnswers[1]
                },
                minorIdeal: this.fData.minorIdeal ?? minorIdeal,
                pilot_xp: {
                    value: this.fData.pilot_xp?.value ?? xp,
                    max: this.fData.pilot_xp?.max ?? 8
                },
                pilot_stress: {
                    value: this.fData.pilot_stress?.value ?? stress,
                    max: this.fData.pilot_stress?.max ?? 8
                },
                burden_clocks,
                clocks,
                collapse
            }).map(([key, value]) => [`flags.eunos-lancer-hacks.${key}`, value]));
            // Write bond-related data to module flags
            await this.update(bondFlagData);
        }
    };
}
