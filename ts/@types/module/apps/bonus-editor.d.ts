import { Bonus } from "machine-mind";
/**
 * A helper Dialog subclass for editing a bonus
 * @extends {Dialog}
 */
export declare class BonusEditDialog<O> extends Dialog {
    bonus: Bonus;
    bonus_path: string;
    constructor(target: O, bonus_path: string, dialogData: Dialog.Data, options?: Partial<Dialog.Options>);
    /** @override */
    static get defaultOptions(): Dialog.Options;
    /** @override
     * Expose our data
     */
    getData(): any;
    /**
     * A helper constructor function which displays the bonus editor and returns a Promise once it's
     * workflow has been resolved.
     * @param {Actor5e} actor
     * @return {Promise}
     */
    static edit_bonus<T>(in_object: T, at_path: string, commit_callback: (v: T) => void | Promise<void>): Promise<void>;
}
