import type { LancerMacroData } from "../interfaces";
/**
 * Verifies the given data, will print specific errors/warnings on validation.
 * @param data The data to verify.
 */
export declare function isValidEncodedMacro(data: LancerMacroData): boolean;
export declare function encodeMacroData(data: LancerMacroData): string;
export declare function runEncodedMacro(el: HTMLElement | LancerMacroData): Promise<any>;
