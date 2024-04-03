// import { TokenDocument, Token } from "foundry.js";

/**
 * Extend the base TokenDocument class to implement system-specific HP bar logic.
 */
export class LancerTokenDocument extends TokenDocument {
  /**
   * Gets the bar attribute for a given bar name, with system-specific logic for editable derived attributes.
   * @param barName The name of the bar to get the attribute for.
   * @param options Optional. An object that may contain an `alternative` attribute name.
   * @returns The bar attribute object, potentially with modified `editable` status.
   */
  getBarAttribute(barName: string, options?: { alternative?: string }): { attribute: string; editable: boolean };
}

/**
 * Extend the base Token class to implement additional system-specific logic.
 */
export class LancerToken extends Token {
  constructor(document: LancerTokenDocument);

  /**
   * Returns a Set of Points corresponding to the grid space center points that the token occupies.
   * @returns An array of Points representing the occupied spaces.
   */
  getOccupiedSpaces(): Point[];
}

/**
 * Utility function to remove the 'derived.' prefix and any trailing '.value' from a key.
 * @param key The attribute key to process.
 * @returns The processed key with 'derived.' removed and optionally '.value' removed.
 */
export function un_derive_attr_key(key: string): string;

/**
 * Adjusts token attribute data by converting 'data.derived' keys to 'data' keys.
 * @param data The data object containing potentially derived attributes.
 */
export function fix_modify_token_attribute(data: any): void;


declare global {
  interface DocumentClassConfig {
    Token: typeof LancerTokenDocument;
  }

  interface PlaceableObjectClassConfig {
    Token: typeof LancerToken;
  }

  interface FlagConfig {
    Token: {
      [gameSystemId: string|undefined]: {
        mm_size?: number;
      };
      "hex-size-support"?: {
        borderSize?: number,
        altSnapping?: boolean,
        evenSnap?: boolean,
        alwaysShowBorder?: boolean,
        alternateOrientation?: boolean,
        pivotx?: number,
        pivoty?: number
      };
    };
  }
}