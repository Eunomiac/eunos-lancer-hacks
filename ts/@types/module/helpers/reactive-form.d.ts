export default abstract class ReactiveForm<DataModel extends object, ViewModel extends DataModel> extends FormApplication<FormApplication.Options, DataModel, DataModel> {
    #private;
    object: DataModel;
    promise: Promise<DataModel>;
    static get defaultOptions(): import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").InsertKeys<{
        classes: string[];
        baseApplication: string | null;
        width: number | null;
        height: number | "auto" | null;
        top: number | null;
        left: number | null;
        scale?: number | null | undefined;
        popOut: boolean;
        minimizable: boolean;
        resizable: boolean;
        id: string;
        title: string;
        template: string | null;
        scrollY: string[];
        tabs: Omit<TabsConfiguration, "callback">[];
        dragDrop: Omit<DragDrop.Options, "permissions" | "callbacks">[];
        filters: Omit<SearchFilter.Options, "callback">[];
        closeOnSubmit: boolean;
        submitOnChange: boolean;
        submitOnClose: boolean;
        editable: boolean;
    }, import("@league-of-foundry-developers/foundry-vtt-types/src/foundry/common/utils/helpers.mjs").OmitByValue<{
        submitOnChange: boolean;
        submitOnClose: boolean;
        closeOnSubmit: boolean;
    }, never>>;
    constructor(data: DataModel, options: FormApplication.Options);
    abstract getViewModel(data: DataModel): ViewModel;
    getData(): ViewModel;
    activateListeners(html: JQuery): void;
    _onChangeInput(_e: JQuery.ChangeEvent<any, any, any, any>): Promise<DataModel>;
    _updateObject(ev: Event, formData: any): Promise<DataModel>;
    close(options?: {}): Promise<void>;
}
