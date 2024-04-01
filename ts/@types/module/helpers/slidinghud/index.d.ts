import type HUDZone from "./SlidingHUDZone.svelte";
import type { AccDiffData } from "../acc_diff";
import type { StructStressData } from "../struct_stress/data";
export declare function attach(): Promise<HUDZone>;
export declare function open<T extends keyof HUDData>(key: T, data: HUDData[T]): Promise<HUDData[T]>;
export declare function isOpen(key: keyof HUDData): Promise<boolean>;
export declare function fade(dir?: "out" | "in"): Promise<void>;
declare type HUDData = {
    attack: AccDiffData;
    hase: AccDiffData;
    struct: StructStressData;
    stress: StructStressData;
};
export {};
