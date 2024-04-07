/* eslint-disable @typescript-eslint/no-explicit-any */
import {gsap} from "gsap/all";
import {LancerActor, LancerActorType} from "./module/actor/lancer-actor";
import {LancerActorSheet} from "./module/actor/lancer-actor-sheet";
import {LancerItem, LancerItemType} from "./module/item/lancer-item";
import {LancerItemSheet} from "./module/item/item-sheet";

declare global {
  // #region MISCELLANEOUS TYPE ALIASES (nonfunctional; for clarity) ~

  // Represents an integer
  type int = number;

  // Represents a floating point number
  type float = number;

  // Represents a positive integer
  type posInt = number;

  // Represents a positive floating point number
  type posFloat = number;

  // Represents a key which can be a string, number, or symbol
  type key = string | number | symbol;

  // Represents a small integer from -10 to 10
  type SmallInt = -10 | -9 | -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

  // Represents a string-like value
  type StringLike = string | number | boolean | null | undefined;

  // Represents a number represented as a string
  type NumString = string;

  // Represents a value that may be undefined
  type Maybe<V> = V | undefined;

  // Represents a list of a certain type
  type List<V = unknown, K extends key = key> = Record<K, V>

  // Represents either an item or a list of items
  type ItemOrList<V = unknown, K extends key = key> = V | List<V, K>;

  // Represents an index of a certain type, where the keys do not matter
  type Index<V = unknown> = List<V, key> | V[];

  // Represents either an item or and index of items
  type ItemOrIndex<V = unknown> = V | Index<V>;

  // Represents an item or a Promise resolving to an item
  type ItemOrPromise<V = unknown> = V | Promise<V>;

  // Represents a string, false, or undefined
  type MaybeStringOrFalse = string | false | undefined;

  // Represents an object with number-strings as keys
  type StringArray<T> = Record<NumString, T>;

  // Represents "true" or "false" as a string
  type BoolString = string;

  // Represents falsy values and empty objects to be pruned when cleaning list of values
  type UncleanValues = false | null | undefined | "" | 0 | Record<string, never> | never[];

  // Represents a string conversion to title case
  type tCase<S extends string> = S extends `${infer A} ${infer B}`
    ? `${tCase<A>} ${tCase<B>}`
    : Capitalize<Lowercase<S>>;

  // Represents an allowed gender key
  type Gender = "M" | "F" | "U" | "X";

  // Represents an allowed direction
  type Direction = "top" | "bottom" | "left" | "right";

  // Represents an allowed string case
  type StringCase = "upper" | "lower" | "sentence" | "title";

  // Represents HTML code as a string
  type HTMLCode = string;

  // Represents a HEX color as a string
  type HEXColor = string;

  // Represents an RGB color as a string
  type RGBColor = string;

  // Represents a key of a certain type
  type KeyOf<T> = keyof T;

  // Represents a value of a certain type
  type ValOf<T> = T extends unknown[] | readonly unknown[] ? T[number] : T[keyof T];

  // Represents a function that takes a key and an optional value and returns unknown
  type keyFunc = (key: number | string, val?: any) => unknown;

  // Represents a function that takes a value and an optional key and returns any
  type valFunc = (val: any, key?: number | string) => any;

  // Represents a test function
  type testFunc<Type extends keyFunc | valFunc> = (...args: Parameters<Type>) => boolean;

  // Represents a map function
  type mapFunc<Type extends keyFunc | valFunc> = (...args: Parameters<Type>) => unknown;

  // Represents a check test
  type checkTest = ((...args: any[]) => any) | testFunc<keyFunc> | testFunc<valFunc> | RegExp | number | string;

  // #endregion


  // Represents a document id as a string
  type IDString = string & { __idStringBrand: never };

  // Represents a UUID string, of the form /^[A-Za-z]+\.[A-Za-z0-9]{16}$/
  type UUIDString = string & { __uuidStringBrand: never }; // This type is compatible with string, but requires explicit casting, enforcing the UUID pattern.

  // Represents a tuple of two elements
  type Tuple<T1, T2 = T1> = [T1, T2];

  // Represents a dotkey
  type DotKey = string & { __dotKeyBrand: never };

  // Represents a dotkey appropriate for an update() data object
  type TargetKey = string & DotKey & { __targetKeyBrand: never };

  // Represents a dotkey point to a a flag instead of the document schema
  type TargetFlagKey = string & DotKey & { __targetFlagKeyBrand: never };

  // Represents a jQuery text term
  type jQueryTextTerm = string | number | boolean | ((this: Element, index: number, text: string) => string | number | boolean);

  // Represents an object describing dimensions of an HTML element, of form {x: number, y: number, width: number, height: number}
  type ElemPosData = {x: number, y: number, width: number, height: number};

  // Represents an object with frozen properties
  type FreezeProps<T> = {
    [Prop in keyof T as string extends Prop ? never : number extends Prop ? never : Prop]: T[Prop]
  };

  // Represents a deep-partial of an object
  type FullPartial<T> = {
    [P in keyof T]?: T[P] extends object ? FullPartial<T[P]> : T[P];
  };

  // Represents a gsap animation
  type gsapAnim = gsap.core.Tween | gsap.core.Timeline;

  // Represents any

  // Represents a generic Lancer document
  type LancerDoc = LancerActor | LancerItem;

  // Represents any Lancer document sheet
  type LancerSheet = LancerActorSheet<LancerActorType> | LancerItemSheet<LancerItemType>;

  // Represents a reference to a Lancer document
  type DocRef = string | LancerDoc;

  // Represents a reference to a Lancer actor
  type ActorRef = string | LancerActor;

  // Represents a reference to a Lancer item
  type ItemRef = string | LancerItem;

  // Utility Types for Variable Template Values
  type ValueMax = {max: number, value: number};
  type NamedValueMax = ValueMax & {name: string};

  /**
   * Declaration merging to extend the existing `randomID` function from Foundry VTT types.
   * This interface merges with the global scope of the Foundry VTT types to override the return type of `randomID`.
   */
  namespace foundry.utils {
    /**
     * Generates a random ID string with a specified length.
     * @param length The desired length of the ID string. If not provided, a default length is used.
     * @returns A random ID string of type IDString, extending the basic string type.
     */
    function randomID(length?: number): IDString;
  }
}
