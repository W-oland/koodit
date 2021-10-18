import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { gql, useSubscription,useApolloClient } from '@apollo/client'

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10*1000)
  }

  if (!token) {
    return (
      <div>
        <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

        <Authors
          show={page === 'authors'}
        />

        <Books
          show={page === 'books'}
        />
        
        <Notify errorMessage={errorMessage} />
        
        <LoginForm 
          show = {page === 'login'}
          setToken={setToken}
          setError={notify}
        />
      </div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')} >recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommend 
        show={page === 'recommend'}
      />

    </div>
  )
}

export default App