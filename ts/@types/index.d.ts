import C from "../core/constants";
import {LancerActor} from "./module/actor/lancer-actor";
import {EunosLancerPilot} from "../overrides/eunos-lancer-actor";
import { EntryType, Mech, Deployable, Npc, OpCtx, LiveEntryTypes, Pilot, PackedPilotData, RegEntryTypes, Frame } from "machine-mind";


import type gsap from "gsap/all";

// import './system-types/lancer';
import './blades-general-types';
import './global';

declare module 'gsap/all';

/**
 * TypeScript entry file for Foundry VTT.
 * Registers custom settings, sheets, and constants using the Foundry API.
 *
 * Author: Eranziel
 * Content License: LANCER is copyright 2019, Massif Press Inc.
 * Software License: GNU GPLv3
 */
import "./lancer.scss";
import "tippy.js/dist/tippy.css";
import "./module/helpers/text-enrichers";
export declare const system_ready: Promise<void>;

declare global {

  namespace foundry {
    namespace data {
      namespace fields {
        class ObjectField extends foundry.data.fields.OBJECT_FIELD {
        }
      }
    }
  }

  declare class ObjectField extends foundry.data.fields.OBJECT_FIELD { }


  declare function fromUuidSync(uuid: string, options?: {
    relative?: Document|LancerActor,
    invalid?: boolean,
    strict?: boolean
  }): LancerDoc | null;

  declare namespace EunosHacks {

    export interface Game {
    }
  }

  declare namespace Lancer {
    export interface Game {
      entities: {
        LancerActor: typeof LancerActor
      }
    }
  }

  declare interface Game {
    // items: Collection<BladesItem>,
    // actors: Collection<BladesActor>,
    // user: User,
    // users: Collection<User>,
    // messages: Collection<BladesChat>,
    // scenes: BladesScenes,
    // model: {
    //   Actor: Record<BladesActorType, BladesActorSystem>,
    //   Item: Record<BladesItemType, BladesItemSystem>
    // },
    lancer: Lancer.Game
  }
  declare interface User {
    id: IDString,
    flags: {
      ["eunos-blades"]?: Record<string,any>
    }
  }
  declare interface CONFIG {
    debug: {
      logging: boolean,
      hooks: boolean
    }
  }
  interface LenientGlobalVariableTypes { game: never }

  // GreenSock Accessor Object
  declare const gsap: gsap;
  type BladesTweenTarget = JQuery<HTMLElement> | gsap.TweenTarget;

  // Global Debugger/Logger
  type eLogParams = [string, ...any[]];
  declare const eLog: Record<string, (...content: eLogParams) => void>

  // JQuery Simplified Events
  type ClickEvent = JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type ContextMenuEvent = JQuery.ContextMenuEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type TriggerEvent = JQuery.TriggeredEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type InputChangeEvent = JQuery.ChangeEvent<HTMLInputElement, undefined, HTMLInputElement, HTMLInputElement>;
  type BlurEvent = JQuery.TypeEventHandler<HTMLElement, undefined, HTMLElement, HTMLElement, "blur">;
  // type DropEvent = JQuery.TypeEventHandler<HTMLElement, undefined, HTMLElement, HTMLElement, "drop">;
  type DropEvent = JQuery.DropEvent<HTMLElement,undefined, HTMLElement, HTMLElement>;
  type OnSubmitEvent = Event & ClickEvent & {
    result: Promise<Record<string,string|number|boolean>>
  }
  type ChangeEvent = JQuery.ChangeEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type SelectChangeEvent = JQuery.ChangeEvent<HTMLSelectElement, undefined, HTMLSelectElement, HTMLSelectElement>;


}