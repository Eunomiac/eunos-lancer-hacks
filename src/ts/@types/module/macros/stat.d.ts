import type { LancerActor } from "../actor/lancer-actor";
import type { LancerStatMacroData } from "../interfaces";
import type { AccDiffDataSerialized } from "../helpers/acc_diff";
export declare function prepareStatMacro(a: string, statKey: string, rerollData?: AccDiffDataSerialized): Promise<void>;
export declare function rollStatMacro(actor: LancerActor, data: LancerStatMacroData): Promise<void>;
