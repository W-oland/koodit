import anecdoteService from '../services/anecdotes'

/*export const changeVote = (id) => {
  console.log('vote', id)
  return ({
    type: 'VOTE',
    data: { id }
  })
}*/

export const changeVote = (anecdote) => {
  return async dispatch => {
    const object = {...anecdote, votes: anecdote.votes + 1}
    const changed = await anecdoteService.updateItem(anecdote.id, object)
    dispatch({
      type:'VOTE',
      data: changed,
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type:'NEW_NOTE',
      data: newAnecdote,
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  
  switch(action.type) {
    case 'NEW_NOTE':
      return [...state, action.data]
    case 'INIT_NOTES':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdote = state.find(n => n.id === id)
      const changed = {
        ...anecdote,
        votes: anecdote.votes + 1
      }
      return state.map(n => n.id !== id ? n : changed)
    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_NOTES',
      data: anecdotes,
    })
  }
}

export default reducer