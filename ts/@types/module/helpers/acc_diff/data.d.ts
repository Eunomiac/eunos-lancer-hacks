import type { TagInstance } from "machine-mind";
import * as t from "io-ts";
import type { LancerActor } from "../../actor/lancer-actor";
import type { AccDiffPlugin, AccDiffPluginData, AccDiffPluginCodec } from "./plugin";
import { LancerItem } from "../../item/lancer-item";
import { LancerToken } from "../../token";
export declare function findEffect(actor: LancerActor, effect: string): ActiveEffect | null;
export declare enum Cover {
    None = 0,
    Soft = 1,
    Hard = 2
}
export declare class AccDiffWeapon {
    #private;
    accurate: boolean;
    inaccurate: boolean;
    seeking: boolean;
    plugins: {
        [k: string]: AccDiffPluginData;
    };
    static pluginSchema: {
        [k: string]: AccDiffPluginCodec<any, any, any>;
    };
    static get schema(): {
        accurate: t.BooleanC;
        inaccurate: t.BooleanC;
        seeking: t.BooleanC;
        plugins: t.TypeC<{
            [k: string]: any;
        }>;
    };
    static get schemaCodec(): t.TypeC<{
        accurate: t.BooleanC;
        inaccurate: t.BooleanC;
        seeking: t.BooleanC;
        plugins: t.TypeC<{
            [k: string]: any;
        }>;
    }>;
    static get codec(): t.Type<AccDiffWeapon, {
        accurate: boolean;
        inaccurate: boolean;
        seeking: boolean;
        plugins: {
            [x: string]: any;
        };
    }, unknown>;
    constructor(obj: t.TypeOf<typeof AccDiffWeapon.schemaCodec>);
    get raw(): {
        accurate: boolean;
        inaccurate: boolean;
        seeking: boolean;
        plugins: {
            [k: string]: AccDiffPluginData;
        };
    };
    get impaired(): ActiveEffect | null;
    total(cover: number): number;
    hydrate(d: AccDiffData): void;
}
export declare class AccDiffBase {
    #private;
    accuracy: number;
    difficulty: number;
    cover: Cover;
    plugins: {
        [k: string]: AccDiffPluginData;
    };
    static pluginSchema: {
        [k: string]: AccDiffPluginCodec<any, any, any>;
    };
    static get schema(): {
        accuracy: t.NumberC;
        difficulty: t.NumberC;
        cover: t.UnionC<[t.LiteralC<0>, t.LiteralC<1>, t.LiteralC<2>]>;
        plugins: t.TypeC<{
            [k: string]: any;
        }>;
    };
    static get schemaCodec(): t.TypeC<{
        accuracy: t.NumberC;
        difficulty: t.NumberC;
        cover: t.UnionC<[t.LiteralC<0>, t.LiteralC<1>, t.LiteralC<2>]>;
        plugins: t.TypeC<{
            [k: string]: any;
        }>;
    }>;
    static get codec(): t.Type<AccDiffBase, {
        accuracy: number;
        difficulty: number;
        cover: 0 | 1 | 2;
        plugins: {
            [x: string]: any;
        };
    }, unknown>;
    constructor(obj: t.TypeOf<typeof AccDiffBase.schemaCodec>);
    get raw(): {
        accuracy: number;
        difficulty: number;
        cover: Cover;
        plugins: {
            [k: string]: AccDiffPluginData;
        };
    };
    hydrate(d: AccDiffData): void;
    get total(): number;
}
export declare class AccDiffTarget {
    #private;
    target: LancerToken;
    accuracy: number;
    difficulty: number;
    cover: Cover;
    consumeLockOn: boolean;
    plugins: {
        [k: string]: any;
    };
    static pluginSchema: {
        [k: string]: AccDiffPluginCodec<any, any, any>;
    };
    static get schema(): {
        target_id: t.StringC;
        accuracy: t.NumberC;
        difficulty: t.NumberC;
        cover: t.UnionC<[t.LiteralC<0>, t.LiteralC<1>, t.LiteralC<2>]>;
        consumeLockOn: t.BooleanC;
        plugins: t.TypeC<{
            [k: string]: any;
        }>;
    };
    static get schemaCodec(): t.TypeC<{
        target_id: t.StringC;
        accuracy: t.NumberC;
        difficulty: t.NumberC;
        cover: t.UnionC<[t.LiteralC<0>, t.LiteralC<1>, t.LiteralC<2>]>;
        consumeLockOn: t.BooleanC;
        plugins: t.TypeC<{
            [k: string]: any;
        }>;
    }>;
    static get codec(): t.Type<AccDiffTarget, {
        target_id: string;
        accuracy: number;
        difficulty: number;
        cover: 0 | 1 | 2;
        consumeLockOn: boolean;
        plugins: {
            [x: string]: any;
        };
    }, unknown>;
    constructor(obj: t.TypeOf<typeof AccDiffTarget.schemaCodec>);
    get raw(): {
        target_id: string;
        accuracy: number;
        difficulty: number;
        cover: Cover;
        consumeLockOn: boolean;
        plugins: {
            [k: string]: any;
        };
    };
    static fromParams(t: Token): AccDiffTarget;
    hydrate(d: AccDiffData): void;
    get usingLockOn(): null | ActiveEffect;
    get lockOnAvailable(): null | ActiveEffect;
    get total(): number;
}
export declare type AccDiffDataSerialized = t.OutputOf<typeof AccDiffData.schemaCodec>;
export declare class AccDiffData {
    title: string;
    weapon: AccDiffWeapon;
    base: AccDiffBase;
    targets: AccDiffTarget[];
    lancerItem?: LancerItem;
    lancerActor?: LancerActor;
    static get schema(): {
        title: t.StringC;
        weapon: t.Type<AccDiffWeapon, {
            accurate: boolean;
            inaccurate: boolean;
            seeking: boolean;
            plugins: {
                [x: string]: any;
            };
        }, unknown>;
        base: t.Type<AccDiffBase, {
            accuracy: number;
            difficulty: number;
            cover: 0 | 1 | 2;
            plugins: {
                [x: string]: any;
            };
        }, unknown>;
        targets: t.ArrayC<t.Type<AccDiffTarget, {
            target_id: string;
            accuracy: number;
            difficulty: number;
            cover: 0 | 1 | 2;
            consumeLockOn: boolean;
            plugins: {
                [x: string]: any;
            };
        }, unknown>>;
    };
    static get schemaCodec(): t.TypeC<{
        title: t.StringC;
        weapon: t.Type<AccDiffWeapon, {
            accurate: boolean;
            inaccurate: boolean;
            seeking: boolean;
            plugins: {
                [x: string]: any;
            };
        }, unknown>;
        base: t.Type<AccDiffBase, {
            accuracy: number;
            difficulty: number;
            cover: 0 | 1 | 2;
            plugins: {
                [x: string]: any;
            };
        }, unknown>;
        targets: t.ArrayC<t.Type<AccDiffTarget, {
            target_id: string;
            accuracy: number;
            difficulty: number;
            cover: 0 | 1 | 2;
            consumeLockOn: boolean;
            plugins: {
                [x: string]: any;
            };
        }, unknown>>;
    }>;
    static get codec(): t.Type<AccDiffData, {
        title: string;
        weapon: {
            accurate: boolean;
            inaccurate: boolean;
            seeking: boolean;
            plugins: {
                [x: string]: any;
            };
        };
        base: {
            accuracy: number;
            difficulty: number;
            cover: 0 | 1 | 2;
            plugins: {
                [x: string]: any;
            };
        };
        targets: {
            target_id: string;
            accuracy: number;
            difficulty: number;
            cover: 0 | 1 | 2;
            consumeLockOn: boolean;
            plugins: {
                [x: string]: any;
            };
        }[];
    }, unknown>;
    constructor(obj: t.TypeOf<typeof AccDiffData.schemaCodec>);
    hydrate(runtimeData?: LancerItem | LancerActor): void;
    replaceTargets(ts: Token[]): AccDiffData;
    get raw(): {
        title: string;
        weapon: AccDiffWeapon;
        base: AccDiffBase;
        targets: AccDiffTarget[];
    };
    static fromObject(obj: AccDiffDataSerialized, runtimeData?: LancerItem | LancerActor): AccDiffData;
    toObject(): t.OutputOf<typeof AccDiffData.codec>;
    static plugins: AccDiffPlugin<AccDiffPluginData>[];
    static targetedPlugins: AccDiffPlugin<AccDiffPluginData>[];
    static registerPlugin<D extends AccDiffPluginData, P extends AccDiffPlugin<D>>(plugin: P): void;
    static fromParams(runtimeData?: LancerItem | LancerActor, tags?: TagInstance[], title?: string, targets?: Token[], starting?: [number, number]): AccDiffData;
}
