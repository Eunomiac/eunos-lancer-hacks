import type { HelperOptions } from "handlebars";
import { TagInstance } from "machine-mind";
import { Action, ActivationType, Bonus, Counter, Damage, Deployable, FittingSize, Frame, License, MechSystem, NpcClass, NpcTemplate, Range } from "machine-mind";
import { ChipIcons } from "../enums";
import type { LancerActorSheetData, LancerItemSheetData, LancerMacroData } from "../interfaces";
import type { CollapseRegistry } from "./loadout";
import { InventoryDialogData } from "../apps/inventory";
/**
 * Handlebars helper for weapon size selector
 */
export declare function weapon_size_selector(path: string, helper: HelperOptions): string;
/**
 * Handlebars helper for weapon type selector. First parameter is the existing selection.
 */
export declare function weapon_type_selector(path: string, helper: HelperOptions): string;
/**
 * Handlebars helper for range type/value editing
 * Supply with path to Range, and any args that you'd like passed down to the standard input editors, as well as
 */
export declare function range_editor(path: string, options: HelperOptions): string;
/**
 * Handlebars helper for weapon damage type/value editing.
 * Supply with path to Damage, and any args that you'd like passed down to the standard input editors
 */
export declare function damage_editor(path: string, options: HelperOptions): string;
/**
 * Handlebars helper for showing damage values.
 * Supply with the array of Damage[], as well as:
 * - classes: Any additional classes to put on the div holding them
 */
export declare function show_damage_array(damages: Damage[], options: HelperOptions): string;
/**
 * Handlebars helper for showing range values
 */
export declare function show_range_array(ranges: Range[], options: HelperOptions): string;
/**
 * Handlebars helper for an NPC feature preview attack bonus stat
 * @param atk {number} Attack bonus to render
 */
export declare function npc_attack_bonus_preview(atk: number, txt?: string): string;
/**
 * Handlebars helper for an NPC feature preview accuracy stat
 * @param acc {number} Accuracy bonus to render
 */
export declare function npc_accuracy_preview(acc: number): string;
/**
 * Handlebars partial for weapon type selector
 */
export declare function system_type_selector(path: string, options: HelperOptions): string;
/**
 * Handlebars partial for limited uses remaining
 * TODO: make look more like compcon
 */
export declare function uses_control(uses_path: string, max_uses: number, helper: HelperOptions): string;
export declare function npc_feature_preview(npc_feature_path: string, helper: HelperOptions): string;
/** Expected arguments:
 * - bonus_path=<string path to the individual bonus item>,  ex: ="doc.mm.Bonuses.3"
 * - bonus=<bonus object to pre-populate with>
 */
export declare function single_bonus_editor(bonus_path: string, bonus: Bonus, options: HelperOptions): string;
/** Expected arguments:
 * - bonuses_path=<string path to the bonuses array>,  ex: ="doc.mm.Bonuses"
 * - bonuses=<bonus array to pre-populate with>.
 * Displays a list of bonuses, with buttons to add/delete (if edit true)
 */
export declare function bonuses_display(bonuses_path: string, bonuses_array: Bonus[], edit: boolean): string;
export declare function HANDLER_activate_edit_bonus<T>(html: JQuery, data_getter: () => Promise<T> | T, commit_func: (data: T) => void | Promise<void>): void;
export declare function HANDLER_activate_edit_counter<T>(html: JQuery, data_getter: () => Promise<T> | T): void;
/** Expected arguments:
 * - bonus_path=<string path to the individual bonus item>,  ex: ="doc.mm.Bonuses.3"
 * - bonus=<bonus object to pre-populate with>
 */
export declare function single_action_editor(path: string, options: HelperOptions): string;
export declare function pilot_armor_slot(armor_path: string, helper: HelperOptions): string;
export declare function pilot_weapon_refview(weapon_path: string, helper: HelperOptions): string;
export declare function pilot_gear_refview(gear_path: string, helper: HelperOptions): string;
export declare function reserve_refview(reserve_path: string, helper: HelperOptions): string;
/**
 * Handlebars helper for a mech weapon preview card. Doubles as a slot. Mech path needed for bonuses
 */
export declare function mech_weapon_refview(weapon_path: string, mech_path: string | "", options: HelperOptions, registry?: CollapseRegistry, size?: FittingSize): string;
export declare function loading_indicator(loaded: boolean, weapon_path: string): string;
export declare function weapon_mod_ref(mod_path: string, weapon_path: string | null, options: HelperOptions): string;
export declare function manufacturer_ref(source_path: string, helper: HelperOptions): string;
export declare function license_ref(license: License | null, level: number, item_path?: string): string;
export declare function frame_ref(frame: Frame | null, item_path?: string): string;
export declare function npc_class_ref(npc_class: NpcClass | null, item_path?: string): string;
export declare function npc_template_ref(npc_tmpl: NpcTemplate | null, item_path?: string): string;
export declare function action_type_icon(a_type: string): string;
/**
 * Builds the HTML for a given action
 * @param action  Standard action to generate in HTML form
 * @param options Options such as:
 *        full    Determines if we should generate full HTML info or just mini version (title & action)
 *        number  If we're building full, we can pass through a number to denote which index of action
 *                this is for macro purposes. Only used for macro-able actions
 *        tags    Array of TagInstances which can optionally be passed
 * @returns Activation HTML in string form
 */
export declare function buildActionHTML(action: Action, options?: {
    editable?: boolean;
    path?: string;
    full?: boolean;
    num?: number;
    tags?: TagInstance[];
}): string;
/**
 * Wrapper for buildActionHTML that always builds the full card.
 * @param action  Standard action to generate in HTML form
 * @param options Options such as:
 *        number  A number to denote which index of action
 *                this is for macro purposes. Only used for macro-able actions.
 *        tags    Array of TagInstances which can optionally be passed
 * @returns Activation HTML in string form
 */
export declare function buildActionFullHTML(action: Action, options?: {
    editable?: boolean;
    path?: string;
    num?: number;
    tags?: TagInstance[];
}): string;
/**
 * Builds the HTML for a given in-system deployable
 * @param dep     Deployable to generate in HTML form
 * @param full    Determines if we should generate full HTML info or just mini version (title & action)
 * @param num     If we're building full, we can pass through a number to denote which index of action
 *                this is for macro purposes. Only used for macro-able actions
 * @returns Activation HTML in string form
 */
export declare function buildDeployableHTML(dep: Deployable, full?: boolean, num?: number): string;
export declare function buildChipHTML(activation: ActivationType, macroData?: {
    icon?: ChipIcons;
    num?: number;
    isDep?: boolean;
    fullData?: LancerMacroData;
}): string;
export declare function buildSystemHTML(data: MechSystem): string;
export declare function buildCounterHTML(data: Counter, path: string, writeback_path: string, can_delete?: boolean): string;
/**
 * NOTE IT DOES NOT INCLUDE TRAILING /div tag!
 */
export declare function buildCounterHeader(data: Counter, path: string, writeback_path: string, can_delete?: boolean): string;
export declare function buildCounterArrayHTML(counters: Counter[] | {
    counter: Counter;
    source: any;
}[], path: string, custom_path?: string, fully_editable?: boolean): string;
export declare function HANDLER_activate_plus_minus_buttons<T extends LancerActorSheetData<any> | LancerItemSheetData<any>>(html: JQuery, data_getter: () => Promise<T> | T, form_callback: () => any): void;
export declare function HANDLER_activate_counter_listeners<T extends LancerActorSheetData<any> | LancerItemSheetData<any>>(html: JQuery, data_getter: () => Promise<T> | T): void;
export declare function HANDLER_activate_item_context_menus<T extends LancerActorSheetData<any> | LancerItemSheetData<any> | InventoryDialogData>(html: JQuery, data_getter: () => Promise<T> | T, commit_func: (data: T) => void | Promise<void>, view_only?: boolean): void;
export declare function HANDLER_activate_profile_context_menus<T extends LancerItemSheetData<any>>(html: JQuery, data_getter: () => Promise<T> | T, commit_func: (data: T) => void | Promise<void>): void;
