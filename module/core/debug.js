/* ****▌███████████████████████████████████████████████████████████████████████████▐**** *\
|*     ▌█░░░░░░░░░ Euno's Hacks for Lancer for Foundry VTT ░░░░░░░░░░░█▐     *|
|*     ▌██████████████████░░░░░░░░░░░░░ by Eunomiac ░░░░░░░░░░░░░██████████████████▐     *|
|*     ▌█  License █ v0.1 ██▐     *|
|*     ▌████░░░░  ░░░░█████▐     *|
\* ****▌███████████████████████████████████████████████████████████████████████████▐**** */
/* @@DOUBLE-BLANK@@ ~*/
import { RollPermissions, ActionTrait, RollPhase, Effect, RollType, Position } from "../core/constants.js";
import { BladesPC, BladesNPC, BladesFaction } from "../documents/BladesActorProxy.js";
import { BladesRollPrimary, BladesRollOpposition } from "../classes/BladesRoll.js";
class BladesDebug {
    static async GetSampleSchemas(docNames = {}) {
        const SAMPLE_USER_NAME = docNames.user || "Alistair";
        const SAMPLE_PC_NAME = docNames.pc || "Alistair";
        const SAMPLE_NPC_NAME = docNames.npc || "Setarra";
        const SAMPLE_FACTION_NAME = docNames.faction || "the Bluecoats";
        const sampleUser = game.users.getName(SAMPLE_USER_NAME);
        if (!sampleUser) {
            throw new Error(`Sample user with name "${SAMPLE_USER_NAME}" not found.`);
        }
        const samplePC = game.actors.getName(SAMPLE_PC_NAME);
        if (!BladesPC.IsType(samplePC)) {
            throw new Error(`Sample BladesPC with name "${SAMPLE_PC_NAME}" not found.`);
        }
        const sampleNPC = game.actors.getName(SAMPLE_NPC_NAME);
        if (!BladesNPC.IsType(sampleNPC)) {
            throw new Error(`Sample BladesNPC with name "${SAMPLE_NPC_NAME}" not found or is not a valid BladesNPC.`);
        }
        const sampleFaction = game.actors.getName(SAMPLE_FACTION_NAME);
        if (!BladesFaction.IsType(sampleFaction)) {
            throw new Error(`Sample BladesFaction with name "${SAMPLE_FACTION_NAME}" not found or is not a valid BladesFaction.`);
        }
        const BladesActionRoll_Schema = {
            rollType: RollType.Action,
            rollTrait: ActionTrait.skirmish,
            rollPrimaryData: BladesRollPrimary.GetDataFromDoc(samplePC),
            rollOppData: BladesRollOpposition.GetDataFromDoc(sampleFaction),
            rollModsData: {},
            rollPositionInitial: Position.risky,
            rollEffectInitial: Effect.standard,
            rollPosEffectTrade: false,
            rollPhase: RollPhase.Collaboration,
            GMBoosts: {},
            GMOppBoosts: {},
            GMOverrides: {},
            rollFactorToggles: {
                source: {},
                opposition: {}
            },
            userPermissions: {
                [sampleUser.id]: RollPermissions.Primary
            }
        };
        return {
            BladesActionRoll_Schema
        };
    }
}
export default BladesDebug;