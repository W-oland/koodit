import React from 'react'
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

const App = () => {

  return (
    <div>
      <Filter />
      <Anecdotes />
      <Notification />
      <NewAnecdote />
    </div>
  )
}

export default App