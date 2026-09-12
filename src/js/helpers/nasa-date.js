// NASA's APOD API treats "today" as the current date in US Eastern time
// (where NASA/GSFC operates), not the viewer's local date. A viewer whose
// local calendar day has already rolled over past Eastern time (e.g. Taiwan,
// UTC+8) would otherwise request a date NASA hasn't published yet and get a
// 400 "Date must be between..." error.
const NASA_TIMEZONE = "America/New_York";

const easternDateFormatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: NASA_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
});

// Returns the given moment's date in NASA's timezone, as "YYYY-MM-DD".
export function getNasaDateString(date = new Date()) {
    return easternDateFormatter.format(date);
}

// Returns the given moment's year in NASA's timezone.
export function getNasaYear(date = new Date()) {
    return Number(getNasaDateString(date).slice(0, 4));
}

// NASA's APOD archive begins Jun 16, 1995.
export const NASA_APOD_START_YEAR = 1995;
