import type { AccDiffDataSerialized } from "../helpers/acc_diff";
import { ActivationOptions } from "../enums";
export declare function encodeActivationMacroData(actor: any, item: any): string;
/**
 * Dispatch wrapper for the "action chips" on the bottom of many items, traits, systems, and so on.
 * @param a       {string}                    Actor to roll as.
 * @param i       {string}                    Item to use.
 * @param type    {ActivationOptions}         Options for how to perform the activation
 * @param index   {number}                    ?
 * @param rerollData {AccDiffDataSerialized}  saved accdiff data for rerolls
 */
export declare function prepareActivationMacro(a: string, i: string, type: ActivationOptions, index: number, rerollData?: AccDiffDataSerialized): Promise<void>;
