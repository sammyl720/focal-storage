import { IExpiringValue, isExpiringValue } from "./expiring-value";
import { IFocalStorage } from "./ifocal-storage";
import { IStorage } from "./IStorage";

export class FocalStorage implements IFocalStorage
{
    constructor(private storage: IStorage = localStorage)
    {
    }

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
        const stringfied = this.toStringifiedItem(value, maxAge);

        if (stringfied !== null)
        {
            this.storage.setItem(key, stringfied);
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

    key<T>(index: number): T | null
    {
        const value = this.storage.key(index);
        if (value === null) return null;
        return value as T;
    }

    get length()
    {
        return this.storage.length;
    }

    async clean()
    {
        while (await this.hasExpiredItems())
        {
            this.storage.removeItem(this.expiredKeys[0]!);
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

    private async hasExpiredItems()
    {
        return !!this.expiredKeys.length;
    }

    private keys()
    {
        const keys = [];
        for (let i = 0; i < this.storage.length; i++)
        {
            keys.push(this.storage.key(i));
        }

        return keys;
    }


    private isExpired(expireDate: Date)
    {
        return Date.now() > expireDate.getTime();
    }

    private toStringifiedItem<T>(value: T, maxAge?: number)
    {
        if (!maxAge)
        {
            return JSON.stringify(value);
        }

        if (maxAge > 0)
        {
            const expiresOn = new Date();
            expiresOn.setTime(expiresOn.getTime() + maxAge);
            const expiringValue: IExpiringValue<T> = {
                value,
                expiresOn: expiresOn.toISOString()
            };

            return JSON.stringify(expiringValue);
        }

        return null;
    }

    private parseJson(text: string)
    {
        try
        {
            const parsed = JSON.parse(text);
            return parsed;
        } catch (error)
        {
            console.warn(error);
            return text;
        }
    }

    private async removeIfExpired(key: string)
    {
        const isExpired = this.isExpiredKey(key);
        if (isExpired)
        {
            this.storage.removeItem(key);
        }

        return isExpired;
    }

    private isExpiredKey(key: string)
    {
        const item = this.storage.getItem(key);
        if (item === null) return false;

        const parsed = this.parseJson(item);
        return isExpiringValue<any>(parsed) && this.isExpired(new Date(parsed.expiresOn));
    }

    private get expiredKeys()
    {
        return this.keys().filter(key => !!key && this.isExpiredKey(key));
    }
}