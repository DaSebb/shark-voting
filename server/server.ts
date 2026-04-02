import express from 'express'
import cors from 'cors'
import type { Candidate } from '../shared/types.js'
import { isCandidate } from './utils/server_helpers.js'
import 'dotenv/config'


const PORT = process.env.PORT ?? 3000

const app = express()
app.use(cors({
    origin: 'https://dasebb.github.io'
}))
app.use(express.json())

// In-memory storage (resets when server restarts)
const votes: Record<Candidate, number> = {
    sharky: 0,
    alex: 0
}

const userVotes = new Map<string, Candidate>()

// Get current votes
app.get('/votes', (req, res) => {
    res.json(votes)
})

// Vote endpoint
app.post('/vote', (req, res) => {
    const { userId, vote } = req.body

    if (!isCandidate(vote)) {
        return res.status(400).json({ error: 'Ungültiger Vote' })
    }

    const previousVote = userVotes.get(userId)


    // Remove previous vote
    if (previousVote !== undefined) {
        votes[previousVote]--
    }

    // Add new vote
    votes[vote as Candidate]++
    userVotes.set(userId, vote as Candidate)

    res.json(votes)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Server is running goood')
})