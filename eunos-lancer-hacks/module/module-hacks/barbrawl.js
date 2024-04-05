// @ts-nocheck
import C from "../core/constants.js";
export default class Hack_BarBrawl {
    static get IsActive() {
        return game.modules.has("barbrawl");
    }
    static get IsSubdivisionsMatchesMaxOk() {
        if (!this.IsActive) {
            return false;
        }
        return game.modules.get("barbrawl").version === "1.7.8";
    }
    static get Configs() {
        if (!this.IsActive) {
            return [];
        }
        const validConfigs = {
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
    static async ApplyConfig(value) {
        const barBrawlConfig = C.barBrawlConfigs[value];
        const isPerType = "mech" in barBrawlConfig;
        await game.settings.set("barbrawl", "defaultsPerType", isPerType);
        await game.settings.set("barbrawl", "defaultTypeResources", C.barBrawlConfigs[value]);
        // :warning: Reset all actors' prototype token bars
        await Promise.all(game.actors.map((a) => a.update({ "token.flags.barbrawl.-=resourceBars": null })));
        // Remove vision ranges from tokens
        await Promise.all(game.scenes.map((scene) => Promise.all(scene.tokens.map((token) => {
            const updateData = {
                sight: token.sight,
            };
            if (token?.actor?.type !== "mech") {
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
            updateData.sight.enabled = true;
            updateData.sight.color = null;
            updateData.sight.range = sensorRange;
            updateData.detectionModes = [
                { id: "feelTremor", enabled: true, range: sensorRange },
                { id: "basicSight", enabled: true, range: sensorRange }
            ];
            return token.update(updateData);
        }))));
        // Reset the bars on all existing tokens
        await Promise.all(game.scenes.map(async (s) => {
            const updates = await Promise.all(s.tokens.map(async (t) => {
                await t.unsetFlag("barbrawl", "resourceBars");
                return {
                    _id: t.id,
                    "flags.barbrawl.resourceBars": isPerType
                        ? barBrawlConfig[t.actor.type]
                        : barBrawlConfig
                };
            }));
            console.log(updates);
            return s.updateEmbeddedDocuments("Token", updates);
        }));
        ui.notifications.info("Done");
    }
    static Initialize() {
        if (!this.IsActive)
            return;
        game.settings.register("eunos-lancer-hacks", "barbrawlConfig", {
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
        });
    }
}
