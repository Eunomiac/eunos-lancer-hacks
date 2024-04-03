import type { LancerActor } from "../actor/lancer-actor";
/**
 *
 */
export declare function renderMacroTemplate(actor: LancerActor | undefined, template: string, templateData: any, flags?: any): Promise<void>;
export declare function renderMacroHTML(actor: LancerActor | undefined, html: HTMLElement | string, roll?: Roll, flags?: any): Promise<void>;
