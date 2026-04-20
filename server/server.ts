import express from 'express'
import cors from 'cors'
import type { Candidate } from '../shared/types.js'
import { isCandidate } from './utils/server_helpers.js'
import 'dotenv/config'
import { supabase } from './supabase.js'


const PORT = process.env.PORT ?? 3000

const app = express()
app.use(cors({
    origin: 'https://dasebb.github.io'
}))
app.use(express.json())


// Get current votes
app.get('/votes', async (req, res) => {
    const { data } = await supabase
        .from('votes')
        .select('*')

    const votes = Object.fromEntries(data!.map(row => [row.candidate, row.count]))
    res.json(votes)
})

// Vote endpoint
app.post('/vote', async (req, res) => {
    const { userId, vote } = req.body

    if (!isCandidate(vote)) {
        return res.status(400).json({ error: 'Ungültiger Vote' })
    }

    await supabase.rpc('cast_vote', {
        p_user_id: userId,
        p_candidate: vote
    })

    const { data } = await supabase.from('votes').select('*')
    const votes = Object.fromEntries(data!.map(row => [row.candidate, row.count]))
    res.json(votes)
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('Server is running goood')
})