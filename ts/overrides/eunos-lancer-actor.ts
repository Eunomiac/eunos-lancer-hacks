/* eslint-disable @typescript-eslint/no-unused-vars */
import C, {LancerBondPowerData, LancerBondType} from "../core/constants";
import {LancerActor, LancerActorType} from "../@types/module/actor/lancer-actor";
import {LancerToken, LancerTokenDocument} from "../@types/module/token";
import {EntryType, Pilot} from "machine-mind";
import {TokenData} from "@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/data/data.mjs";
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
    burden_clocks: Record<BurdenKey, IDString>,
    clocks: Record<IDString, LancerClockData>,
    collapse: {
      main: boolean,
      stress: boolean,
      clocks: boolean,
      powers: Record<PowerKey, boolean>
    }
  }

  interface EunosLancerPilot extends LancerActor, Pilot {
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

  interface EunosLancerTokenData extends TokenData {
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

  interface EunosLancerToken extends LancerToken {
    document: EunosLancerTokenDocument,
    data: EunosLancerTokenData
  }

  interface EunosLancerTokenDocument extends LancerTokenDocument {
    data: EunosLancerTokenData
  }

  // class LancerActorSheet<T extends LancerActorType> {
  //   get actor(): EunosLancerPilot<T>;
  // }

  // type EunosLancerPilot = LancerActor & {fData: Partial<EunosLancerFlags>};
}

export default class EunosLancerPilot extends LancerActor {

  static Initialize() {
    // Register the new actor class
    CONFIG.Actor.documentClass = this;
  }

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
    ] as [LancerClockData, LancerClockData, LancerClockData];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  override async importCC(data: any, clearFirst = false) {
    if (!data || this.type !== "pilot") { return; }
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
    const {bondId, bondPowers: bondPowerData, bondAnswers, minorIdeal, stress, xp} = data;

    if (typeof bondId !== "string" || bondId.length < 3) {
      ui.notifications?.error("Bond not selected; bond tab will be disabled. Please configure your Bonds in the COMP/CON app, then sync again.");
      return;
    }

    // Convert bondId to bond
    const bond = bondId.split(/-/).pop() as LancerBondType;
    // Parse bond powers
    const bondPowers = this.parseBondPowersDownload(bond, bondPowerData);

    // Generate burden clocks if they aren't already registered under fData.burden_clocks
    const burden_clocks: Partial<Record<BurdenKey, IDString>> = this.fData.burden_clocks ?? {};
    const clocks: Partial<Record<IDString, LancerClockData>> = this.fData.clocks ?? {};
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
      main: true,
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
      }).map(([key, value]) => [`flags.eunos-lancer-hacks.${key}`, value])
    );

    // Write bond-related data to module flags
    await this.update(bondFlagData);
  }
}
