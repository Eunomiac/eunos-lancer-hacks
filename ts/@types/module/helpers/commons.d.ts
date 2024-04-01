import type { HelperOptions } from "handlebars";
import { RegRef } from "machine-mind";
import type { ContextMenuItem, GenControlContext, LancerActorSheetData, LancerItemSheetData } from "../interfaces";
export declare function inc_if(val: string, test: any): string;
export declare function checked(truthytest: any): string;
export declare function selected(truthytest: any): string;
/** Performs a similar behavior to the foundry inplace mergeObject, but is more forgiving for arrays, is universally non-destructive, and doesn't create new fields (but will create new indices).
 * Expects flattened data. Does not go recursive
 */
export declare function gentle_merge(dest: any, flat_data: any): void;
/** Insert an array item specified by a dot pathspec, in place
 * Inserted BEFORE that element. If specified index is beyond the length of the array, will simply be appended.
 * If "delete" specified, deletes (splices) instead. Value is unused
 * Has no effect if target is not an array.
 */
export declare function array_path_edit(target: any, flat_path: string, value: any, mode: "insert" | "delete"): void;
export declare function arrayify_object(in_obj: any): unknown[];
/** Makes many icons in the same format with ease an icon */
export declare class IconFactory {
    private classes;
    private icon_prefix;
    constructor(args: {
        light?: boolean;
        dark?: boolean;
        size?: "xs" | "s" | "sm" | "m" | "l" | "xl";
        icon_set?: string;
    });
    r(icon: string): string;
}
export declare function effect_box(title: string, text: string, add_classes?: string): string;
export declare function sp_display(sp: number | string): string;
export declare function charged_box(charged: boolean, path: string): string;
export declare function safe_json_parse(str: string): any | null;
export declare function is_ref(v: any): v is RegRef<any>;
export declare function format_dotpath(path: string): string;
export declare function resolve_dotpath(object: any, path: string, default_?: any, opts?: {
    shorten_by?: number;
}): any;
export declare function resolve_helper_dotpath<T>(helper: HelperOptions, path: string): T;
export declare function resolve_helper_dotpath<T>(helper: HelperOptions, path: string, default_: T): T;
export declare function resolve_helper_dotpath<T>(helper: HelperOptions, path: string, default_: T, try_parent: boolean): T;
/**
 * Use this when invoking a helper from another helper, and you want to augment the hash args in some way
 * @argument defaults These properties will be inserted iff the hash doesn't already have that value.
 * @argument overrides These properties will be inserted regardless of pre-existing value
 */
export declare function ext_helper_hash(orig_helper: HelperOptions, overrides: HelperOptions["hash"], defaults?: HelperOptions["hash"]): HelperOptions;
/** Enables controls that can (as specified by action):
 * - "delete": delete() the item located at data-path
 * - "null": set as null the value at the specified path
 * - "splice": remove the array item at the specified path
 * - "set": set as `data-action-value` the item at the specified path.
 *    - if prefixed with (string), will use rest of val as plain string
 *    - if prefixed with (int), will parse as int
 *    - if prefixed with (float), will parse as float
 *    - if prefixed with (bool), will parse as boolean
 *    - if prefixed with (struct), will refer to the LANCER.control_structs above, generating whatever value matches the key
 * - "append": append the item to array at the specified path, using same semantics as data-action-value
 * - "insert": insert the item to array at the specified path, using same semantics as data-action-value. Resolves path in same way as "splice". Inserts before.
 * all using a similar api: a `path` to the item, and an `action` to perform on that item. In some cases, a `val` will be used
 *
 * If data-click is provided, it will be interpreted as follows
 * - "left" default behavior, normal left click
 *
 *
 * The data getter and commit func are used to retrieve the target data, and to save it back (respectively)
 *
 * The post_hook function is just run after all logic has been finished. It is provided the context object.
 * It has no influence on the behavior of the operation, but can nonetheless be useful for augmenting other behaviors.
 * (e.x. to delete associated entities when remove buttons cleared)
 */
export declare function HANDLER_activate_general_controls<T extends LancerActorSheetData<any> | LancerItemSheetData<any>>(html: JQuery, data_getter: () => Promise<T> | T, commit_func: (data: T) => void | Promise<void>, post_hook?: (ctrl_info: GenControlContext<T>) => any): void;
export declare function std_string_input(path: string, options: HelperOptions): string;
export declare function std_text_input(path: string, options: HelperOptions): string;
export declare function std_password_input(path: string, options: HelperOptions): string;
export declare function std_num_input(path: string, options: HelperOptions): string;
export declare function std_x_of_y(x_path: string, x: number, y: number, add_classes?: string): string;
/**
 * Our standardized checkbox
 * By default, just invoked with a path expression which is resolved into a value, which is used as the initial selection true/false
 * However, can supply the following
 * - `value`: Override the initial value with one resolved from elsewhere. Useful if get/set don't go to same place
 * - `label`: Label to use, if any
 * - `classes`: Additional classes to put on the checkbox itself.
 * - `label_classes`: Additional classes to put on the label, if it exists
 * - `default`: Change the default value if resolution fails. Otherwise, we just use the first one in the enum.
 */
export declare function std_checkbox(path: string, options: HelperOptions): string;
/**
 * Our standardized select, which allows picking of a choice from an enum of options
 * By default, just invoked with a path expression which is resolved into a value, which is used as the initial selection
 * However, can supply the following
 * - `value`: Override the initial value with one resolved from elsewhere. Useful if get/set don't go to same place
 * - `classes`: Additional classes to put on the select.
 * - `default`: Change the default value if resolution fails. Otherwise, we just use the first one in the enum.
 */
export declare function std_enum_select<T extends string>(path: string, enum_: {
    [key: string]: T;
}, options: HelperOptions): string;
export declare function popout_editor_button(path: string): string;
export declare function HANDLER_activate_popout_text_editor<T extends LancerActorSheetData<any> | LancerItemSheetData<any>>(html: JQuery, data_getter: () => Promise<T> | T, commit_func: (data: T) => void | Promise<void>): void;
export declare function safe_html_helper(orig: string): string;
export declare function large_textbox_card(title: string, text_path: string, helper: HelperOptions): string;
export declare function read_form(form_element: HTMLFormElement): Record<string, string | number | boolean>;
/** Clip paths kill native foundry context menus. Mix our own!
 * This just generates the hooked context menu html, with click listeners. Up to you to put it wherever you want
 * @argument parent: The element to which this menu will be attached. Identical to foundry behavior
 * @argument options: The options to show
 * @argument on_select_any: Called when any options is selected, after calling callback. Useful for closing menus etc
 */
export declare function create_context_menu(parent: JQuery<HTMLElement>, options: ContextMenuItem[], on_select_any?: () => void): Element;
/** Attach a tippy context menu to the given target(s)
 *  Options can be fixed or can be generated based on the specific target to which the context menu is being
 *  @param targets JQuery elements to attach the context menu to.
 * @param event_types JQuery event types to trigger showing the context menu.
 * @param options Array of context menu items.
 */
export declare function tippy_context_menu(targets: JQuery<HTMLElement>, event_types: string, options: ContextMenuItem[] | ((specific_target: JQuery<HTMLElement>) => ContextMenuItem[])): void;
