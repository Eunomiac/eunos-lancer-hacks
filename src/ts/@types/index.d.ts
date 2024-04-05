import EunosLancerPilot from "../overrides/eunos-lancer-actor";
import {EntryType, Mech, Deployable, Npc, OpCtx, LiveEntryTypes, Pilot, PackedPilotData, RegEntryTypes, Frame} from "machine-mind";

import * as TYPES_CONSTANTS from "../core/constants";
import * as TYPES_ACTOR from "./module/actor/lancer-actor";
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
    scenes: Collection<Scene>
  }

  function fromUuidSync(uuid: string, options?: {
    relative?: Document|LancerActor,
    invalid?: boolean,
    strict?: boolean
  }): LancerDoc | null;

  namespace EunosHacks {

    export interface Game {
    }
  }

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

  interface LenientGlobalVariableTypes { game: never }

  // GreenSock Accessor Object
  const gsap: gsap;
  type TweenTarget = JQuery<HTMLElement> | gsap.TweenTarget;


  // JQuery Simplified Events
  type ClickEvent = JQuery.ClickEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type ContextMenuEvent = JQuery.ContextMenuEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type TriggerEvent = JQuery.TriggeredEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type InputChangeEvent = JQuery.ChangeEvent<HTMLInputElement, undefined, HTMLInputElement, HTMLInputElement>;
  type BlurEvent = JQuery.TypeEventHandler<HTMLElement, undefined, HTMLElement, HTMLElement, "blur">;
  // type DropEvent = JQuery.TypeEventHandler<HTMLElement, undefined, HTMLElement, HTMLElement, "drop">;
  type DropEvent = JQuery.DropEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type OnSubmitEvent = Event & ClickEvent & {
    result: Promise<Record<string, string|number|boolean>>
  }
  type ChangeEvent = JQuery.ChangeEvent<HTMLElement, undefined, HTMLElement, HTMLElement>;
  type SelectChangeEvent = JQuery.ChangeEvent<HTMLSelectElement, undefined, HTMLSelectElement, HTMLSelectElement>;


  class LancerActor extends TYPES_ACTOR.LancerActor { }
  class LancerActorSheet<T extends TYPES_ACTOR.LancerActorType> extends TYPES_ACTOR_SHEET.LancerActorSheet<T> { }
  class LancerToken extends TYPES_TOKEN.LancerToken { }
  class LancerTokenDocument extends TYPES_TOKEN.LancerTokenDocument { }

  type LancerActorType = TYPES_ACTOR.LancerActorType;
}