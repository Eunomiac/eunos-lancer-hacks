/* ****▌███████████████████████████████████████████████████████████████████████████▐**** *\
|*     ▌█░░░░░░░░░ Euno's Hacks for Lancer for Foundry VTT ░░░░░░░░░░░█▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░ by Eunomiac ░░░░░░░░░░░░░██████████████████▐     *|
|*     ▌█  License █ v0.1 ██▐     *|
|*     ▌████░░░░  ░░░░█████▐     *|
\* ****▌███████████████████████████████████████████████████████████████████████████▐**** */
/* @@DOUBLE-BLANK@@ ~*/
import C from "../core/constants.js";
export default function OverrideLancerActor(lancerActorClass) {
    return class EunosLancerActor extends lancerActorClass {
        static Initialize() {
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
            const { bondId, bondPowers: bondPowerData, bondAnswers, minorIdeal, stress, xp } = data;
            if (typeof bondId !== "string" || bondId.length < 3) {
                ui.notifications.error("Bond not selected; bond tab will be disabled. Please configure your Bonds in the COMP/CON app, then sync again.");
                return;
            }
            const bond = bondId.split(/-/).pop();
            const bondPowers = this.parseBondPowersDownload(bond, bondPowerData);
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
            await this.update(bondFlagData);
        }
    };
}