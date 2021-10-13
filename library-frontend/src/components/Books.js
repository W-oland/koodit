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

/*const Buttons = (props) => {
  return (
    props.list.map(g => 
      <button 
      key={g}
      onClick={}
      >
        {g}
      </button>
      )    
  )
}*/

const Books = (props) => {
  const result = useQuery(ALL_BOOKS) // <-- kyselyn tulos
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState(null)

  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
    
  },[result])

  console.log(books)

  if (!props.show) {
    return null
  }

  let genres = books.flatMap(book => book.genres)
  console.log(books)
  genres = [...new Set(genres)]

  /*if(genre) {
    return (
      <div>
        {books.filter(book =>
          book.genres.includes(genre)
          )}
      </div>
     
    )
  }*/

  

  /*const options = authors.map((a) => {
        return {
            value: a.name,
            label: a.name
        }
    })

    const value = name
    ? { label: name, value: name }
    : null*/

  if (genre) {
    const filteredBooks = books.filter(book => book.genres.includes(genre))
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
        {genres.map(g => 
      <button 
      key={g}
      onClick={() => setGenre(g)}
      >
        {g}
      </button>
      )  }
      </div>
      
    )
  }
    /*return (
      <div>
        
        {books.flatMap(book => 
          book.genres.filter(genres =>
            genres.includes(genre))
          )}
      </div>
    )
  }*/

    
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
      {/*<Buttons list={genres} />*/}
      {genres.map(g => 
      <button 
      key={g}
      onClick={() => setGenre(g)}
      >
        {g}
      </button>
      )  }
      {console.log(genre)}
    </div>
  )
  
}


export default Books