import { OpCtx, RegRef } from "machine-mind";
import { EntryType } from "machine-mind";
import { AnyMMActor, LancerActor } from "../actor/lancer-actor";
import { AnyMMItem, LancerItem } from "../item/lancer-item";
import { FetcherCache } from "../util/async";
/**
 * Enables dropability on the specified jquery items/query.
 * The first argument is either an existing jquery object, or a string with which to $() make it
 *
 * The second argument is a callback provided with the data for the drag, the dest of the drag, as well as the dragover event.
 * It is called once, on a successful drop
 * Note that it is guaranteed to have passed the allow_drop function if one was provided
 * Not all of these arguments are usually necessary: remember you can just _ away unused vars
 *
 * The third argument is an optional callback provided with the dest of the drag, as well as the dragover event.
 * It determines if the dest is a valid drop target
 *
 * The fourth and final argument is an optional callback provided with all info as the drop handler, but also is informed if the mouse is entering or exiting
 * This can be used for fancier on-hover enter/exit visual behavior. It is only called if dropping is permitted on that item
 */
export declare type AnyDragoverEvent = JQuery.DragOverEvent | JQuery.DragEnterEvent | JQuery.DragLeaveEvent | JQuery.DropEvent;
export declare type DropHandlerFunc = (data: string, drag_dest: JQuery, drop_event: JQuery.DropEvent) => void;
export declare type AllowDropPredicateFunc = (data: string, drag_dest: JQuery, dragover_event: AnyDragoverEvent) => boolean;
export declare type HoverHandlerFunc = (mode: "enter" | "leave", data: string, drag_dest: JQuery, drag_event: JQuery.DragEnterEvent | JQuery.DragLeaveEvent) => void;
export declare function HANDLER_enable_dropping(items: string | JQuery, drop_handler: DropHandlerFunc, allow_drop?: AllowDropPredicateFunc, hover_handler?: HoverHandlerFunc): void;
/**
 * Enables draggability on the specified jquery items/query.
 * The first argument is either an existing jquery object, or a string with which to $() make it
 * The second argument is a callback that deduces the drag payload from the drag element. Also provides event, if that is eaasier
 * The third argument is an optional callback that facillitates toggling styling changes on the drag source
 */
declare type DragDeriveDataFunc = (drag_source: JQuery, event: JQuery.DragStartEvent) => string;
declare type DragStartEndFunc = (mode: "start" | "stop", drag_source: JQuery, event: JQuery.DragStartEvent | JQuery.DragEndEvent) => void;
export declare function HANDLER_enable_dragging(items: string | JQuery, data_transfer_func: DragDeriveDataFunc, start_stop_func?: DragStartEndFunc): void;
export declare type FoundryDropData = {
    type: "Actor" | "Item" | "JournalEntry" | "Macro";
    uuid: string;
};
export declare type ResolvedDropData = {
    type: "Item";
    document: LancerItem;
} | {
    type: "Actor";
    document: LancerActor;
} | {
    type: "JournalEntry";
    document: JournalEntry;
} | {
    type: "Macro";
    document: Macro;
};
export declare function resolve_native_drop(drop: string | FoundryDropData): Promise<ResolvedDropData | null>;
export declare function convert_ref_to_native_drop<T extends EntryType>(ref: RegRef<T>): FoundryDropData | null;
export declare type DragFetcherCache = FetcherCache<string | FoundryDropData, ResolvedDropData | null>;
export declare function dragResolverCache(): DragFetcherCache;
export declare type AllowMMDropPredicateFunc = (entry: AnyMMActor | AnyMMItem, drag_dest: JQuery, dragover_event: AnyDragoverEvent) => boolean;
export declare function HANDLER_enable_mm_dropping(html_items: string | JQuery, resolver: MMDragResolveCache, can_drop: null | AllowMMDropPredicateFunc, on_drop: (entry: AnyMMItem | AnyMMActor, dest: JQuery, evt: JQuery.DropEvent) => void, hover_handler?: HoverHandlerFunc): void;
export declare function HANDLER_enable_mm_dragging(items: string | JQuery, start_stop?: DragStartEndFunc): void;
export declare class MMDragResolveCache extends FetcherCache<string, AnyMMActor | AnyMMItem | null> {
    private readonly ctx;
    constructor(ctx: OpCtx);
}
export declare const GlobalMMDragState: {
    dragging: boolean;
    curr_dragged_type: typeof EntryType;
    curr_dragged_entity: LancerActor | LancerItem | null;
    curr_dragged_ref: RegRef<EntryType> | null;
};
export declare function applyGlobalDragListeners(): void;
export {};
