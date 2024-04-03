import { EntryType, RegEntry, RegRef } from "machine-mind";
import type { LancerActor, LancerActorType } from "../actor/lancer-actor";
import type { LancerItem, LancerItemType } from "../item/lancer-item";
export declare const DEBOUNCE_TIMEOUT = 500;
declare type RegDocument<T extends EntryType> = foundry.abstract.Document<any, any> | RegEntry<T> | RegRef<T>;
export declare class LancerHooks {
    static call(doc: foundry.abstract.Document<any, any>): void;
    static on<E extends foundry.abstract.Document<any, any>>(doc: E, callback: (arg: E) => any): LancerSubscription;
    static on<T extends LancerActorType>(doc: RegDocument<T>, callback: (arg: LancerActor) => any): LancerSubscription;
    static on<T extends LancerItemType>(doc: RegDocument<T>, callback: (arg: LancerItem) => any): LancerSubscription;
    static off(sub: LancerSubscription): void;
    static off(doc: RegDocument<any>, callback: number): void;
    static off(doc: RegDocument<any>, callback: (arg: foundry.abstract.Document<any, any>) => any): void;
    static off<T extends LancerActorType>(doc: RegDocument<T>, callback: (arg: LancerActor) => any): void;
    static off<T extends LancerItemType>(doc: RegDocument<T>, callback: (arg: LancerItem) => any): void;
}
/**
 * A helper class for easily handling LancerHook subscriptions.
 * Store this when it is returned from LancerHook.on() and use unsubscribe() to remove the hook.
 */
export declare class LancerSubscription {
    private name;
    private id;
    constructor(name: string, id: number);
    unsubscribe(): void;
}
export {};
