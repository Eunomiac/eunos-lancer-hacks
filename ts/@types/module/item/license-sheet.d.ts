import type { EntryType } from "machine-mind";
import { LancerItemSheet } from "./item-sheet";
import { LancerItemSheetData } from "../interfaces";
/**
 * Extend the generic Lancer item sheet
 * @extends {LancerItemSheet}
 */
export declare class LancerLicenseSheet extends LancerItemSheet<EntryType.LICENSE> {
    /**
     * @override
     * Extend and override the default options used by the generic Lancer item sheet
     */
    static get defaultOptions(): ItemSheet.Options;
    getData(): Promise<LancerItemSheetData<EntryType.LICENSE>>;
    /**
     * @override
     */
    _activate_context_listeners(html: JQuery, data_getter: () => Promise<LancerItemSheetData<EntryType.LICENSE>> | LancerItemSheetData<EntryType.LICENSE>, commit_func: (data: LancerItemSheetData<EntryType.LICENSE>) => void | Promise<void>): void;
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {JQuery}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
}
