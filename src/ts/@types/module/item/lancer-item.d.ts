import { EntryType, LiveEntryTypes, MechSystem, MechWeapon, NpcFeature, RangeType, RegEntry, RegEntryTypes, RegRangeData } from "machine-mind";
interface DerivedProperties<T extends LancerItemType> {
    max_uses: number;
    mm: LiveEntryTypes<T> | null;
    mm_promise: Promise<LiveEntryTypes<T>>;
}
interface LancerItemDataSource<T extends LancerItemType> {
    type: T;
    data: RegEntryTypes<T>;
}
interface LancerItemDataProperties<T extends LancerItemType> {
    type: T;
    data: RegEntryTypes<T> & {
        derived: DerivedProperties<T>;
    };
}

type LancerItemSystemProperties<T extends LancerItemType> = RegEntryTypes<T> & {
  derived: DerivedProperties<T>;
};
/**
 * Union type for Item.data._source. Only really used in prepareData
 */
declare type LancerItemSource = LancerItemDataSource<EntryType.CORE_BONUS> | LancerItemDataSource<EntryType.ENVIRONMENT> | LancerItemDataSource<EntryType.FACTION> | LancerItemDataSource<EntryType.FRAME> | LancerItemDataSource<EntryType.LICENSE> | LancerItemDataSource<EntryType.MANUFACTURER> | LancerItemDataSource<EntryType.MECH_SYSTEM> | LancerItemDataSource<EntryType.MECH_WEAPON> | LancerItemDataSource<EntryType.NPC_CLASS> | LancerItemDataSource<EntryType.NPC_FEATURE> | LancerItemDataSource<EntryType.NPC_TEMPLATE> | LancerItemDataSource<EntryType.ORGANIZATION> | LancerItemDataSource<EntryType.PILOT_ARMOR> | LancerItemDataSource<EntryType.PILOT_GEAR> | LancerItemDataSource<EntryType.PILOT_WEAPON> | LancerItemDataSource<EntryType.QUIRK> | LancerItemDataSource<EntryType.RESERVE> | LancerItemDataSource<EntryType.SITREP> | LancerItemDataSource<EntryType.SKILL> | LancerItemDataSource<EntryType.STATUS> | LancerItemDataSource<EntryType.TAG> | LancerItemDataSource<EntryType.TALENT> | LancerItemDataSource<EntryType.WEAPON_MOD>;
/**
 * Union type for Item.data
 * Can be discriminated by testing Item.data.type
 */
declare type LancerItemProperties = LancerItemDataProperties<EntryType.CORE_BONUS> | LancerItemDataProperties<EntryType.ENVIRONMENT> | LancerItemDataProperties<EntryType.FACTION> | LancerItemDataProperties<EntryType.FRAME> | LancerItemDataProperties<EntryType.LICENSE> | LancerItemDataProperties<EntryType.MANUFACTURER> | LancerItemDataProperties<EntryType.MECH_SYSTEM> | LancerItemDataProperties<EntryType.MECH_WEAPON> | LancerItemDataProperties<EntryType.NPC_CLASS> | LancerItemDataProperties<EntryType.NPC_FEATURE> | LancerItemDataProperties<EntryType.NPC_TEMPLATE> | LancerItemDataProperties<EntryType.ORGANIZATION> | LancerItemDataProperties<EntryType.PILOT_ARMOR> | LancerItemDataProperties<EntryType.PILOT_GEAR> | LancerItemDataProperties<EntryType.PILOT_WEAPON> | LancerItemDataProperties<EntryType.QUIRK> | LancerItemDataProperties<EntryType.RESERVE> | LancerItemDataProperties<EntryType.SITREP> | LancerItemDataProperties<EntryType.SKILL> | LancerItemDataProperties<EntryType.STATUS> | LancerItemDataProperties<EntryType.TAG> | LancerItemDataProperties<EntryType.TALENT> | LancerItemDataProperties<EntryType.WEAPON_MOD>;

declare type LancerItemSystem = LancerItemSystemProperties<EntryType.CORE_BONUS> | LancerItemSystemProperties<EntryType.ENVIRONMENT> | LancerItemSystemProperties<EntryType.FACTION> | LancerItemSystemProperties<EntryType.FRAME> | LancerItemSystemProperties<EntryType.LICENSE> | LancerItemSystemProperties<EntryType.MANUFACTURER> | LancerItemSystemProperties<EntryType.MECH_SYSTEM> | LancerItemSystemProperties<EntryType.MECH_WEAPON> | LancerItemSystemProperties<EntryType.NPC_CLASS> | LancerItemSystemProperties<EntryType.NPC_FEATURE> | LancerItemSystemProperties<EntryType.NPC_TEMPLATE> | LancerItemSystemProperties<EntryType.ORGANIZATION> | LancerItemSystemProperties<EntryType.PILOT_ARMOR> | LancerItemSystemProperties<EntryType.PILOT_GEAR> | LancerItemSystemProperties<EntryType.PILOT_WEAPON> | LancerItemSystemProperties<EntryType.QUIRK> | LancerItemSystemProperties<EntryType.RESERVE> | LancerItemSystemProperties<EntryType.SITREP> | LancerItemSystemProperties<EntryType.SKILL> | LancerItemSystemProperties<EntryType.STATUS> | LancerItemSystemProperties<EntryType.TAG> | LancerItemSystemProperties<EntryType.TALENT> | LancerItemSystemProperties<EntryType.WEAPON_MOD>;

declare global {
    interface SourceConfig {
        Item: LancerItemSource;
    }
    interface DataConfig {
        Item: LancerItemProperties;
    }
    interface DocumentClassConfig {
        Item: typeof LancerItem;
    }
}
export declare class LancerItem extends Item {
    system: LancerItemSystem;
    /**
     * Returns all ranges for the item that match the provided range types
     */
    rangesFor(types: Set<RangeType> | RangeType[]): RegRangeData[];
    private _current_prepare_job_id;
    private _job_tracker;
    private _prev_derived;
    /**
     * Force name down to item,
     * And more importantly, perform MM workflow
     */
    prepareData(): void;
    /** @override
     * Want to destroy derived data before passing it to an update
     */
    update(data: any, options?: {}): Promise<this | undefined>;
    protected _preCreate(...[data, options, user]: Parameters<Item["_preCreate"]>): Promise<void>;
    is_core_bonus(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.CORE_BONUS>;
        system: LancerItemSystemProperties<EntryType.CORE_BONUS>;
    };
    is_environment(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.ENVIRONMENT>;
        system: LancerItemSystemProperties<EntryType.ENVIRONMENT>;
    };
    is_faction(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.FACTION>;
        system: LancerItemSystemProperties<EntryType.FACTION>;
    };
    is_frame(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.FRAME>;
        system: LancerItemSystemProperties<EntryType.FRAME>;
    };
    is_license(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.LICENSE>;
        system: LancerItemSystemProperties<EntryType.LICENSE>;
    };
    is_manufacturer(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.MANUFACTURER>;
        system: LancerItemSystemProperties<EntryType.MANUFACTURER>;
    };
    is_mech_system(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.MECH_SYSTEM>;
        system: LancerItemSystemProperties<EntryType.MECH_SYSTEM>;
    };
    is_mech_weapon(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.MECH_WEAPON>;
        system: LancerItemSystemProperties<EntryType.MECH_WEAPON>;
    };
    is_npc_class(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.NPC_CLASS>;
        system: LancerItemSystemProperties<EntryType.NPC_CLASS>;
    };
    is_npc_feature(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.NPC_FEATURE>;
        system: LancerItemSystemProperties<EntryType.NPC_FEATURE>;
    };
    is_npc_template(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.NPC_TEMPLATE>;
        system: LancerItemSystemProperties<EntryType.NPC_TEMPLATE>;
    };
    is_organization(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.ORGANIZATION>;
        system: LancerItemSystemProperties<EntryType.ORGANIZATION>;
    };
    is_pilot_armor(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.PILOT_ARMOR>;
        system: LancerItemSystemProperties<EntryType.PILOT_ARMOR>;
    };
    is_pilot_gear(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.PILOT_GEAR>;
        system: LancerItemSystemProperties<EntryType.PILOT_GEAR>;
    };
    is_pilot_weapon(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.PILOT_WEAPON>;
        system: LancerItemSystemProperties<EntryType.PILOT_WEAPON>;
    };
    is_quirk(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.QUIRK>;
        system: LancerItemSystemProperties<EntryType.QUIRK>;
    };
    is_reserve(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.RESERVE>;
        system: LancerItemSystemProperties<EntryType.RESERVE>;
    };
    is_sitrep(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.SITREP>;
        system: LancerItemSystemProperties<EntryType.SITREP>;
    };
    is_skill(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.SKILL>;
        system: LancerItemSystemProperties<EntryType.SKILL>;
    };
    is_status(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.STATUS>;
        system: LancerItemSystemProperties<EntryType.STATUS>;
    };
    is_tag(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.TAG>;
        system: LancerItemSystemProperties<EntryType.TAG>;
    };
    is_talent(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.TALENT>;
        system: LancerItemSystemProperties<EntryType.TALENT>;
    };
    is_weapon_mod(): this is LancerItem & {
        data: LancerItemDataProperties<EntryType.WEAPON_MOD>;
        system: LancerItemSystemProperties<EntryType.WEAPON_MOD>;
    };
}
export declare type AnyMMItem = LiveEntryTypes<LancerItemType>;
export declare type LancerItemType = EntryType.CORE_BONUS | EntryType.FACTION | EntryType.FRAME | EntryType.LICENSE | EntryType.MECH_WEAPON | EntryType.MECH_SYSTEM | EntryType.NPC_CLASS | EntryType.NPC_TEMPLATE | EntryType.NPC_FEATURE | EntryType.ORGANIZATION | EntryType.PILOT_ARMOR | EntryType.PILOT_WEAPON | EntryType.PILOT_GEAR | EntryType.RESERVE | EntryType.SKILL | EntryType.STATUS | EntryType.TALENT | EntryType.WEAPON_MOD | EntryType.QUIRK | EntryType.MANUFACTURER | EntryType.SITREP | EntryType.ENVIRONMENT | EntryType.TAG;
export declare const LancerItemTypes: EntryType[];
export declare function is_item_type(type: EntryType): type is LancerItemType;
export declare function is_reg_mech_weapon(item: RegEntry<any>): item is MechWeapon;
export declare function is_reg_mech_system(item: RegEntry<any>): item is MechSystem;
export declare function is_reg_npc_feature(item: RegEntry<any>): item is NpcFeature;
export {};
