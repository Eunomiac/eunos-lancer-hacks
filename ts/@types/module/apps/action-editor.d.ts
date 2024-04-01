import type { Action, RegEntry } from "machine-mind";
/**
 * A helper Dialog subclass for editing a bonus
 * @extends {Dialog}
 */
export declare class ActionEditDialog<O> extends Dialog {
    action: Action;
    action_path: string;
    origin_item: RegEntry<any>;
    constructor(target: O, action_path: string, dialogData: Dialog.Data, options?: Partial<Dialog.Options>);
    /** @override */
    static get defaultOptions(): import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").InsertKeys<{
        width: number | undefined;
        classes: any[] | undefined;
        template: string | undefined;
        jQuery: boolean | undefined;
        baseApplication: string | null | undefined;
        height: number | "auto" | null | undefined;
        top: number | null | undefined;
        left: number | null | undefined;
        scale?: number | null | undefined;
        popOut: boolean | undefined;
        minimizable: boolean | undefined;
        resizable: boolean | undefined;
        id: string | undefined;
        title: string | undefined;
        scrollY: any[] | undefined;
        tabs: any[] | undefined;
        dragDrop: any[] | undefined;
        filters: any[] | undefined;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").OmitByValue<{
        width?: number | undefined;
        classes?: any[] | undefined;
        template?: string | undefined;
        jQuery?: boolean | undefined;
        baseApplication?: string | null | undefined;
        height?: number | "auto" | null | undefined;
        top?: number | null | undefined;
        left?: number | null | undefined;
        scale?: number | null | undefined;
        popOut?: boolean | undefined;
        minimizable?: boolean | undefined;
        resizable?: boolean | undefined;
        id?: string | undefined;
        title?: string | undefined;
        scrollY?: any[] | undefined;
        tabs?: any[] | undefined;
        dragDrop?: any[] | undefined;
        filters?: any[] | undefined;
    }, never>>;
    /** @override
     * Expose our data
     */
    getData(): any;
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery<HTMLElement>): void;
    _commitCurrMM(): Promise<void>;
    /**
     * Handle a left-mouse click on one of the dialog choice buttons
     * @param {MouseEvent} event    The left-mouse click event
     * @private
     */
    _onClickButton(event: MouseEvent): void;
    /**
     * Submit the Dialog by selecting one of its buttons
     * @private
     */
    submit(id: string): Promise<void>;
    /**
     * A helper constructor function which displays the action editor and returns a Promise once it's
     * workflow has been resolved.
     * @param in_object         Object we're within
     * @param at_path           Path object is located at
     * @param commit_callback   Callback func on commit
     * @returns                 Promise for completion
     */
    static edit_action<T>(in_object: T, at_path: string, _commit_callback: (v: T) => void | Promise<void>): Promise<void>;
}
export declare function activate_action_editor<T>(html: JQuery, data_getter: () => Promise<T> | T, commit_func: (data: T) => void | Promise<void>): void;
