// Returns years from endYear down to startYear, inclusive, newest first.
export function getYearRange(startYear, endYear) {
    const years = [];
    for (let year = endYear; year >= startYear; year--) {
        years.push(year);
    }
    return years;
}
