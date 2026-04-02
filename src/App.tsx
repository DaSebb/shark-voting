import { useEffect, useState } from 'react'
import './App.css'
import saImage from './assets/alex_sharky.jpeg'
import { getUserId, getVotes, vote } from './helper_functions/voting.js'


function App() {

  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  useEffect(() => {
    getVotes().then((data) => {
      setCount1(data.sharky)
      setCount2(data.alex)
    })
  }, [])

  async function handleVote(candidate: 'sharky' | 'alex') {
    const userId = getUserId()
    const data = await vote(userId, candidate)
    setCount1(data.sharky)
    setCount2(data.alex)
  }

  return (
    <section className="center">
      <h1>
        Who is hotter in this Picture?
      </h1>
      <img src={saImage} alt="SharkyAlex" className="hero-img" />

      <div className='button-row'>
        <button className="counter" onClick={() => handleVote('sharky')}>
          Votes for Sharky: {count1}
        </button>
        <button className="counter" onClick={() => handleVote('alex')}>
          Votes for Alex: {count2}
        </button>
      </div>
    </section>
  )
}

export default App