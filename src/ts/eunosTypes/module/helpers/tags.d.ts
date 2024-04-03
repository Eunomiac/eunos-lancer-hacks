import { TagInstance } from "machine-mind";
import type { LancerActorSheetData, LancerItemSheetData } from "../interfaces";
import { MMDragResolveCache } from "./dragdrop";
export declare function compact_tag(tag_path: string, tag: TagInstance): string;
export declare function compact_tag_list(tag_array_path: string, tags: TagInstance[], allow_drop: boolean): string;
export declare function HANDLER_activate_tag_context_menus<T extends LancerActorSheetData<any> | LancerItemSheetData<any>>(html: JQuery, data_getter: () => Promise<T> | T, commit_func: (data: T) => void | Promise<void>): void;
export declare function HANDLER_activate_tag_dropping<T>(resolver: MMDragResolveCache, html: JQuery, data_getter: () => Promise<T> | T, commit_func: (data: T) => void | Promise<void>): void;
