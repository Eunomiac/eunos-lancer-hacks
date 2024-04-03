/**
 * Prepares a macro to present core active information for
 * @param a     String of the actor ID to roll the macro as, and who we're getting core info for
 */
export declare function prepareCoreActiveMacro(a: string): Promise<void>;
/**
 * Prepares a macro to present core passive information for
 * Checks whether they have a passive since that could get removed on swap
 * @param a     String of the actor ID to roll the macro as, and who we're getting core info for
 */
export declare function prepareCorePassiveMacro(a: string): Promise<void>;
/**
 * Prepares a macro to present frame trait information
 * @param a     String of the actor ID to roll the macro as, and who we're getting frame trait for
 * @param index Index of the frame trait to roll
 */
export declare function prepareFrameTraitMacro(a: string, index: number): Promise<void>;
