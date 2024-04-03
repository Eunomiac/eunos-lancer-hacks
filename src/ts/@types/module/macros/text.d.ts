import type { LancerActor } from "../actor/lancer-actor";
import type { LancerTextMacroData } from "../interfaces";
import { TagInstance } from "machine-mind";
/**
 * Given basic information, prepares a generic text-only macro to display descriptions etc
 * @param a     String of the actor ID to roll the macro as
 * @param title Data path to title of the macro
 * @param text  Data path to text to be displayed by the macro
 * @param tags  Can optionally pass through an array of tags to be rendered
 */
export declare function prepareTextMacro(a: string, title: string, text: string, tags?: TagInstance[]): void;
/**
 * Given prepared data, handles rolling of a generic text-only macro to display descriptions etc.
 * @param actor {Actor} Actor rolling the macro.
 * @param data {LancerTextMacroData} Prepared macro data.
 */
export declare function rollTextMacro(actor: LancerActor, data: LancerTextMacroData): Promise<void>;
