declare global {
  namespace Hooks {
     /**
     * A hook event that fires when a PlaceableObject is initially drawn.
     * The dispatched event name replaces "Object" with the named PlaceableObject subclass,
     * i.e. "refreshToken".
     * @param object - The PlaceableObject
     * @typeParam P  - the type of the PlaceableObject
     * @remarks The name for this hook is dynamically created by joining 'refresh' and the type name of the PlaceableObject.
     * @remarks This is called by {@link Hooks.callAll}.
     */
      export type RefreshPlaceableObject<P extends PlaceableObject = PlaceableObject> = (object: P) => void;

     /**
     * A hook event that fires when a PlaceableObject is incrementally refreshed.
     * The dispatched event name replaces "Object" with the named PlaceableObject subclass,
     * i.e. "refreshToken".
     * @param object - The PlaceableObject
     * @typeParam P  - the type of the PlaceableObject
     * @remarks The name for this hook is dynamically created by joining 'draw' and the type name of the PlaceableObject.
     * @remarks This is called by {@link Hooks.callAll}.
     */
      export type DrawPlaceableObject<P extends PlaceableObject = PlaceableObject> = (object: P) => void;
  }
}