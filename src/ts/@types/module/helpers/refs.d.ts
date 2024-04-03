import type { HelperOptions } from "handlebars";
import { EntryType, LiveEntryTypes, MechSystem, MechWeapon, NpcFeature, OpCtx, PilotGear, PilotWeapon, RegEntry, RegRef, Reserve, WeaponMod } from "machine-mind";
import { AnyMMActor } from "../actor/lancer-actor";
import { AnyMMItem, LancerItemType } from "../item/lancer-item";
import { AllowMMDropPredicateFunc, MMDragResolveCache } from "./dragdrop";
import { CollapseRegistry } from "./loadout";
export declare function ref_commons<T extends EntryType>(item: RegEntry<T> | null): null | {
    img: string;
    name: string;
    uuid: string;
    ref: RegRef<T>;
};
export declare function ref_params(ref: RegRef<any>, uuid: string, path?: string): string;
export declare function simple_mm_ref<T extends EntryType>(types: T | T[], item: RegEntry<T> | null, fallback?: string, slot_path?: string, native?: boolean): string;
export declare function HANDLER_activate_ref_clicking<T extends EntryType>(event: any): Promise<void>;
export declare function recreate_ref_from_element<T extends EntryType>(element: HTMLElement): (RegRef<T> & {
    uuid: string;
}) | null;
export declare function resolve_ref_element<T extends EntryType>(element: HTMLElement, ctx?: OpCtx): Promise<LiveEntryTypes<T> | null>;
/**
 * Creates an img that is also a draggable ref. Expects guaranteed data! Use this to display the primary image in item/actor sheets,
 * so that they can be used as a sort of "self" ref
 *
 * @param img_path The path to read/edit said image
 * @param item The reffable MM item/actor itself
 */
export declare function mm_ref_portrait<T extends EntryType>(img: string, img_path: string, item: RegEntry<T>, _helper: HelperOptions): string;
export declare function editable_mm_ref_list_item<T extends LancerItemType>(item_path: string, trash_action: "delete" | "splice" | "null" | null, helper: HelperOptions, registry?: CollapseRegistry): string;
export declare function hex_array(curr: number, max: number, path: string): string[];
export declare function limited_uses_indicator(item: MechWeapon | MechSystem | WeaponMod | PilotWeapon | PilotGear | NpcFeature, path: string): string;
export declare function reserve_used_indicator(item: Reserve, path: string): string;
export declare function editable_mm_ref_list_item_native(item_path: string, trash_action: "delete" | "splice" | "null" | null, helper: HelperOptions): string;
export declare function mm_ref_list_append_slot(item_array_path: string, allowed_types: string, _helper: HelperOptions): string;
export declare function HANDLER_activate_uses_editor<T>(html: JQuery, data_getter: () => Promise<T> | T): void;
export declare function HANDLER_add_ref_to_list_on_drop<T>(resolver: MMDragResolveCache, html: JQuery, data_getter: () => Promise<T> | T, commit_func: (data: T) => void | Promise<void>): void;
export declare function HANDLER_activate_ref_dragging(html: JQuery): void;
export declare function HANDLER_activate_native_ref_dragging(html: JQuery): void;
export declare function HANDLER_activate_ref_drop_setting<T>(resolver: MMDragResolveCache, html: JQuery, can_drop: null | AllowMMDropPredicateFunc, pre_finalize_drop: ((entry: AnyMMItem | AnyMMActor) => Promise<AnyMMItem | AnyMMActor>) | null, data_getter: () => Promise<T> | T, commit_func: (data: T) => void | Promise<void>): void;
export declare function HANDLER_activate_ref_drop_clearing<T>(html: JQuery, data_getter: () => Promise<T> | T, commit_func: (data: T) => void | Promise<void>): void;
/**
 * Use this for previews of items. Will prevent change/submit events from propagating all the way up,
 * and instead call writeback() on the appropriate document instead.
 * Control in same way as generic action handler: with the "data-commit-item" property pointing at the MM item
 */
export declare function HANDLER_intercept_form_changes<T>(html: JQuery, data_getter: () => Promise<T> | T): void;
