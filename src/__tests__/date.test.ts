import "jest";
import { isValidDate } from "../utils/date";

test('isValidDate("2024-03-07T12:34:56.789Z") returns true', () =>
{
    const isValid = isValidDate("2024-03-07T12:34:56.789Z");
    expect(isValid).toBe(true);
});

test('isValidDate("2024-02-30T00:00:00.000Z") returns true', () =>
{
    const isValid = isValidDate("2024-02-30T00:00:00.000Z");
    expect(isValid).toBe(true);
});

test('isValidDate("not a date") returns false', () =>
{
    const isValid = isValidDate("not a date");
    expect(isValid).toBe(false);
});
