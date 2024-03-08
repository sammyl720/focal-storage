import { IStorage } from "../istorage";
import { FocalStorage } from "../focal-storage";
import { IFocalStorage } from "../ifocal-storage";

describe("FocalStorage", () =>
{
    let focalStorage: IFocalStorage;

    beforeEach(() =>
    {
        focalStorage = new FocalStorage(new StorageMock());
    });

    it("Can save and retrieve item", () =>
    {
        focalStorage.setItem("test", "value");
        const value = focalStorage.getItem<string>("test");
        expect(value).toBe("value");
    });

    it("Does not retrieve expired item", async () =>
    {
        focalStorage.setItem("test", "value", 10);
        const value = await runCbWithDelay(() =>
        {
            const value = focalStorage.getItem<string>("test");
            return value;
        }, 15);

        expect(value).toBe(null);
    });

    it("Does retrieve non expired item", async () =>
    {
        focalStorage.setItem("test", "value", 15);
        const value = await runCbWithDelay(() =>
        {
            const value = focalStorage.getItem<string>("test");
            return value;
        }, 10);

        expect(value).toBe("value");
    });

    it("Does get correct key", () =>
    {
        focalStorage.setItem("key1", "val1");
        focalStorage.setItem("key2", "val2");
        focalStorage.setItem("key3", "val3");
        focalStorage.removeItem("key2");
        expect(focalStorage.key(1)).toBe("key3");
    });

    it("Does get correct length", () =>
    {
        focalStorage.setItem("key1", "val1");
        focalStorage.setItem("key2", "val2");
        focalStorage.setItem("key3", "val3");
        focalStorage.removeItem("key2");
        expect(focalStorage.length).toBe(2);
    });

    it("Does clear items", () =>
    {
        focalStorage.setItem("key1", "val1");
        focalStorage.setItem("key2", "val2");
        focalStorage.clear();
        expect(focalStorage.length).toBe(0);
    });

    it("Does clear expired items when writing", async () =>
    {
        focalStorage.setItem("key1", "val1", 10);
        focalStorage.setItem("key2", "val2", 10);
        focalStorage.setItem("key3", "val3", 150);

        await runCbWithDelay(async () =>
        {
            await (focalStorage as FocalStorage).clean();
        }, 100);

        expect(focalStorage.length).toBe(1);
        expect(focalStorage.getItem("key3")).toBe("val3");
    });
});

function runCbWithDelay<T>(cb: () => T, delay: number): Promise<T>
{
    return new Promise((resolve, reject) =>
    {
        setTimeout(() =>
        {
            resolve(cb());
        }, delay);
    });
}

class StorageMock implements IStorage 
{
    private store: { [key: string]: string; } = {};
    private order: string[] = [];

    getItem(key: string): string | null
    {
        return this.store[key] ?? null;
    }

    setItem(key: string, value: string): void
    {
        this.store[key] = value;
        this.order.push(key);
    }

    removeItem(key: string): void
    {
        if (this.store.hasOwnProperty(key))
        {
            delete this.store[key];
            this.order = this.order.filter(k => k !== key);
        }
    }

    clear(): void
    {
        this.store = {};
        this.order = [];
    }

    key(index: number): string | null
    {
        if (index >= this.order.length || index < 0)
        {
            return null;
        }

        return this.order[index];
    }

    get length(): number
    {
        return this.order.length;
    }

}