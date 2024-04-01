import type { LancerActorSheetData } from "../interfaces";
import type { AnyMMItem } from "../item/lancer-item";
import { AnyMMActor, LancerActor, LancerActorType } from "./lancer-actor";
import { EntryType, LiveEntryTypes, OpCtx } from "machine-mind";
import { CollapseHandler } from "../helpers/collapse";
/**
 * Extend the basic ActorSheet
 */
export declare class LancerActorSheet<T extends LancerActorType> extends ActorSheet<ActorSheet.Options, LancerActorSheetData<T>> {
    protected collapse_handler: CollapseHandler;
    static get defaultOptions(): ActorSheet.Options;
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
    activate_general_controls(html: JQuery): void;
    _activateMacroDragging(html: JQuery): void;
    _onDragEncodedMacroStart(e: DragEvent): void;
    _activateCollapses(html: JQuery): void;
    _activateActionGridListeners(html: JQuery): Promise<void>;
    _activateMacroListeners(html: JQuery): void;
    _onDragActivationChipStart(event: DragEvent): void;
    getStatPath(event: any): string | null;
    /**
     * Handles inventory button
     */
    _activateInventoryButton(html: any): void;
    /**
     * Activate event listeners for trigger macros using the prepared sheet HTML
     * @param html {JQuery}   The prepared HTML object ready to be rendered into the DOM
     */
    activateTriggerListeners(html: JQuery): void;
    can_root_drop_entry(_item: AnyMMItem | AnyMMActor): boolean;
    on_root_drop(_item: AnyMMItem | AnyMMActor, _event: JQuery.DropEvent, _dest: JQuery<HTMLElement>): Promise<void>;
    _onDrop(_evt: DragEvent): Promise<void>;
    quick_own<T extends EntryType>(entry: LiveEntryTypes<T>): Promise<[LiveEntryTypes<T>, boolean]>;
    _propagateMMData(formData: any): any;
    /**
     * Implement the _updateObject method as required by the parent class spec
     * This defines how to update the subject of the form when the form is submitted
     * @private
     */
    _updateObject(_event: Event, formData: any): Promise<LancerActor | undefined>;
    /**
     * Prepare data for rendering the Actor sheet
     * The prepared data object contains both the actor data as well as additional sheet options
     */
    getData(): Promise<LancerActorSheetData<T>>;
    protected _currData: LancerActorSheetData<T> | null;
    getDataLazy(): Promise<LancerActorSheetData<T>>;
    _commitCurrMM(): Promise<void>;
    getCtx(): OpCtx;
}
