import type { HelperOptions } from "handlebars";
import type { LancerActor } from "../actor/lancer-actor";
export declare type CollapseRegistry = {
    [LID: string]: number;
};
/** Suuuuuper work in progress helper. The loadout view for a mech (tech here can mostly be reused for pilot)
 * TODO:
 * - Weapon mods
 * - .... system mods :)
 * - Ref validation (you shouldn't be able to equip another mechs items, etc)
 */
export declare function mech_loadout(mech_path: string, helper: HelperOptions): string;
export declare function pilot_slot(data_path: string, options: HelperOptions): string;
/**
 * Builds HTML for a frame reference. Either an empty ref to give a drop target, or a preview
 * with traits and core system.
 * @param actor       Actor the ref belongs to.
 * @param frame_path  Path to the frame's location in actor data.
 * @param helper      Standard helper options.
 * @return            HTML for the frame reference, typically for inclusion in a mech sheet.
 */
export declare function mech_frame_refview(actor: LancerActor, frame_path: string, helper: HelperOptions): string;
