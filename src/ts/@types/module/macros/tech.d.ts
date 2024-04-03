import type { LancerItem } from "../item/lancer-item";
import type { LancerActor } from "../actor/lancer-actor";
import type { LancerMacroData, LancerTechMacroData } from "../interfaces";
import type { AccDiffDataSerialized } from "../helpers/acc_diff";
export declare function prepareTechMacro(a: string, t: string, rerollData?: AccDiffDataSerialized): Promise<void>;
export declare function rollTechMacro(actor: LancerActor, data: LancerTechMacroData, partialMacroData: LancerMacroData, rerollData?: AccDiffDataSerialized, item?: LancerItem): Promise<void>;
