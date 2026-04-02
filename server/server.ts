import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

// In-memory storage (resets when server restarts)
let votes = {
    sharky: 0,
    alex: 0
}

let userVotes =

    // Get current votes
    app.get('/votes', (req, res) => {
        res.json(votes)
    })

// Vote endpoint
app.post('/vote', (req, res) => {
    const { userId, vote } = req.body

    const previousVote = userVotes[userId]

    if (!Object.hasOwn(votes, vote)) {
        return res.status(400).json({ error: 'Ungültiger Vote' })
    }

    // Remove previous vote
    if (previousVote !== undefined) {
        votes[previousVote]--
    }

    // Add new vote
    votes[vote]++
    userVotes[userId] = vote

    res.json(votes)
})

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})

app.get('/', (req, res) => {
    res.send('Server is running goood')
})