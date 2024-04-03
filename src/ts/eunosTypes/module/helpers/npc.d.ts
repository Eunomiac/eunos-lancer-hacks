import type { HelperOptions } from "handlebars";
export declare const EffectIcons: {
    Generic: string;
    Basic: string;
    Charge: string;
    Deployable: string;
    AI: string;
    Protocol: string;
    Reaction: string;
    Tech: string;
    Drone: string;
    Bonus: string;
    Offensive: string;
    Profile: string;
};
/**
 * Handlebars helper for effect action type
 */
export declare function action_type_selector(a_type: string, data_target: string): string;
export declare function npc_reaction_effect_preview(path: string, options: HelperOptions): string;
export declare function npc_system_effect_preview(path: string, options: HelperOptions): string;
export declare function npc_trait_effect_preview(path: string, options: HelperOptions): string;
export declare function npc_tech_effect_preview(path: string, options: HelperOptions): string;
export declare function npc_weapon_effect_preview(path: string, options: HelperOptions): string;
