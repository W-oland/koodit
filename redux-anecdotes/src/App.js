import React from 'react'
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'

const App = () => {

  return (
    <div>
      <Anecdotes />
      <Notification />
      <NewAnecdote />
    </div>
  )
}

export default App