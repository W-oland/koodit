import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeVote } from '../reducers/anecdoteReducer'
import { showNotification, hideNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick}) => {
    return (
        <div>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}


const Anecdotes = () => {
    const dispatch = useDispatch()
    //const anecdotes = useSelector(state => state.anecdotes)

    const anecdotes = useSelector(state => {
      if (state.filter === '') {
        return state.anecdotes
      }
      return state.anecdotes.filter((anecdote) => 
      anecdote.content.toLowerCase()
      .includes(state.filter.toLowerCase()))
      .sort((a,b) => b.votes - a.votes)
    })

    const clickEffect = ({anecdote}) => {
      //dispatch(changeVote(anecdote.id))
      dispatch(changeVote(anecdote))
      
      const message = `you liked ${anecdote.content}`
      dispatch(showNotification(message))
      setTimeout(() => {
          dispatch(hideNotification()) 
      }, 5000)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
                <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => clickEffect({anecdote})}
            />
        )}
        </div>
    )
}

export default Anecdotes