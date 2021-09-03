import React from 'react'
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'

const App = () => {

  return (
    <div>
      <Anecdotes />
      <NewAnecdote />
    </div>
  )
}

export default App