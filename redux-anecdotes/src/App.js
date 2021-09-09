import React, { useEffect } from 'react'
import NewAnecdote from './components/AnecdoteForm'
import Anecdotes from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'
//import anecdoteService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import axios from 'axios'

const App = () => {

  const dispatch = useDispatch()
  
  const hook = () => {
    dispatch(initializeAnecdotes())
  }
  useEffect(hook,[dispatch])

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