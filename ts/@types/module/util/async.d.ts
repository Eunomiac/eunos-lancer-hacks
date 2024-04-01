export declare const PENDING: unique symbol;
export declare class FetcherCache<K, V> {
    private readonly fetch_func;
    private readonly timeout;
    constructor(fetch_func: (arg: K) => Promise<V>, timeout?: number);
    private cached_values;
    private cached_resolved_values;
    private timeout_map;
    private stroke_timer;
    peek(arg: K): V | null;
    fetch(key: K): Promise<V>;
    sync_fetch(key: K): V | typeof PENDING;
    has_resolved(arg: K): boolean;
    private cleanup;
    flush(arg: K): void;
    flush_all(): void;
}
