import { LancerActorSheet } from "./lancer-actor-sheet";
import { EntryType, Mech, Pilot } from "machine-mind";
import type { HelperOptions } from "handlebars";
import { AnyMMActor, LancerActor } from "./lancer-actor";
import type { AnyMMItem } from "../item/lancer-item";
/**
 * Extend the basic ActorSheet
 */
export declare class LancerPilotSheet extends LancerActorSheet<EntryType.PILOT> {
    /**
     * Extend and override the default options used by the Pilot Sheet
     * @returns {Object}
     */
    static get defaultOptions(): ActorSheet.Options;
    /**
     * Activate event listeners using the prepared sheet HTML
     * @param html {JQuery}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
    _onPilotJsonUpload(ev: JQuery.ChangeEvent<HTMLElement, undefined, HTMLElement, HTMLElement>, actor: LancerActor): void;
    _onPilotJsonParsed(fileData: string | null, actor: LancerActor): Promise<void>;
    activateMech(mech: Mech): Promise<void>;
    deactivateMech(): Promise<void>;
    getData(): Promise<import("../interfaces").LancerActorSheetData<EntryType.PILOT>>;
    can_root_drop_entry(item: AnyMMActor | AnyMMItem): boolean;
    on_root_drop(base_drop: AnyMMItem | AnyMMActor): Promise<void>;
    _commitCurrMM(): Promise<void>;
    /**
     * Implement the _updateObject method as required by the parent class spec
     * This defines how to update the subject of the form when the form is submitted
     * @private
     */
    _updateObject(event: Event, formData: any): Promise<LancerActor | undefined>;
}
export declare function pilot_counters(pilot: Pilot, _helper: HelperOptions): string;
export declare function all_mech_preview(_helper: HelperOptions): string;
export declare function active_mech_preview(mech: Mech, path: string, _helper: HelperOptions): string;
