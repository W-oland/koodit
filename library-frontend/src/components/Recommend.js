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

const ME = gql`
query {
  me {
    username
    favouriteGenre
  }
}

`

const Recommend = (props) => {
    const result = useQuery(ALL_BOOKS) // <-- kyselyn tulos
    const user = useQuery(ME)
    const [books, setBooks] = useState([])
    const [genre, setGenre] = useState(null)

    useEffect(() => {
      if (user.data && user.data.me) {
        setGenre(user.data.me.favouriteGenre)
      } 
    },[user, genre])

    useEffect(() => {
        if(result.data) {
          setBooks(result.data.allBooks)
        }
      },[result])

    if(!props.show) {
        return null
    }

    if (genre) {
      const filteredBooks = books.filter(book => book.genres.includes(genre))
      console.log(filteredBooks)
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
        {filteredBooks.map(book =>
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