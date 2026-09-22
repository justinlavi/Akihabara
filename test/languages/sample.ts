/** Dense TypeScript fixture: declarations, generics, unions, async, and narrowing. */
export type Identifier = string & { readonly __brand: unique symbol };
export interface Repository<T extends { id: Identifier }> {
    readonly size: number;
    find(id: Identifier): Promise<T | null>;
}

export enum Status { Draft = "draft", Published = "published" }

export class MemoryRepository<T extends { id: Identifier }> implements Repository<T> {
    static readonly kind = "memory";
    #items = new Map<Identifier, T>();
    get size(): number { return this.#items.size; }
    async find(id: Identifier): Promise<T | null> { return this.#items.get(id) ?? null; }
    save(item: T): void { this.#items.set(item.id, item); }
}

export const summarize = <T,>(values: readonly T[], render: (value: T) => string): string =>
    values.map(render).join(", ");

for (const value of [1, 2, 3] as const) {
    if (value > 1) console.log(`value=${value}`);
}
