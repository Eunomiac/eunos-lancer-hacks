export declare const COLLAPSE_KEY = "collapse_state";
/** To make collapsible work on a sheet, that sheet must export as part of its getData() function an instance of this object,
 * under the key [COLLAPSE_KEY]
 */
export declare class CollapseHandler {
    private state;
    toggle(id: string): boolean;
    get(id: string): boolean;
}
/** Enables clicking any `collapse-ctrl` will collapse any `collapse-item` if they have the same `collapse-id`.
 * Collapse id only needs to be unique within descendants of the provided JQuery, so no need to get too fancy with those mechanisms
 */
export declare function HANDLER_activate_collapsibles(html: JQuery, handler: CollapseHandler): void;
/**
 * Generalized collapse activator
 */
export declare function applyCollapseListeners(): void;
export declare function uuid4(): string;
