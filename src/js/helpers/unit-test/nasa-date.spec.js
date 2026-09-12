import { describe, expect, it } from "vitest";
import { getNasaDateString, getNasaYear } from "../nasa-date.js";

describe("getNasaDateString", () => {
    it("returns the previous Eastern-time day when the viewer is already ahead (e.g. Taiwan, UTC+8)", () => {
        const taiwanJustAfterMidnight = new Date("2026-09-13T01:00:00+08:00");
        expect(getNasaDateString(taiwanJustAfterMidnight)).toBe("2026-09-12");
    });

    it("returns the current Eastern-time day once it has actually started", () => {
        const noonUtc = new Date("2026-09-13T12:00:00Z");
        expect(getNasaDateString(noonUtc)).toBe("2026-09-13");
    });

    it("stays on the same Eastern-time day right before midnight Eastern", () => {
        const justBeforeMidnightEastern = new Date("2026-09-13T03:59:00Z");
        expect(getNasaDateString(justBeforeMidnightEastern)).toBe("2026-09-12");
    });

    it("rolls over right after midnight Eastern", () => {
        const justAfterMidnightEastern = new Date("2026-09-13T04:00:00Z");
        expect(getNasaDateString(justAfterMidnightEastern)).toBe("2026-09-13");
    });
});

describe("getNasaYear", () => {
    it("stays on the previous Eastern year just after local New Year in Taiwan", () => {
        const taiwanNewYear = new Date("2027-01-01T05:00:00+08:00");
        expect(getNasaYear(taiwanNewYear)).toBe(2026);
    });

    it("returns the current Eastern year for a plain mid-year date", () => {
        const midyear = new Date("2026-06-15T12:00:00Z");
        expect(getNasaYear(midyear)).toBe(2026);
    });
});
