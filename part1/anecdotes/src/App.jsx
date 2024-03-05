import { useState } from 'react'

const Heading = ({ text }) => <h1>{text}</h1>

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

// Component to display the anecdotes
const Anecdote = ({ text, vote }) => {
  return (
    <div>
      <p>"{text}"</p>
      <p>Has <strong>{vote}</strong> votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(
    new Array(anecdotes.length).fill(0)
  )

  // Function to change the selected anecdote randomly
  const changeAnecdote = () => {
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  // Function to vote for the selected anecdote
  const voteAnecdote = () => {
    const copy = [...voted]
    copy[selected] += 1
    setVoted(copy)
  }

  // Function to find the most voted anecdote and its votes
  const mostVoted = () => {
    let max = 0
    let index = 0
    for (let i = 0; i < voted.length; i++) {
      if (voted[i] > max) {
        max = voted[i]
        index = i
      }
    }
    return index
  }

  return (
    <div>
      <Heading text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} vote={voted[selected]} />
      <Button handleClick={voteAnecdote} text="Vote" />
      <Button handleClick={changeAnecdote} text="Next anecdote" />
      <Heading text="Anecdote with most votes" />
      <Anecdote text={anecdotes[mostVoted()]} vote={voted[mostVoted()]} />
    </div>
  )
}

export default App