import type { IContentPack, IContentPackManifest } from "machine-mind";
export declare const core_update = "3.0.46";
declare function addLCPManager(app: Application, html: any): void;
declare class LCPIndex {
    index: IContentPackManifest[];
    constructor(index: IContentPackManifest[] | null);
    addManifest(manifest: IContentPackManifest): void;
    updateManifest(manifest: IContentPackManifest): void;
}
declare class LCPManager extends Application {
    lcpFile: File | null;
    cp: IContentPack | null;
    manifest: any;
    coreVersion: string;
    coreUpdate: string | null;
    lcpIndex: LCPIndex;
    constructor(...args: any[]);
    static get defaultOptions(): import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").InsertKeys<{
        baseApplication: string | null;
        width: number;
        height: number;
        top: number | null;
        left: number | null;
        scale?: number | null | undefined;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean;
        id: string;
        classes: string[];
        title: string;
        template: string;
        scrollY: string[];
        tabs: Omit<TabsConfiguration, "callback">[];
        dragDrop: Omit<DragDrop.Options, "permissions" | "callbacks">[];
        filters: Omit<SearchFilter.Options, "callback">[];
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").OmitByValue<{
        template: string;
        title: string;
        width: number;
        height: number;
    }, never>>;
    getData(): {
        core_version: string;
        core_update: string | null;
        manifest: any;
        lcps: LCPIndex;
    };
    updateLcpIndex(manifest: IContentPackManifest): void;
    clearCompendiums(): Promise<void>;
    activateListeners(html: JQuery<HTMLElement>): void;
    _onCoreUpdateButtonClick(ev: MouseEvent): Promise<void>;
    _onClearAllButtonClick(ev: MouseEvent): void;
    _onLcpPicked(ev: Event): void;
    _onLcpParsed(fileData: string | null): Promise<void>;
    _onImportButtonClick(): Promise<void>;
}
export { LCPManager, addLCPManager, LCPIndex };
export declare function updateCore(version: string, manager?: LCPManager): Promise<void>;
