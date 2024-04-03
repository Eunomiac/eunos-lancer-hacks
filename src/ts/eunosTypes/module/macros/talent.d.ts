import type { LancerActor } from "../actor/lancer-actor";
import type { LancerTalentMacroData } from "../interfaces";
/**
 * Generic macro preparer for a talent
 * Given an actor and item, will prepare data for the macro then roll it.
 * @param a The actor id to speak as
 * @param i The item id that is being rolled
 * @param rank The rank of the talent to roll
 */
export declare function prepareTalentMacro(a: string, i: string, rank: number): Promise<void>;
export declare function rollTalentMacro(actor: LancerActor, data: LancerTalentMacroData): Promise<void>;
