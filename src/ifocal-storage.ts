/**
 * Defines the interface for a storage system (`IFocalStorage`) that enhances the functionality of the browser's localStorage.
 * This interface provides methods for storing, retrieving, and managing data with optional expiration and automatic 
 * serialization/deserialization of objects to/from JSON.
 */
export interface IFocalStorage
{
    /**
     * Retrieves an item from storage by its key and returns it as its original data type. 
     * If the item has expired or does not exist, `null` is returned.
     * 
     * @param key The unique identifier for the item in storage.
     * @return The item retrieved from storage, parsed from a JSON string to its original type, or `null` if the item
     * does not exist or has expired.
     */
    getItem<T>(key: string): T | null;

    /**
     * Stores an item in storage under the specified key, with optional expiration. 
     * The item is serialized to a JSON string before being stored.
     * 
     * @param key The unique identifier for the item to store.
     * @param value The item to be stored, which will be serialized to JSON.
     * @param maxAge Optional. The lifespan of the item in milliseconds from the time of storage. After this period, 
     * the item is considered expired and will not be retrievable.
     */
    setItem<T>(key: string, value: T, maxAge?: number): void;

    /**
     * Removes an item from storage by its key.
     * 
     * @param key The unique identifier for the item to be removed.
     */
    removeItem(key: string): void;

    /**
     * Clears all items from storage, disregarding any expiration times.
     */
    clear(): void;

    /**
     * Retrieves the key of an item stored at a specific index in storage.
     * 
     * @param index The index of the item in storage, with 0 being the first item.
     * @return The key of the item stored at the specified index, or `null` if no item exists at that index.
     */
    key(index: number): string | null;

    /**
     * A property that returns the number of items currently stored, including those with and without expiration.
     */
    get length(): number;
}
