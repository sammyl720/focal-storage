export interface IFocalStorage
{
    getItem<T>(key: string): T | null;

    setItem<T>(key: string, value: T, maxAge?: number): void;

    removeItem(key: string): void;

    clear(): void;

    key<T>(index: number): T | null;

    get length(): number;
}
