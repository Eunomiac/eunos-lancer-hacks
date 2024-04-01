import type { LancerItem } from "../item/lancer-item";
import type { LancerActor } from "../actor/lancer-actor";
/**
 * Get an actor to use for a macro. If an id is passed and the return is
 * `undefined` a warning notification will be displayed.
 * @param a_id - The Actor to search for. If an id, try to search for the
 *               appropriate actor to use, if an Actor document, use that doc.
 */
export declare function getMacroSpeaker(a_id?: string | LancerActor): LancerActor | undefined;
export declare function ownedItemFromString(i: string, actor: LancerActor): LancerItem | null;
