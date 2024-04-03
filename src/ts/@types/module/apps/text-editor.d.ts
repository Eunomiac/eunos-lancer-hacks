/**
 * A helper Dialog subclass for editing html descriptions, which will automatically fixup html written to it (so the user doesn't just nuke themselves)
 * @extends {Dialog}
 */
export declare class HTMLEditDialog<O> extends FormApplication {
    target: O;
    text: string;
    text_path: string;
    commit_callback: (_: any) => void | Promise<void>;
    resolve: () => any;
    constructor(target: O, text_path: string, options: any, commit_func: (_: any) => void | Promise<void>, resolve_func: () => any);
    /** @override */
    static get defaultOptions(): FormApplication.Options;
    /** @override
     * Expose our data
     */
    getData(): any;
    /** @override */
    _updateObject(_event: unknown, formData: {
        text: string;
    }): Promise<void>;
    /** @override
     * Want to resolve promise before closing
     */
    close(options: FormApplication.CloseOptions): any;
    /**
     * A helper constructor function which displays the text edit dialog and returns a Promise once it's
     * workflow has been resolved.
     * @return {Promise}
     */
    static edit_text<T>(in_object: T, at_path: string, commit_callback: (v: T) => void | Promise<void>): Promise<void>;
}
