import type { Candidate } from "../../shared/types.js";

export function isCandidate(value: unknown): value is Candidate {
    return value === 'sharky' || value === 'alex'
}