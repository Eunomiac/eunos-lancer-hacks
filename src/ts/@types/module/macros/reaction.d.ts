import type { LancerActor } from "../actor/lancer-actor";
import { LancerReactionMacroData } from "../interfaces";
/**
 * Rolls an NPC reaction macro when given the proper data
 * @param actor {Actor} Actor to roll as. Assumes properly prepared item.
 * @param data {LancerReactionMacroData} Reaction macro data to render.
 */
export declare function rollReactionMacro(actor: LancerActor, data: LancerReactionMacroData): Promise<void>;
