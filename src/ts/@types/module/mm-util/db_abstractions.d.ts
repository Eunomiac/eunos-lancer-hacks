import { EntryType, LiveEntryTypes, RegEntryTypes } from "machine-mind";
import { LancerActor, LancerActorType } from "../actor/lancer-actor";
import type { LancerItem, LancerItemType } from "../item/lancer-item";
import type { FoundryRegNameParsed } from "./foundry-reg";
export declare type EntFor<T extends EntryType> = T extends LancerItemType ? LancerItem : T extends LancerActorType ? LancerActor : never;
export interface GetResult<T extends LancerItemType | LancerActorType> {
    data: RegEntryTypes<T>;
    document: EntFor<T>;
    id: string;
    type: T;
}
/**
 * A FoundryRegNameParsed resolved into specific collections
 */
export declare type ResolvedRegArgs = {
    item_collection?: null | (() => Promise<any>);
    actor_collection?: null | any;
    token_collection?: null | any;
};
export declare abstract class DocumentCollectionWrapper<T extends EntryType> {
    abstract create_many(items: RegEntryTypes<T>[]): Promise<GetResult<T>[]>;
    abstract update(items: Array<LiveEntryTypes<T>>): Promise<any>;
    abstract get(id: string): Promise<GetResult<T> | null>;
    abstract destroy(id: string): Promise<any>;
    abstract query(query_ob: {
        [key: string]: any;
    }): Promise<GetResult<T>[]>;
    abstract enumerate(): Promise<GetResult<T>[]>;
}
export declare class NuWrapper<T extends EntryType> extends DocumentCollectionWrapper<T> {
    entry_type: T;
    cfg: FoundryRegNameParsed;
    scene: any | null;
    pack: string | null;
    private static lookup_collection_and_parent;
    private _cached_collection_and_parent;
    private collection_and_parent;
    private collection;
    private parent;
    constructor(type: T, cfg: FoundryRegNameParsed);
    private opts;
    create_many(reg_data: RegEntryTypes<T>[]): Promise<GetResult<T>[]>;
    update(items: Array<LiveEntryTypes<T>>): Promise<void>;
    destroy(id: string): Promise<RegEntryTypes<T> | null>;
    get(id: string): Promise<GetResult<T> | null>;
    query(query_obj: {
        [key: string]: any;
    }): Promise<GetResult<T>[]>;
    enumerate(): Promise<GetResult<T>[]>;
}
/********* COMPENDIUM CACHING **********/
