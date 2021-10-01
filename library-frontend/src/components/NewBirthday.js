import { React, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import Select from 'react-select'

const CHANGE_BDAY = gql`
mutation alterBday ($name: String, $born: Int) {
    editAuthor(name: $name, setBornTo: $born) {
      name
      born
    }
  }
`
const ALL_AUTHORS = gql`
query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const Birthday = ({authors}) => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')

    const [ alterBday ] = useMutation(CHANGE_BDAY, {
        refetchQueries: [ { query: ALL_AUTHORS} ]
    })

    const submit = async (event) => {
        event.preventDefault()

        alterBday({ variables: { name, born: Number(born) } })

        setName('')
        setBorn('')
    }

    const options = authors.map((a) => {
        return {
            value: a.name,
            label: a.name
        }
    })

    const value = name
    ? { label: name, value: name }
    : null

    return (
        <div>
            <h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <Select 
                options={options}
                value={value}
                onChange={({ label }) => setName(label)}
                />
            <div>
                born
                <input
                    value={born}
                    onChange={({ target }) => setBorn(target.value)}
                />
            </div>
            <button type='submit'>update author</button>
            </form>
        </div>

    )
}

export default Birthday