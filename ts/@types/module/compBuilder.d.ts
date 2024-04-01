import { IContentPack } from "machine-mind";
export declare const PACK_SCOPE = "world";
export declare function clear_all(): Promise<void>;
export declare function import_cp(cp: IContentPack, progress_callback?: (done: number, out_of: number) => void): Promise<void>;
export declare let IS_IMPORTING: boolean;
export declare function set_all_lock(lock?: boolean): Promise<void>;
export declare function clearCompendiumData(): Promise<void>;
