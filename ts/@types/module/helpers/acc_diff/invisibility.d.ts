import { AccDiffCheckboxPluginData, AccDiffPluginCodec } from "./plugin";
import { AccDiffData, AccDiffTarget } from "./index";
export declare enum InvisibilityEnum {
    ForceVisibility = -1,
    NoForce = 0,
    ForceInvisibility = 1
}
export default class Invisibility implements AccDiffCheckboxPluginData {
    data: InvisibilityEnum;
    token?: Token;
    constructor(ser: InvisibilityEnum);
    get raw(): InvisibilityEnum;
    static get codec(): AccDiffPluginCodec<Invisibility, InvisibilityEnum, unknown>;
    hydrate(_d: AccDiffData, t?: AccDiffTarget): void;
    static perUnknownTarget(): Invisibility;
    static perTarget(item: Token): Invisibility;
    private get tokenInvisible();
    uiElement: "checkbox";
    slug: string;
    static slug: string;
    humanLabel: string;
    get uiState(): boolean;
    set uiState(newState: boolean);
    readonly visible = true;
    readonly disabled = false;
    modifyRoll(roll: string): string;
    readonly rollPrecedence = -9999;
}
