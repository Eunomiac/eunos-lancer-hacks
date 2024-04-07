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
    return game.modules.has("barbrawl");
  }
  static isEnabled(): boolean {
    return this.canEnable && ELH.Settings.IsSubmenuEnabled("barbrawl");
  }
  // #endregion

  static RegisterSettings() {
    ELH.Settings.RegisterSettingsMenu(
      "barbrawl",
      {
        name: "BarBrawl Hacks",
        hint: "Configure settings related to the BarBrawl token bars module.",
        icon: "fa-duotone fa-bars"
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
                      ELH.Settings.SubmenuSet("barbrawl", data);
                  }
              }
          }
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
          }
        }
      }
        // toggleBarBrawl: {
        //   click: (event: Event, elem$: JQuery<HTMLElement>) => {
        //     const bbData = ELH.Settings.SubmenuGet("barbrawl");
        //     const isBBEnabled = $(event.currentTarget as HTMLElement).is(":checked");
        //     if (isBBEnabled) {
        //       ui.notifications?.info(`Applying BarBrawl token configuration: ${bbData.selectConfig.value}...`);
        //       Hack_BarBrawl.ApplyConfig(bbData.selectConfig.value as string);
        //       bbData.toggleBarBrawl.value = true;
        //       elem$.attr("checked", "true");
        //     } else {
        //       ui.notifications?.info("Disabling BarBrawl token configuration.");
        //       Hack_BarBrawl.DisableConfig();
        //       bbData.toggleBarBrawl.value = false;
        //       elem$.attr("checked", "false");
        //     }
        //     ELH.Settings.SubmenuSet("barbrawl", bbData);
        //   }
        // },
    );
  }

  static get IsActive() {
    return game.modules.has("barbrawl");
  }

  static Initialize() {
    if (!this.IsActive) return;
    this.RegisterSettings();
  }
  static get IsSubdivisionsMatchesMaxOk() {
    if (!this.IsActive) { return false; }
    const bbModule = game.modules.get("barbrawl") as Game.ModuleData<Game.PackageData<unknown>> & {version: string} | undefined;
    return bbModule && bbModule.version === "1.7.8";
  }

  static get Configs() {
    if (!this.IsActive) { return []; }
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
    await game.settings.set("barbrawl", "defaultsPerType", false);
    await game.settings.set("barbrawl", "defaultTypeResources", {});

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
    await game.settings.set("barbrawl", "defaultsPerType", isPerType(barBrawlConfig));
    await game.settings.set("barbrawl", "defaultTypeResources", C.barBrawlConfigs[value]);

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
