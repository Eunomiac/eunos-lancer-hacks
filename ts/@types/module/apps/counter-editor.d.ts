import { Counter, RegEntry, Talent } from "machine-mind";
/**
 * A helper FormApplication subclass for editing a counter
 * @extends {FormApplication}
 */
export declare class CounterEditForm<O> extends FormApplication {
    _updateObject(event: Event, formData?: object): Promise<unknown>;
    counter: Counter;
    source: Talent;
    path: string;
    constructor(target: O, path: string, dialogData: Dialog.Data, options?: Partial<Dialog.Options>);
    /** @override */
    static get defaultOptions(): FormApplication.Options;
    /** @override
     * Expose our data
     */
    getData(): any;
    activateListeners(html: JQuery<HTMLElement>): void;
    /**
     * A helper constructor function which displays the bonus editor and returns a Promise once it's
     * workflow has been resolved.
     * @param in_object
     * @param at_path
     * @param writeback_obj
     * @returns
     */
    static edit_counter<T>(in_object: T, at_path: string, writeback_obj: RegEntry<any>): Promise<void>;
}
