import type { HelperOptions } from "handlebars";
import type { ActionType } from "../action";
import type { LancerActor } from "../actor/lancer-actor";
export declare function get_actor_id(options: HelperOptions): string | null;
export declare function stat_edit_card_max(title: string, icon: string, data_path: string, max_path: string, options: HelperOptions): string;
export declare function stat_edit_card(title: string, icon: string, data_path: string, options: HelperOptions): string;
export declare function stat_view_card(title: string, icon: string, data_path: string, options: HelperOptions & {
    rollable?: boolean;
}): string;
export declare function stat_rollable_card(title: string, icon: string, data_path: string, options: HelperOptions): string;
export declare function compact_stat_view(icon: string, data_path: string, options: HelperOptions): string;
export declare function compact_stat_edit(icon: string, data_path: string, max_path: string, options: HelperOptions): string;
export declare function clicker_num_input(data_path: string, max: number, options: HelperOptions): string;
export declare function clicker_stat_card(title: string, icon: string, data_path: string, roller: boolean, options: HelperOptions): string;
export declare function action_button(title: string, data_path: string, action: ActionType, options: HelperOptions & {
    rollable?: boolean;
}): string;
export declare function macro_button(title: string, macro: string, data_path: string, options: HelperOptions & {
    rollable?: boolean;
}): string;
export declare function tech_flow_card(title: string, icon: string, data_path: string, options: HelperOptions): string;
export declare function npc_clicker_stat_card(title: string, data_path: string, options: HelperOptions): string;
/**
 * Handlebars helper for an overcharge button
 * Currently this is overkill, but eventually we want to support custom overcharge values
 * @param actor Reference to the actor
 * @param overcharge_path Path to current overcharge level, from 0 to 3
 * @param options Options object to pass to resolve_helper_dotpath
 */
export declare function overcharge_button(actor: LancerActor, overcharge_path: string, options: HelperOptions): string;
/**
 * Handlebars helper for an NPC tier selector
 * @param tier The tier ID string
 */
export declare function npc_tier_selector(tier_path: string, helper: HelperOptions): string;
export declare function is_combatant(actor: LancerActor): import("lancer-initiative").LancerCombatant | undefined;
export declare function deployer_slot(data_path: string, options: HelperOptions): string;
