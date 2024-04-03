import type { LancerActor } from "../actor/lancer-actor";
/**
 * Performs a roll on the structure table for the given actor
 * @param a           - Actor or ID of actor to structure
 * @param reroll_data - Data to use if rerolling. Setting this also supresses the dialog.
 */
export declare function prepareStructureMacro(a: string | LancerActor, reroll_data?: {
    structure: number;
}): Promise<void>;
export declare function prepareStructureSecondaryRollMacro(registryId: string): void;
