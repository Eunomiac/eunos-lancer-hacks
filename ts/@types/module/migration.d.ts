import { LancerTokenDocument } from "./token";
/**
 * Perform a system migration for the entire World, applying migrations for Actors, Items, and Compendium packs
 * @return {Promise}      A Promise which resolves once the migration is completed
 */
export declare const migrateWorld: () => Promise<void>;
/**
 * Perform minor migration tasks.
 * As of 1.4.3, this involves migrating world compendium packs to v10 format.
 */
export declare const minorMigration: () => Promise<void>;
/**
 * Function to migrate old pilots to pilot/mech paradigm.
 * Gathers LIDs of all old pilot items, clears items, then performs a
 * mock-CC import with all of the found LIDs.
 */
export declare const migratePilots: () => Promise<void>;
export declare const scorchedEarthCompendiums: () => Promise<void>;
/**
 * Apply migration rules to all Entities within a single Compendium pack
 * @param pack
 * @param {boolean} minor Perform minor version update, defaults to false
 * @return {Promise}
 */
export declare const migrateCompendium: (pack: any, minor?: boolean) => Promise<void>;
/**
 * Migrate a single Actor document to incorporate latest data model changes
 * Return an Object of updateData to be applied
 * @param {Actor} actor   The actor to update
 * @param {boolean} minor Perform minor version update, defaults to false
 * @return {Object}       The updateData to apply
 */
export declare const migrateActorData: (actor: Actor, minor?: boolean) => Promise<any>;
/**
 * Migrate a single Item document to incorporate latest data model changes
 * @param item
 */
export declare const migrateItemData: (item: any) => Promise<{}>;
/**
 * Migrate a single Scene document to incorporate changes to the data model of it's actor data overrides
 * Return an Object of updateData to be applied
 * @param {Object} scene  The Scene data to Update
 * @param {boolean} minor Apply minor version update, defaults to false
 * @return {Object}       The updateData to apply
 */
export declare const migrateSceneData: (scene: any, minor?: boolean) => Promise<void>;
export declare const migrateTokenData: (token: LancerTokenDocument) => Promise<void>;
