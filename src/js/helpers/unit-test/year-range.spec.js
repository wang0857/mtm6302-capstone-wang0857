import { describe, expect, it } from "vitest";
import { getYearRange } from "../year-range.js";

describe("getYearRange", () => {
    it("lists years from endYear down to startYear, newest first", () => {
        expect(getYearRange(1995, 1998)).toEqual([1998, 1997, 1996, 1995]);
    });

    it("returns a single-year array when start and end are the same", () => {
        expect(getYearRange(2026, 2026)).toEqual([2026]);
    });
});
