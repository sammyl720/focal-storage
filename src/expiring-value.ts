import { isValidDate } from "./utils/date";

const ExpirationKey = "expiresOn";

export interface IExpiringValue<T extends any>
{
    value: T;
    expiresOn: string;
}

export function isExpiringValue<T extends any>(obj: any): obj is IExpiringValue<T>
{
    return obj.hasOwnProperty('value') &&
        obj.hasOwnProperty(ExpirationKey) &&
        typeof obj[ExpirationKey] === "string" &&
        isValidDate(obj[ExpirationKey]);
}