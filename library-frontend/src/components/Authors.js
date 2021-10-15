import { React, useEffect, useState }from 'react'
import { gql, useQuery } from '@apollo/client'
import NewBirthday from './NewBirthday'

const ALL_AUTHORS = gql`
query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS) // <-- kyselyn tulos
  const [authors, setAuthors] = useState([])
  
  useEffect(() => {
    if(result.data) {
      setAuthors(result.data.allAuthors)
    }
    
  },[result])

  
  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <NewBirthday authors={authors}/>

    </div>
  )
}

export default Authors