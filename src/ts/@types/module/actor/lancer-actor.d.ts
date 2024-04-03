import { EntryType, Mech, Deployable, Npc, OpCtx, LiveEntryTypes, Pilot, PackedPilotData, RegEntryTypes, Frame } from "machine-mind";
import { LancerSubscription } from "../helpers/hooks";
import type { LancerItemType } from "../item/lancer-item";
import type { RegEntry } from "machine-mind";
import { StabOptions1, StabOptions2 } from "../enums";
import type { ActionData } from "../action";
import { NpcClass } from "machine-mind";
import { AppliedDamage } from "./damage-calc";
interface BoundedValue {
    min: number;
    max: number;
    value: number;
}
interface DerivedProperties<T extends EntryType> {
    hp: {
        max: number;
        value: number;
    };
    heat: BoundedValue;
    stress: BoundedValue;
    structure: BoundedValue;
    repairs: BoundedValue;
    overshield: BoundedValue;
    evasion: number;
    edef: number;
    save_target: number;
    speed: number;
    armor: number;
    mm: LiveEntryTypes<T> | null;
    mm_promise: Promise<LiveEntryTypes<T>>;
}
interface LancerActorDataSource<T extends EntryType> {
    type: T;
    data: RegEntryTypes<T>;
}
interface LancerActorDataProperties<T extends EntryType> {
    type: T;
    data: RegEntryTypes<T> & {
        derived: DerivedProperties<T>;
        action_tracker: ActionData;
    };
}
type LancerActorSystemProperties<T extends EntryType> = RegEntryTypes<T> & {
  derived: DerivedProperties<T>;
  action_tracker: ActionData;
}

declare type LancerActorSource = LancerActorDataSource<EntryType.PILOT> | LancerActorDataSource<EntryType.MECH> | LancerActorDataSource<EntryType.NPC> | LancerActorDataSource<EntryType.DEPLOYABLE>;
declare type LancerActorProperties = LancerActorDataProperties<EntryType.PILOT> | LancerActorDataProperties<EntryType.MECH> | LancerActorDataProperties<EntryType.NPC> | LancerActorDataProperties<EntryType.DEPLOYABLE>;
declare type LancerActorSystem = LancerActorSystemProperties<EntryType.PILOT> | LancerActorSystemProperties<EntryType.MECH> | LancerActorSystemProperties<EntryType.NPC> | LancerActorSystemProperties<EntryType.DEPLOYABLE>;

declare global {
    interface SourceConfig {
        Actor: LancerActorSource;
    }
    interface DataConfig {
        Actor: LancerActorProperties;
    }
    interface DocumentClassConfig {
        Actor: typeof LancerActor;
    }
}
/**
 * Extend the Actor class for Lancer Actors.
 */
export declare class LancerActor extends Actor {
    system: LancerActorSystem;
    subscriptions: LancerSubscription[];
    prior_max_hp: number;
    _actor_ctx: OpCtx;
    /**
     * Performs overheat
     * If automation is enabled, this is called automatically by prepareOverheatMacro
     */
    overheat(reroll_data?: {
        stress: number;
    }): Promise<void>;
    rollOverHeatTable(reroll_data?: {
        stress: number;
    }): Promise<void>;
    /**
     * Performs structure on the mech
     * If automation is enabled, this is called automatically by prepareStructureMacro
     */
    structure(reroll_data?: {
        structure: number;
    }): Promise<void>;
    rollStructureTable(reroll_data?: {
        structure: number;
    }): Promise<void>;
    full_repair(): Promise<void>;
    private refresh;
    private list_items;
    /**
     * Find all limited systems and set them to their max/repaired/ideal state
     */
    restore_all_items(): Promise<void[]>;
    /**
     * Find all owned items and set them to be not destroyed
     */
    repair_all_items(): Promise<void[]>;
    /**
     * Find all owned weapons and reload them
     */
    reload_all_items(): Promise<void[]>;
    /**
     * Locates an ActiveEffect on the Actor by name and removes it if present.
     * @param effect String name of the ActiveEffect to remove.
     */
    remove_active_effect(effect: string): Promise<void>;
    /**
     * Locates ActiveEffects on the Actor by names provided and removes them if present.
     * @param effects Array of String names of the ActiveEffects to remove.
     */
    remove_active_effects(effects: string[]): Promise<void>;
    /**
     * Wipes all ActiveEffects from the Actor.
     */
    remove_all_active_effects(): Promise<void>;
    /**
     * Wipes all ActiveEffects that aren't NPC tiers from the Actor.
     * May be subject to updates to protect additional ActiveEffects.
     */
    remove_nontier_active_effects(): Promise<void>;
    /**
     * Stabilize this actor, given two choices that have already been made
     * @param o1  Choice 1, Cooling or Repairing
     * @param o2  Choice 2, Reloading, removing Burn, or clearing own or adjacent ally condition
     * @returns   Details to be printed to chat
     */
    stabilize(o1: StabOptions1, o2: StabOptions2): Promise<string>;
    damage_calc(damage: AppliedDamage, ap?: boolean, paracausal?: boolean): Promise<number>;
    importCC(data: PackedPilotData, clearFirst?: boolean): Promise<void>;
    clearBadData(): Promise<void>;
    /** @override
     * We want to reset our ctx before this. It is used by our items, such that they all can share
     * the same ctx space.
     */
    prepareEmbeddedDocuments(): void;
    private _current_prepare_job_id;
    private _job_tracker;
    private _prev_derived;
    /** @override
     * We need to both:
     *  - Re-generate all of our subscriptions
     *  - Re-initialize our MM context
     */
    prepareDerivedData(): void;
    /** @override
     * This is mostly copy-pasted from Actor.modifyTokenAttribute
     * to allow negative hps, which are useful for structure checks
     */
    modifyTokenAttribute(attribute: any, value: any, isDelta?: boolean, isBar?: boolean): Promise<this | undefined>;
    /** @override
     * Want to destroy derived data before passing it to an update
     */
    update(...[data, context]: Parameters<Actor["update"]>): Promise<this | undefined>;
    protected _preCreate(...[data, options, user]: Parameters<Actor["_preCreate"]>): Promise<void>;
    /** @override
     * On the result of an update, we want to cascade derived data.
     */
    protected _onUpdate(...[changed, options, user]: Parameters<Actor["_onUpdate"]>): void;
    _onUpdateEmbeddedDocuments(...args: Parameters<Actor["_onUpdateEmbeddedDocuments"]>): void;
    _onDelete(...args: Parameters<Actor["_onDelete"]>): void;
    setupLancerHooks(): void;
    /**
     * Returns the overcharge rolls, modified by bonuses. Only applicable for mechs.
     */
    getOverchargeSequence(): string[] | null;
    /**
     * Returns the current overcharge roll/text. Only applicable for mechs.
     */
    getOverchargeRoll(): string | null;
    is_pilot(): this is LancerActor & {
        data: LancerActorDataProperties<EntryType.PILOT>;
        system: LancerActorSystemProperties<EntryType.PILOT>;
    };
    is_mech(): this is LancerActor & {
        data: LancerActorDataProperties<EntryType.MECH>;
        system: LancerActorSystemProperties<EntryType.MECH>;
    };
    is_npc(): this is LancerActor & {
        data: LancerActorDataProperties<EntryType.NPC>;
        system: LancerActorSystemProperties<EntryType.NPC>;
    };
    is_deployable(): this is LancerActor & {
        data: LancerActorDataProperties<EntryType.DEPLOYABLE>;
        system: LancerActorSystemProperties<EntryType.DEPLOYABLE>;
    };
    /**
     * Taking a new and old frame/class, swaps the actor and/or token images if
     * we detect that the image isn't custom. Will check each individually
     * @param robot     A MM Mech or NPC, passed through to avoid data overwrites
     * @param oldFrame  Old Frame or NPC Class
     * @param newFrame  New Frame or NPC Class
     * @returns         The newFrame if any updates were performed
     */
    swapFrameImage(robot: Mech | Npc, oldFrame: Frame | NpcClass | null, newFrame: Frame | NpcClass): Promise<string>;
}
export declare type AnyMMActor = LiveEntryTypes<LancerActorType>;
export declare type LancerActorType = EntryType.MECH | EntryType.DEPLOYABLE | EntryType.NPC | EntryType.PILOT;
export declare const LancerActorTypes: LancerActorType[];
export declare function is_actor_type(type: LancerActorType | LancerItemType): type is LancerActorType;
export declare function is_reg_pilot(actor: RegEntry<any>): actor is Pilot;
export declare function is_reg_mech(actor: RegEntry<any>): actor is Mech;
export declare function is_reg_npc(actor: RegEntry<any>): actor is Npc;
export declare function is_reg_dep(actor: RegEntry<any>): actor is Deployable;
export {};
