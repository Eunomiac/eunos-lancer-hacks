import C from "../core/constants";
import {EntryType} from "machine-mind";

declare global {

  interface BB_BarConfig {
    id: string;
    ignoreMin?: boolean;
    ignoreMax?: boolean;
    mincolor: string;
    maxcolor: string;
    position: string;
    attribute: string;
    visibility: number;
    hideFull?: boolean;
    hideEmpty?: boolean;
    indentLeft?: number | null;
    indentRight?: number | null;
    shareHeight?: boolean;
    otherVisibility?: number;
    ownerVisibility?: number;
    gmVisibility?: number;
    style?: string;
    label?: string;
    invert?: boolean;
    subdivisions?: number | null;
    subdivisionsOwner?: boolean;
    subdivisionsMatchesMax?: boolean;
    fgImage?: string;
    bgImage?: string;
    opacity?: number | null;
    order?: number;
    max?: number | null;
  }

  type BB_Config = Record<string, BB_BarConfig>;
}

export default class Hack_BarBrawl {
  // #region Environment Viability Checks ~
  static get canEnable(): boolean {
    return game.modules.get("barbrawl")?.active ?? false;
  }
  static get isEnabled(): boolean {
    return this.canEnable && ELH.Settings.IsSubmenuEnabled("barbrawl");
  }
  // #endregion

  static RegisterSettings() {
    ELH.Settings.RegisterSettingsMenu(
      "barbrawl",
      {
        name: "Token Bars & Borders",
        hint: "Select and apply a BarBrawls token bars configuration, and update width, visibility and appearance of token borders.",
        icon: "fa-duotone fa-bars",
        dependencies: [
          {type: "module", id: "barbrawl", display: "BarBrawl"},
          {type: "module", id: "hex-size-support", display: "Hex Size Support"}
        ]
      },
      {
        selectConfig: {
          name: "Select BarBrawl Config",
          hint: "Choose one of the provided BarBrawl configurations to use.",
          inputType: ELH.Settings.InputType.Select,
          default: "custom",
          choices: Object.fromEntries(
              Object.keys(C.barBrawlConfigs).map((bbKey) => {
                  switch (bbKey) {
                      case "custom": return ["custom", "Apply Euno's Custom Configuration"];
                      default: return [bbKey, `Apply Config '${bbKey}'`];
                  }
              })
          ),
          handlers: {
              change: (event, elem$, data) => {
                  const selectedValue = elem$.val() as string;
                  const currentValue = data.selectConfig;
                  if (currentValue !== selectedValue) {
                      ui.notifications.info(`Applying BarBrawl token configuration: ${selectedValue}...`);
                      data.selectConfig = selectedValue;
                      Hack_BarBrawl.ApplyConfig(selectedValue);
                      ELH.Settings.Set("eunos-lancer-hacks", "barbrawl", data);
                  }
              }
          },
          onEnable() {
            const selectConfig = ELH.Settings.Get("eunos-lancer-hacks", "barbrawl", "selectConfig") as string;
            if (!selectConfig) { return Promise.resolve(); }
            return Hack_BarBrawl.ApplyConfig(selectConfig);
          },
          onDisable() {
            return Hack_BarBrawl.DisableConfig();
          },
          async onRefresh() { return this.onEnable?.(); }
        },
        overrideTokenBorders: {
          name: "Override Token Border",
          hint: "Update token borders to be wider.",
          inputType: ELH.Settings.InputType.Button,
          icon: "fa-regular fa-hexagon",
          default: undefined,
          handlers: {
            click: () => {
              ELH.Settings.SetData("hex-size-support", {
                borderWidth: 20,
                altOrientationDefault: false,
                borderBehindToken: true,
                fillBorder: true,
                alwaysShowBorder: false,
                controlledColor: "#FFFF00",
                partyColor: "#00cddb",
                friendlyColor: "#055076",
                neutralColor: "#b47e08",
                hostileColor: "#8c0d0f"
              });
            }
          },
          onEnable() {
            return ELH.Settings.SetData("hex-size-support", {
              borderWidth: 20,
              altOrientationDefault: false,
              borderBehindToken: true,
              fillBorder: true,
              alwaysShowBorder: false,
              controlledColor: "#FFFF00",
              partyColor: "#00cddb",
              friendlyColor: "#055076",
              neutralColor: "#b47e08",
              hostileColor: "#8c0d0f"
            });
          },
          async onRefresh() { return this.onEnable?.(); }
        }
      },
      [
        ["hex-size-support", "borderWidth"],
        ["hex-size-support", "altOrientationDefault"],
        ["hex-size-support", "borderBehindToken"],
        ["hex-size-support", "fillBorder"],
        ["hex-size-support", "alwaysShowBorder"],
        ["hex-size-support", "controlledColor"],
        ["hex-size-support", "partyColor"],
        ["hex-size-support", "friendlyColor"],
        ["hex-size-support", "neutralColor"],
        ["hex-size-support", "hostileColor"],
        ["barbrawl", "defaultsPerType"],
        ["barbrawl", "defaultTypeResources"]
      ]
    );
  }

  static Initialize() {
    if (!this.canEnable) return;
    if (!game.user?.isGM) { return; }
    this.RegisterSettings();
  }
  static get IsSubdivisionsMatchesMaxOk() {
    if (!this.canEnable) { return false; }
    const bbModule = game.modules.get("barbrawl") as Game.ModuleData<Game.PackageData<unknown>> & {version: string} | undefined;
    return bbModule && bbModule.version === "1.7.8";
  }

  static get Configs() {
    if (!this.canEnable) { return []; }
    const validConfigs: Record<string, string> = {
      none: "No Change (Custom)",
      Kuenaimaku: "Kuenaimaku's Bars",
      Bolts: "Bolts Simple Bars"
    };
    if (this.IsSubdivisionsMatchesMaxOk) {
      validConfigs.Valkyrion = "Valkyrion's Enhanced Bars";
      validConfigs.dodgepong = "dodgepong's Enhanced Bars";
    }
    return validConfigs;
  }

  static async DisableConfig() {
    // :warning: Reset all actors' prototype token bars
    await Promise.all(game.actors?.map((a) => a.update({"token.flags.barbrawl.-=resourceBars": null})) ?? []);

    // Reset the bars on all existing tokens
    await Promise.all(
      (game.scenes ?? []).map(async (s: Scene) => {
        return Promise.all(s.tokens.map(async (t: LancerTokenDocument) => {
          return t.unsetFlag("barbrawl", "resourceBars");
        }));
      })
    );
  }

  static async ApplyConfig(value: keyof typeof C["barBrawlConfigs"]) {
    const barBrawlConfig = C.barBrawlConfigs[value];
    function isPerType(ref: unknown): ref is Record<EntryType, object> {
      return Boolean(ref && typeof ref === "object" && EntryType.MECH in ref);
    }
    // const isPerType = isPerType(barBrawlConfig);
    await ELH.Settings.Set("barbrawl", "defaultsPerType", isPerType(barBrawlConfig));
    await ELH.Settings.Set("barbrawl", "defaultTypeResources", C.barBrawlConfigs[value]);

    // :warning: Reset all actors' prototype token bars
    await Promise.all(game.actors?.map((a) => a.update({"token.flags.barbrawl.-=resourceBars": null})) ?? []);
    // Reset the bars on all existing tokens
    await Promise.all(
      (game.scenes ?? []).map(async (s: Scene) => {
        const updates = await Promise.all(s.tokens.map(async (t: LancerTokenDocument) => {
          const {type} = t.actor ?? {};
          if (!type) { return; }
          await t.unsetFlag("barbrawl", "resourceBars");
          return {
            "_id": t.id,
            "flags.barbrawl.resourceBars": isPerType(barBrawlConfig)
              ? barBrawlConfig[type]
              : barBrawlConfig
          };
        }));
        console.log(updates);
        return s.updateEmbeddedDocuments("Token", updates.filter(Boolean) as Array<Record<string, unknown>>);
      })
    );

    ui.notifications?.info("Done");
  }
}
