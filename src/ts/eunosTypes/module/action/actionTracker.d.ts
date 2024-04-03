/**
 * Module class for moderation of actor action data.
 */
import { ActionData, ActionType } from ".";
import { LancerActor } from "../actor/lancer-actor";
export declare const _defaultActionData: (target: Actor) => ActionData;
export declare const _endTurnActionData: () => ActionData;
/**
 * Get proxy for ease of migration when we change over to MM data backing.
 * @returns actions map.
 */
export declare function getActions(actor: LancerActor): ActionData | undefined;
/**
 * Set proxy for ease of migration when we change over to MM data backing.
 */
export declare function updateActions(actor: LancerActor, actions: ActionData): Promise<void>;
/**
 * Spends an action or triggers end turn effect (empty all actions).
 * @param actor actor to modify.
 * @param spend whether to refresh or spend an action.
 * @param type specific action to spend, or undefined for end-turn behavior.
 */
export declare function modAction(actor: LancerActor, spend: boolean, type?: ActionType): Promise<void>;
export declare function toggleAction(actor: LancerActor, type: ActionType): Promise<void>;
