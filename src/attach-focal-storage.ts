import { FocalStorage } from './focal-storage';
import { IFocalStorage } from './ifocal-storage';

/**
 * Attaches an instance of FocalStorage to the global window object.
 * This makes FocalStorage globally accessible as `window.focalStorage`.
 */
export function attachFocalStorageToGlobal()
{
    if (typeof window !== 'undefined')
    {
        // Ensure not to overwrite an existing instance if already defined
        if (!window.focalStorage)
        {
            window.focalStorage = new FocalStorage();
        }
    } else
    {
        console.warn('Global window object is undefined. This function is intended for use in browser environments.');
    }
}

// Extend the Window interface to include focalStorage
declare global
{
    interface Window
    {
        focalStorage: IFocalStorage;
    }
}
