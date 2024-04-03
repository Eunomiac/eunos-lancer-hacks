import C from "../core/constants";
import type {LancerTokenDocument} from "../@types/module/token";
import {EntryType} from "machine-mind";

export default class Hack_BarBrawl {
  static get IsActive() {
    return game.modules.has("barbrawl");
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

  static async ApplyConfig(value: keyof typeof C["barBrawlConfigs"]) {
    const barBrawlConfig = C.barBrawlConfigs[value];
    function isPerType(ref: unknown): ref is Record<EntryType, object> {
      return Boolean(ref && typeof ref === "object" && EntryType.MECH in ref);
    }
    // const isPerType = isPerType(barBrawlConfig);
    await game.settings.set("barbrawl", "defaultsPerType", isPerType);
    await game.settings.set("barbrawl", "defaultTypeResources", C.barBrawlConfigs[value]);

    // :warning: Reset all actors' prototype token bars
    await Promise.all(game.actors?.map((a) => a.update({"token.flags.barbrawl.-=resourceBars": null})) ?? []);

    // Remove vision ranges from tokens
    await Promise.all(
      (game.scenes ?? []).map((scene: Scene) => Promise.all(
        scene.tokens.map((token: LancerTokenDocument) => {
          if (!token?.actor?.is_mech()) { return null; }

          // Get sensor range of actor's active mech frame
          const activeFrameID = token.actor.system.loadout.frame?.id;
          const activeFrame = token.actor.items.get(activeFrameID ?? "");
          if (!activeFrame?.is_frame()) { return null; }
          const sensorRange = activeFrame.system.stats.sensor_range;
          if (typeof sensorRange !== "number") { return null; }

          const updateData: DeepPartial<EunosLancerTokenData> = {
            sight: {
              enabled: true,
              color: null,
              range: sensorRange
            },
            detectionModes: [
              {id: "feelTremor", enabled: true, range: sensorRange},
              {id: "basicSight", enabled: true, range: sensorRange}
            ]
          };
          return token.update(updateData);
        })
      ))
    );

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

  static Initialize() {
    if (!this.IsActive) return;
    game.settings.register("eunos-lancer-hacks",
      "barbrawlConfig",
      {
        name: "BarBrawl Token Configuration",
        hint: "Applies Lancer Configuration to Token Bars.",
        scope: "world",
        config: true,
        default: false,
        type: Boolean,
        onChange: (value) => {
          if (value) {
            ui.notifications?.info("Applying BarBrawl token configuration...");
            this.ApplyConfig("dodgepong");
          }
        }
      }
    );
  }
}
