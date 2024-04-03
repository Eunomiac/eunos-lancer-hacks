import { Registry, EntryType, EntryConstructor, ReviveFunc, LiveEntryTypes, RegEntryTypes, RegRef, RegCat, OpCtx, InventoriedRegEntry, LoadOptions } from "machine-mind";
import { LancerActor, LancerActorType } from "../actor/lancer-actor";
import type { LancerItem, LancerItemType } from "../item/lancer-item";
import { DocumentCollectionWrapper, EntFor as DocFor } from "./db_abstractions";
export interface FoundryRegItemData<T extends EntryType> {
    _id: string;
    data: RegEntryTypes<T> & {
        derived: {
            mm: LiveEntryTypes<T> | null;
            mm_promise: Promise<LiveEntryTypes<T>>;
        };
    };
    type: T;
    img: string;
    flags: any;
    name: string;
    folder?: string | null;
}
export interface FoundryRegActorData<T extends EntryType> extends FoundryRegItemData<T> {
    effects: any[];
    token: Token;
}
export interface FoundryFlagData<T extends EntryType = EntryType> {
    orig_doc: DocFor<T>;
    orig_doc_name: string;
    top_level_data: {
        [key: string]: any;
    };
}
/**
 * Parsed configuration for our registry, describing on where we intend to lookup ids etc
 */
export declare type FoundryRegNameParsed = {
    src: "game";
} | {
    src: "game_actor";
    actor_id: ActorID;
} | {
    src: "scene";
    scene_id: SceneID;
} | {
    src: "scene_token";
    scene_id: SceneID;
    token_id: TokenID;
} | {
    src: "comp_core";
} | {
    src: "comp";
    comp_id: CompendiumID;
} | {
    src: "comp_actor";
    comp_id: CompendiumID;
    actor_id: ActorID;
};
declare type ActorID = string;
declare type TokenID = string;
declare type SceneID = string;
declare type CompendiumID = string;
declare type Source_Game = "game";
declare type Source_Scene = "scene";
declare type Source_Core = "comp_core";
declare type Source_Compendium = "comp";
declare type Source_GameActor = `${Source_Game}|${ActorID}`;
declare type Source_TokenActor = `${Source_Scene}|${SceneID}|${TokenID}`;
declare type Source_CustomCompendium = `${Source_Compendium}|${CompendiumID}`;
declare type Source_CompActor = `${Source_Compendium}|${CompendiumID}|${ActorID}`;
export declare type FoundryRegName = Source_Game | Source_Scene | Source_Core | Source_CustomCompendium | Source_GameActor | Source_TokenActor | Source_CompActor;
/**
 * NEW
 * Format of registry names:
 * One of the following:
 * game             - Encompasses the global `game.items` collection.  Equivalent to the "Items.<item_id>" uuid pattern.
 *                    Also encompasses the   `game.actors` collection. Equivalent to the "Actors.<actor_id>" uuid pattern.
 *
 * game|<aid>       - Inventoried registry. Contains the items for game-scoped actor <aid>.
 *                    Equivalent to "Actors.<aid>.Item.<item_id>" uuid pattern.
 *
 * scene|<sid>      - Encompasses all UNLINKED tokens actors on scene <sid>. Equivalent to "Scene.<scene_id>.Token.<token_id>" uuid pattern.
 *                    Currently only really can hold actors-typed entrys, but if "dropped" items ever become a thing will cover that as well
 *
 * scene|<sid>|<aid> -Encompasses all items owned by synthetic actor <aid> on scene <sid>.
 *                    Equivalent to "Scene.<scene_id>.Token.<token_id>.Item.<item_id>" uuid pattern.
 *
 * comp_core         - Encompasses all entries across all items located in the core compendiums (IE those fetched by get_pack)
 * comp|<comp_id>    - Encompasses all entries within the _NON_CORE_ compendium at comp_id. These are slightly harder to enumerate to, naturally
 * comp|<comp_id>|<actor_id>   - Encompasses all item entries owned by the specified actor_id located in the specific compendium comp_id
 *
 *
 * DEPRECATED
 *    > Format of registry names:
 *    > <item_source>|<actor_source>
 *    >
 *    > Where <item_source> is one of:
 *    > compendium                     // The general compendium registry
 *    > compendium_inv:{{actor_id}}    // The inventory of an actor in the compendium
 *    > world                          // The general world registry
 *    > world_inv:{{actor_id}}         // The inventory of an actor in the world
 *    > token_inv:{{actor_id}}         // The inventory of an unlinked token in the token layer
 *    >  -- token is not included because items cannot exist on the token layer
 *    >
 *    > And <actor_source> is one of
 *    > compendium               // The general compendium registry
 *    > world                    // The general world registry
 *    > token                    // The token layer
 *
 * DEPRECATED TRANSLATION?
 * compendium|<anything>              -> comp
 * compendium_inv:<actor_id>|<anything>  -> lookup actor <actor> -> comp|<that_actor_pack_id>|<that_actor_id>
 * world|<anything>                   -> game
 * world_inv:<actor_id>|<anything>    -> game|<actor>
 * token_inv:<token_id>|<anything>    -> lookup token <token_id> in all scenes -> scene|<that_token_scene_id>|<that_token_id>
 */
export declare class FoundryReg extends Registry {
    switch_reg_inv(for_inv_item: InventoriedRegEntry<EntryType>): Promise<Registry>;
    get_cat<T extends EntryType>(cat: T): FoundryRegCat<T>;
    name(): FoundryRegName;
    switch_reg(reg_id: string): Promise<this>;
    raw_config: FoundryRegName;
    parsed_config: FoundryRegNameParsed;
    protected make_wrapper<T extends EntryType>(config: FoundryRegNameParsed, for_type: T): DocumentCollectionWrapper<T>;
    protected make_revive_func<T extends EntryType>(for_type: T, clazz: EntryConstructor<T>): ReviveFunc<T>;
    protected make_cat<T extends EntryType>(config: FoundryRegNameParsed, for_type: T, clazz: EntryConstructor<T>, defaulter: () => RegEntryTypes<T>): void;
    static parse_reg_args(args: FoundryRegName): FoundryRegNameParsed;
    private static un_parse_reg_args;
    constructor(config?: FoundryRegNameParsed | FoundryRegName);
    get inventory_for_ref(): RegRef<EntryType> | null;
}
export declare class FoundryRegCat<T extends EntryType> extends RegCat<T> {
    private defaulter;
    _handler: DocumentCollectionWrapper<T>;
    constructor(parent: FoundryReg, cat: T, default_template: () => RegEntryTypes<T>, reviver: ReviveFunc<T>, handler: DocumentCollectionWrapper<T>);
    lookup_raw(criteria: {
        [key: string]: any;
    }): Promise<{
        id: string;
        val: RegEntryTypes<T>;
    }[]>;
    get_raw(id: string): Promise<RegEntryTypes<T> | null>;
    raw_map(): Promise<Map<string, RegEntryTypes<T>>>;
    private revive_and_flag;
    get_live(ctx: OpCtx, id: string, load_options?: LoadOptions): Promise<LiveEntryTypes<T> | null>;
    dangerous_wrap_doc(ctx: OpCtx, ent: T extends LancerActorType ? LancerActor : T extends LancerItemType ? LancerItem : never, wait_ready?: boolean): Promise<LiveEntryTypes<T> | null>;
    list_live(ctx: OpCtx, load_options?: LoadOptions): Promise<LiveEntryTypes<T>[]>;
    update_impl(...items: Array<LiveEntryTypes<T>>): Promise<void>;
    delete_id(id: string): Promise<void>;
    create_many_live(ctx: OpCtx, ...vals: RegEntryTypes<T>[]): Promise<LiveEntryTypes<T>[]>;
    create_many_raw(...vals: RegEntryTypes<T>[]): Promise<RegRef<T>[]>;
    create_default(ctx: OpCtx): Promise<LiveEntryTypes<T>>;
}
export {};
