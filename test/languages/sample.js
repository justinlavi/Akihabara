/** JavaScript fixture with modules, classes, private state, regex, and async flow. */
export const DEFAULT_LIMIT = 10;

export class Queue {
    #items = [];
    enqueue(value) { this.#items.push(value); }
    *[Symbol.iterator]() { yield* this.#items; }
}

export async function loadRecords(url, { limit = DEFAULT_LIMIT } = {}) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return data.filter((item) => /^active-/u.test(item.id)).slice(0, limit);
}

const queue = new Queue();
for (const item of ["alpha", "beta"]) queue.enqueue(item);
console.log([...queue]);
