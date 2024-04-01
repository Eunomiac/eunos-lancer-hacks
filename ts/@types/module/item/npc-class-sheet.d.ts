import type { EntryType } from "machine-mind";
import { LancerItemSheet } from "./item-sheet";
import type { LancerItem } from "./lancer-item";
/**
 * Extend the generic Lancer item sheet
 * @extends {LancerItemSheet}
 */
export declare class LancerNPCClassSheet extends LancerItemSheet<EntryType.NPC_CLASS> {
    /**
     * @override
     * Extend and override the default options used by the generic Lancer item sheet
     */
    static get defaultOptions(): ItemSheet.Options;
    base_feature_items: (LancerItem["data"] & {
        type: EntryType.NPC_FEATURE;
    })[];
    optional_feature_items: (LancerItem["data"] & {
        type: EntryType.NPC_FEATURE;
    })[];
    /** @override */
    _updateObject(_event: any, formData: any): Promise<LancerItem | undefined>;
    static arrayifyStats(data: string[]): number[];
}
