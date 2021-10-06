import { React, useEffect, useState }from 'react'
import { gql, useQuery } from '@apollo/client'

const ALL_BOOKS = gql`
query {
  allBooks { 
    title 
    author {
      name
      born
    }
    published
    genres
  }
}
`

const Books = (props) => {
  const result = useQuery(ALL_BOOKS) // <-- kyselyn tulos
  const [books, setBooks] = useState([])

  const genres = books.map(book => book.genres)
  console.log(genres)

  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
    
  },[result])

  console.log(books)

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              book
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books