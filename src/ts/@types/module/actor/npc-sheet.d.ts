import { LancerActorSheet } from "./lancer-actor-sheet";
import { EntryType, Npc, NpcFeature } from "machine-mind";
import { AnyMMItem } from "../item/lancer-item";
import type { AnyMMActor } from "./lancer-actor";
/**
 * Extend the basic ActorSheet
 */
export declare class LancerNPCSheet extends LancerActorSheet<EntryType.NPC> {
    /**
     * Extend and override the default options used by the NPC Sheet
     */
    static get defaultOptions(): ActorSheet.Options;
    /**
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: JQuery): void;
    _onDragMacroableStart(event: DragEvent): void;
    private _activateTooltips;
    activate_general_controls(html: JQuery): void;
    can_root_drop_entry(item: AnyMMItem | AnyMMActor): boolean;
    on_root_drop(base_drop: AnyMMItem | AnyMMActor, event: JQuery.DropEvent, _dest: JQuery<HTMLElement>): Promise<void>;
}
export declare function removeFeaturesFromNPC(npc: Npc, features: NpcFeature[]): Promise<void>;
