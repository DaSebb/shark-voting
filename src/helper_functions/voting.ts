import type { Candidate } from "../../shared/types.js"

export function getUserId() {
    let id = localStorage.getItem('userId')
    if (!id) {
        id = crypto.randomUUID()
        localStorage.setItem('userId', id)
    }
    return id
}

export async function getVotes() {
    const res = await fetch('http://localhost:3000/votes')
    const data = await res.json()
    return data
}

export async function vote(userId: string, vote: Candidate) {
    const response = await fetch('http://localhost:3000/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, vote })
    })

    return response.json()
}