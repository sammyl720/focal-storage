import { IExpiringValue, isExpiringValue } from "./expiring-value";
import { IFocalStorage } from "./ifocal-storage";
import { IStorage } from "./istorage";

/**
 * Enhances browser's localStorage to support expiring key-value pairs and automatic JSON serialization/deserialization.
 */
export class FocalStorage implements IFocalStorage
{
    constructor(private storage: IStorage = localStorage) { }

    getItem<T>(key: string): T | null
    {
        const value = this.storage.getItem(key);
        if (!value) return null;

        const parsed = this.getParsedItem<T>(value);
        if (parsed === null)
        {
            this.storage.removeItem(key);
        }

        return parsed;
    }

    setItem<T>(key: string, value: T, maxAge?: number): void
    {
        const stringified = this.toStringifiedItem(value, maxAge);

        if (stringified !== null)
        {
            this.storage.setItem(key, stringified);
        }

        this.clean();
    }

    removeItem(key: string): void
    {
        this.storage.removeItem(key);
        this.clean();
    }

    clear(): void
    {
        this.storage.clear();
    }

    key(index: number): string | null
    {
        return this.storage.key(index);
    }

    get length(): number
    {
        return this.storage.length;
    }

    /**
     * Removes expired items from the storage.
     */
    clean()
    {
        for (const key of this.keys())
        {
            this.removeIfExpired(key);
        }
    }

    private getParsedItem<T>(item: string): T | null
    {
        const parsed = this.parseJson(item);
        if (isExpiringValue<T>(parsed))
        {
            const { value, expiresOn } = parsed;

            if (this.isExpired(new Date(expiresOn)))
            {
                return null;
            }

            return value;
        }

        return parsed as T;
    }

    private keys(): string[]
    {
        const keys: string[] = [];
        for (let i = 0; i < this.storage.length; i++)
        {
            const key = this.storage.key(i);
            if (key !== null)
            {
                keys.push(key);
            }
        }
        return keys;
    }

    private isExpired(expireDate: Date): boolean
    {
        return Date.now() > expireDate.getTime();
    }

    private toStringifiedItem<T>(value: T, maxAge?: number): string | null
    {
        if (maxAge === undefined || maxAge <= 0)
        {
            return JSON.stringify(value);
        }

        const expiresOn = new Date();
        expiresOn.setTime(expiresOn.getTime() + maxAge);
        const expiringValue: IExpiringValue<T> = { value, expiresOn: expiresOn.toISOString() };
        return JSON.stringify(expiringValue);
    }

    private parseJson(text: string): any
    {
        try
        {
            return JSON.parse(text);
        } catch (error)
        {
            console.warn('Error parsing JSON from storage:', error);
            return null;
        }
    }

    /**
     * Checks if the item associated with the given key is expired and removes it if so.
     */
    private removeIfExpired(key: string): void
    {
        const item = this.storage.getItem(key);
        if (item)
        {
            const parsed = this.parseJson(item);
            if (isExpiringValue<any>(parsed) && this.isExpired(new Date(parsed.expiresOn)))
            {
                this.storage.removeItem(key);
            }
        }
    }
}
