import EunosLancerActor from "../overrides/eunos-lancer-actor";
import {EntryType, Mech, Deployable, Npc, OpCtx, LiveEntryTypes, Pilot, PackedPilotData, RegEntryTypes, Frame} from "machine-mind";

import * as TYPES_CONSTANTS from "../core/constants";
import * as TYPES_ACTOR from "./module/actor/lancer-actor";
import * as TYPES_ITEM from "./module/item/lancer-item";
import * as TYPES_ACTOR_SHEET from "./module/actor/lancer-actor-sheet";
import * as TYPES_TOKEN from "./module/token";

declare module "gsap/all";
import type gsap from "gsap/all";

import "./general-types";
import "./global";
import "./foundry-vtt-types";
import "./module";
/**
 * TypeScript entry file for Foundry VTT.
 * Registers custom settings, sheets, and constants using the Foundry API.
 *
 * Author: Eranziel
 * Content License: LANCER is copyright 2019, Massif Press Inc.
 * Software License: GNU GPLv3
 */
import "tippy.js/dist/tippy.css";
import "./module/helpers/text-enrichers";
export declare const system_ready: Promise<void>;

declare global {

  interface Game {
    actors: Collection<LancerActor>,
    scenes: Collection<Scene>,
    lancer: {
      applications: {
        [x: string]: typeof DocumentSheet;
      };
      entities: {
        [x: string]: typeof Document;
      }
    }
  }

  interface LenientGlobalVariableTypes {
    game: never,
    ui: never,
    canvas: never
  }

  function fromUuidSync(uuid: string, options?: {
    relative?: Document|LancerActor,
    invalid?: boolean,
    strict?: boolean
  }): LancerDoc | null;

  namespace Lancer {
    export interface Game {
      entities: {
        LancerActor: typeof LancerActor
      }
    }
  }

  interface User {
    id: IDString,
    flags: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ["eunos-lancer-hacks"]?: Record<string, any>
    }
  }
  interface CONFIG {
    debug: {
      logging: boolean,
      hooks: boolean
    },
    compatibility: {
      mode: number,
      includePatterns: string[],
      excludePatterns: string[]
    }
  }


  // GreenSock Accessor Object
  const gsap: gsap;
  type TweenTarget = JQuery<HTMLElement> | gsap.TweenTarget;


  // JQuery Simplified Events
  type ClickEvent = JQuery.Event & JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type ContextMenuEvent = JQuery.Event & JQuery.ContextMenuEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type DoubleClickEvent = JQuery.Event & JQuery.DoubleClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;

  type InputChangeEvent = JQuery.Event & JQuery.ChangeEvent<HTMLInputElement, undefined, HTMLInputElement, HTMLInputElement>;
  type SelectChangeEvent = JQuery.Event & JQuery.ChangeEvent<HTMLSelectElement, undefined, HTMLSelectElement, HTMLSelectElement>;
  type ChangeEvent = InputChangeEvent | SelectChangeEvent;

  type MouseEnterEvent = JQuery.Event & JQuery.MouseEnterEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type MouseLeaveEvent = JQuery.Event & JQuery.MouseLeaveEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type BlurEvent = JQuery.Event & JQuery.TypeEventHandler<HTMLElement, undefined, HTMLElement, HTMLElement, "blur">;
  type DropEvent = JQuery.Event & JQuery.DropEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type SubmitEvent = JQuery.Event & JQuery.SubmitEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;


  class LancerActor extends TYPES_ACTOR.LancerActor { }
  class LancerActorSheet<T extends TYPES_ACTOR.LancerActorType> extends TYPES_ACTOR_SHEET.LancerActorSheet<T> { }
  class LancerItem extends TYPES_ITEM.LancerItem { }
  class LancerToken extends TYPES_TOKEN.LancerToken { }
  class LancerTokenDocument extends TYPES_TOKEN.LancerTokenDocument { }

  type LancerActorType = TYPES_ACTOR.LancerActorType;
}