import type { LancerItem } from "../item/lancer-item";
import type { LancerActor } from "../actor/lancer-actor";
import { DamageType, RegRef } from "machine-mind";
import type { AccDiffData, AccDiffDataSerialized } from "../helpers/acc_diff";
declare type AttackRolls = {
    roll: string;
    targeted: {
        target: Token;
        roll: string;
        usedLockOn: {
            delete: () => void;
        } | null;
    }[];
};
export declare function attackRolls(bonus: number, accdiff: AccDiffData): AttackRolls;
declare type AttackMacroOptions = {
    accBonus: number;
    damBonus: {
        type: DamageType;
        val: number;
    };
};
export declare function prepareEncodedAttackMacro(actor_ref: RegRef<any>, item_id: string | null, options: AttackMacroOptions, rerollData: AccDiffDataSerialized): Promise<void>;
/**
 * Standalone prepare function for attacks, since they're complex.
 * @param actor   {Actor}       Actor to roll as. Assumes properly prepared item.
 * @param item    {LancerItem}  Weapon to attack with. Assumes ownership from actor.
 * @param options {Object}      Options that can be passed through. Current options:
 *            - accBonus        Flat bonus to accuracy
 *            - damBonus        Object of form {type: val} to apply flat damage bonus of given type.
 *                              The "Bonus" type is recommended but not required
 * @param rerollData {AccDiffData?} saved accdiff data for rerolls
 */
export declare function prepareAttackMacro({ actor, item, options, }: {
    actor: LancerActor;
    item: LancerItem;
    options?: {
        accBonus: number;
        damBonus: {
            type: DamageType;
            val: number;
        };
    };
}, rerollData?: AccDiffData): Promise<void>;
export declare function openBasicAttack(rerollData?: AccDiffData): Promise<void>;
declare type AttackResult = {
    roll: Roll;
    tt: string | HTMLElement | JQuery<HTMLElement>;
};
declare type HitResult = {
    token: {
        name: string;
        img: string;
    };
    total: string;
    hit: boolean;
    crit: boolean;
};
export declare function checkTargets(atkRolls: AttackRolls, isSmart: boolean): Promise<{
    attacks: AttackResult[];
    hits: HitResult[];
}>;
export {};
