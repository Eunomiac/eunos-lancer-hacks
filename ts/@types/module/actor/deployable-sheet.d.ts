import { LancerActorSheet } from "./lancer-actor-sheet";
import { EntryType } from "machine-mind";
import type { AnyMMActor } from "./lancer-actor";
import type { AnyMMItem } from "../item/lancer-item";
/**
 * Extend the basic ActorSheet
 */
export declare class LancerDeployableSheet extends LancerActorSheet<EntryType.DEPLOYABLE> {
    /**
     * Extend and override the default options used by the NPC Sheet
     */
    static get defaultOptions(): ActorSheet.Options;
    can_root_drop_entry(item: AnyMMActor | AnyMMItem): boolean;
    /**
     * @override
     * Activate event listeners using the prepared sheet HTML
     * @param html {HTMLElement}   The prepared HTML object ready to be rendered into the DOM
     */
    activateListeners(html: any): void;
}
