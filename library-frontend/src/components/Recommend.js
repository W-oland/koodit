import { React, useEffect, useState }from 'react'
import { gql, useLazyQuery, useQuery } from '@apollo/client'

const FILTERED_BOOKS = gql`
query filteredBooks ($filter: String!) {
  allBooks (genre: $filter) {
    title
    author {
      name 
      born
    }
    published
  }
}
`

const ME = gql`
query {
  me {
    username
    favouriteGenre
  }
}

`

const Recommend = (props) => {
  const user = useQuery(ME)
  const [ genre, setGenre ] = useState(null)

  const [ getBooks, result ] = useLazyQuery(FILTERED_BOOKS)
  const [ books, setBooks ] = useState([])

  useEffect(() => {
    if (user.data) {
      setGenre(user.data.me.favouriteGenre)
      console.log(genre)
      getBooks({ variables: { filter: genre }})
    }
  },[ user, genre, getBooks ])

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
      console.log(result.data.allBooks)
    }
  }, [ result ])

    if(!props.show) {
        return null
    }

    if (genre) {
      console.log(books)
      return (
        <div>
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
        {books.map(book =>
        <tr key={book.title}>
          <td>{book.title}</td>
          <td>{book.author.name}</td>
          <td>{book.published}</td>
        </tr>)}
          </tbody>
        </table>
        </div>
      )
    }
  
    return ('No favourite genre!')

}

export default Recommend