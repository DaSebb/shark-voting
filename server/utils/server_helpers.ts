import type { Candidate } from "../models/types.js";

export function isCandidate(value: unknown): value is Candidate {
    return value === 'sharky' || value === 'alex'
}