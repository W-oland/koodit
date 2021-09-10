import React from 'react'
import { connect } from 'react-redux'
import { changeVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

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


const Anecdotes = (props) => {

    const clickEffect = ({anecdote}) => {
      props.changeVote(anecdote)
      props.setNotification(`You voted for ${anecdote.content}`, 5)
    }

    return (
        <div>
            <h2>Anecdotes</h2>
            {props.anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
                <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => clickEffect({anecdote})}
            />
            )}
            
             
        </div>
    )
}

const mapDispatchToProps = {
  changeVote, setNotification
}

const mapStateToProps = (state) => {
  if (state.filter === '') {
    return {
      anecdotes: state.anecdotes
    }
  }
  return {
    anecdotes: ( state.anecdotes.filter((anecdote) => 
    anecdote.content.toLowerCase()
    .includes(state.filter.toLowerCase()))
    .sort((a,b) => b.votes - a.votes) )
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(Anecdotes)