import type { LancerActor } from "../actor/lancer-actor";
/**
 * Performs a roll on the overheat table for the given actor
 * @param a           - Actor or ID of actor to overheat
 * @param reroll_data - Data to use if rerolling. Setting this also supresses the dialog.
 */
export declare function prepareOverheatMacro(a: string | LancerActor, reroll_data?: {
    stress: number;
}): Promise<void>;
