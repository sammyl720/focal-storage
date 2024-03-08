
export interface IStorage
{
    getItem(key: string): string | null;

    setItem(key: string, value: string): void;

    removeItem(key: string): void;

    clear(): void;

    key(index: number): string | null;

    get length(): number;
}
