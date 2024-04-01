import { Damage, DamageType } from "machine-mind";
export declare class AppliedDamage {
    Kinetic: number;
    Energy: number;
    Explosive: number;
    Burn: number;
    Heat: number;
    Variable: number;
    constructor(damageData: Damage[]);
    sum_damage(damageData: Damage[], damageType: DamageType): number;
}
