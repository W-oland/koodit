import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification, setNotification } from '../reducers/notificationReducer'
//import anecdoteService from '../services/anecdotes'

const NewAnecdote = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        
        dispatch(setNotification(`new anecdote ${content}`, 5))
        /*const message = `you added ${content}`
        dispatch(showNotification(message))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)*/
    }

    return (
    <div>
        <h2>create new</h2>
        <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type='submit'>create</button>
      </form>
    </div>
    )
}

export default NewAnecdote