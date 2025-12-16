export function normalizeName(cardName: string) {
    const normalizedCardName = cardName.split(/\s+/) // split on whitespace
        .filter(Boolean)  // remove empty strings
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()) // Proper-case
        .join(' ');

    return normalizedCardName;
}