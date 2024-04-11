/* eslint-disable @typescript-eslint/no-unused-vars */
import C from "../core/constants";
import {EntryType, Pilot, type PackedPilotData, InventoriedRegEntry} from "machine-mind";
/* eslint-enable @typescript-eslint/no-unused-vars */

declare global {

  interface EunosLancerFlags {
    bond: LancerBondType,
    bondPowers: Record<string, LancerBondPowerData>,
    bondAnswers: {
      a: string,
      b: string
    },
    minorIdeal: string,
    pilot_xp: {
      value: number,
      max: number
    },
    pilot_stress: ValueMax,
    burden_clocks: Record<BurdenKey, string>,
    clocks: Record<string, LancerClockData>,
    collapse: {
      main: boolean,
      stress: boolean,
      clocks: boolean,
      powers: Record<PowerKey, boolean>
    }
  }

  interface EunosPackedPilotData extends PackedPilotData {
    bondId: string,
    bondPowers: LancerBondPowerData[],
    bondAnswers: [string, string],
    minorIdeal: string,
    stress: number,
    xp: number
  }

  interface EunosLancerActor extends LancerActor {
    fData: Partial<EunosLancerFlags>;

    getFlagVal(key: string): unknown;

    setFlagVal(key: string, val: unknown, isSilent?: boolean): Promise<void>;

    parseBondPowersDownload(
      bond: string,
      bondPowers: LancerBondPowerData[]
    ): Record<string, LancerBondPowerData>|undefined;

    buildClockData(color: string, max: number, value?: number, placeholder?: string): LancerClockData;

    buildBurdenData(): [LancerClockData, LancerClockData, LancerClockData];
  }

  // type EunosLancerActor = (new (...args: ConstructorParameters<typeof LancerActor>) => EunosLancerActor_Instance);

  interface EunosLancerToken_ExtraData {
    sight: {
      enabled: boolean,
      range: number,
      angle: number,
      visionMode: string,
      color: string|null,
      attenuation: number,
      brightness: number,
      saturation: number,
      contrast: number
    },
    detectionModes: Array<{
      id: string,
      enabled: boolean,
      range: number
    }>
  }

  type EunosLancerTokenData = LancerToken["data"] & EunosLancerToken_ExtraData;

  interface EunosLancerToken extends LancerToken {
    document: EunosLancerTokenDocument,
    data: EunosLancerTokenData
  }

  interface EunosLancerTokenDocument extends LancerTokenDocument {
    data: EunosLancerTokenData
  }
}

export default class Hack_LancerActor {

  // #region *** INITIALIZATION *** ~

  static Define_EunosLancerActor(lancerActorClass: typeof Actor & ConstructorOf<LancerActor>): typeof Actor & ConstructorOf<EunosLancerActor> {

    if (!lancerActorClass) {
      const test = CONFIG.Token.objectClass;
      throw new Error("[Define_EunosLancerActor] No LancerActor class provided.");
    }

    class EunosLancerActor extends lancerActorClass {

      // constructor(...args: ConstructorParameters<typeof LancerActor>) {
      //   super(...args);
      //   // Initialize your properties here
      // }

      parseBondPowersDownload(
        bond: string,
        bondPowers: LancerBondPowerData[]
      ): Record<PowerKey, LancerBondPowerData>|undefined {
        if (!this.is_pilot()) { return; }
        const getMapKey = (power: LancerBondPowerData) => power.name.replace(/[^A-Za-z]/g, "") as keyof typeof C["bondPowersMap"];

        return Object.fromEntries(bondPowers
          .map((power) => {
            const powerKey = getMapKey(power);
            const powerBond = C.bondPowersMap[powerKey];
            const powerData = C.bondPowers[powerBond].find((bPower) => getMapKey(bPower) === powerKey);
            if (!powerData) {
              throw new Error(`Bond power ${power.name} not found in config.`);
            }
            powerData.key = powerKey;
            powerData.isVeteran = powerData.bond !== bond;
            powerData.uses = powerData.frequency;
            return [powerKey, powerData];
          }));
      }

      get fData(): Partial<EunosLancerFlags> { return this.data.flags["eunos-lancer-hacks"] ?? {}; }

      getFlagVal(key: string) {
        return this.getFlag("eunos-lancer-hacks", key);
      }

      async setFlagVal(key: string, val: unknown, isSilent = false) {
        if (isSilent) {
          await this.update({
            [`flags.eunos-lancer-hacks.${key}`]: val
          }, {render: false, noHook: true});
        } else {
          await this.setFlag("eunos-lancer-hacks", key, val);
        }
      }

      buildClockData(color: string, max: number, value = 0, placeholder = "Name") {
        const id = randomID();
        return {
          id,
          name:       "",
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
        ] as [LancerClockData, LancerClockData, LancerClockData];
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      override async importCC(data: EunosPackedPilotData, clearFirst = false) {
        if (!data || this.type !== "pilot") { return; }
        await super.importCC(data, clearFirst);

        // Extract relevant data from retrieved Comp/Con data object
        const {bondId, bondPowers: bondPowerData, bondAnswers, minorIdeal, stress, xp} = data;
        console.log("Bond Power Data: ", {bondId, bondPowerData, bondAnswers, minorIdeal, stress, xp});

        if (typeof bondId !== "string" || bondId.length < 3) {
          ui.notifications?.error("Bond not selected; bond tab will be disabled. Please configure your Bonds in the COMP/CON app, then sync again.");
          return;
        }

        // Convert bondId to bond
        const bond = bondId.split(/-/).pop() as LancerBondType;
        // Parse bond powers
        const bondPowers = this.parseBondPowersDownload(bond, bondPowerData);

        // Generate burden clocks if they aren't already registered under fData.burden_clocks
        const burden_clocks: Partial<Record<BurdenKey, string>> = this.fData.burden_clocks ?? {};
        const clocks: Partial<Record<string, LancerClockData>> = this.fData.clocks ?? {};
        const defaultBurdenClocks = this.buildBurdenData();
        (["minor4", "minor6", "major"] as BurdenKey[]).forEach((burdenKey, i) => {
          const burdenID = burden_clocks[burdenKey];
          if (burdenID && this.fData.clocks?.[burdenID]) { return; }
          const burdenClock = defaultBurdenClocks[i];
          burden_clocks[burdenKey] = burdenClock.id;
          clocks[burdenClock.id] = burdenClock;
        });

        // Initialize collapse flags to true
        const collapse: CollapseFlags = {
          main:   true,
          stress: true,
          clocks: true,
          powers: {
            main: true
          }
        };

        if (bondPowers) {
          for (const pKey of Object.keys(bondPowers)) {
            collapse.powers[pKey as PowerKey] = true;
          }
        }

        // Prepare new flag update data
        const bondFlagData = Object.fromEntries(
          Object.entries({
            bond,
            bondPowers,
            bondAnswers: {
              a: bondAnswers[0],
              b: bondAnswers[1]
            },
            minorIdeal: this.fData.minorIdeal ?? minorIdeal,
            pilot_xp:   {
              value: this.fData.pilot_xp?.value ?? xp,
              max:   this.fData.pilot_xp?.max ?? 8
            },
            pilot_stress: {
              value: this.fData.pilot_stress?.value ?? stress,
              max:   this.fData.pilot_stress?.max ?? 8
            },
            burden_clocks,
            clocks,
            collapse
          }).map(([key, value]) => [`flags.eunos-lancer-hacks.${key}`, value])
        );

        // Write bond-related data to module flags
        await this.update(bondFlagData);
      }

      // override is_pilot(): this is LancerActor & {
      //   data: LancerActorDataProperties<EntryType.PILOT>;
      //   system: LancerActorSystemProperties<EntryType.PILOT>;
      // } {
      //   return true;
      // }
    }

    return EunosLancerActor as typeof Actor & ConstructorOf<EunosLancerActor>;
  }

  static async Initialize() {

    console.log("*** OVERRIDING LANCER ACTOR DOCUMENT CLASS ***");
    CONFIG.Actor.documentClass = this.Define_EunosLancerActor(CONFIG.Actor.documentClass);

    return loadTemplates([
      "modules/eunos-lancer-hacks/templates/partials/clock.hbs",
      "modules/eunos-lancer-hacks/templates/partials/bonds.hbs",
      "modules/eunos-lancer-hacks/templates/partials/power-chat.hbs",
      "modules/eunos-lancer-hacks/templates/partials/dotline.hbs"
    ]);
  }
}
