import { useState } from 'react'
import './App.css'
import saImage from './assets/alex_sharky.jpeg'

function App() {
  const [count1, setCount1] = useState(0)
  const [count2, setCount2] = useState(0)

  return (
    <section className="center">
      <h1>
        Who is hotter in this Picture?
      </h1>
      <img src={saImage} alt="SharkyAlex" className="hero-img" />

      <div className='button-row'>
        <button className="counter" onClick={() => setCount1(count1 + 1)}>
          Votes for Sharky: {count1}
        </button>
        <button className="counter" onClick={() => setCount2(count2 + 1)}>
          Votes for Alex: {count2}
        </button>
      </div>
    </section>
  )
}

export default App