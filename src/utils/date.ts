export function isValidDate(dateString: string)
{
    const timestamp = Date.parse(dateString);

    if (isNaN(timestamp) === false)
    {
        // The dateString is parsable and represents a valid date.
        return true;
    }
    // The dateString could not be parsed into a valid date.
    return false;
}

