import React, { useEffect, useState } from 'react'
import personService from './services/persons'

const Button = (props) => (
  <button onClick={props.deleteObject}>
    {props.name}
  </button>
)

const Notification = (props) => {
  const notificationStyle = {
    color:'green',
    fontStyle:'italic',
    fontSize: 16,
    borderStyle: "solid",
    backgroundColor: 'lightgrey',
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px"
  }

  if (props.message === null) {
    return null
  }

  return (
    <div className='error' style={notificationStyle}>
      {props.message}
    </div>
  )
}


const App = () => {
  const  [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ condition, setCondition] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}`))
    personService.deleteObject(id).then(returnedNote => {
      setPersons(persons.filter(n => n.id !== id))
    })
    .catch(error =>{
      setErrorMessage(`${name} was already deleted`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
      setPersons(persons.filter(n => n.id !== id ))

    })
    setErrorMessage(`${name} was deleted`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)      
  }
  
  useEffect(()=> {
    console.log('effect')
    personService
      .getAll('http://localhost:3001/persons')
      .then(initialNotes => {
        console.log('promise fulfilled')
        setPersons(initialNotes)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const personsToShow = condition
  ? persons.filter(person => person.name.toLowerCase().search(condition.toLowerCase()) !== -1)
  : persons
  
  const addPerson = (event) => {
    event.preventDefault()
    console.log('Submitted: ', event.target)
    const personObject = {
      name: newName, 
      number: newNumber
    }
    if(persons.filter(e => e.name === newName).length > 0) {
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const contact = persons.find(person => person.name === newName) 
        personService
          .update(contact.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== contact.id ? person : returnedPerson))
            setErrorMessage(`Changed ${newName}'s phonenumber`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 2000)
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedNote =>{
          console.log(returnedNote)
          setPersons(persons.concat(returnedNote))
          setNewName('') // This clears the "state"
          setNewNumber('')
          console.log(persons)
          setErrorMessage(`Added ${newName}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
      }
  }

    const handleName = (event) => {
      console.log('Changed name (state): ', event.target.value)
      setNewName(event.target.value)
    }

    const handleNumber = (event) => {
      console.log('Changed number (state): ', event.target.value)
      setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
      console.log('Changed search (state)', event.target.value)
      setCondition(event.target.value)
    }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <div>
        filter shown with <input 
        value={condition}
        onChange={handleSearch}
        />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
          value={newName}
          onChange={handleName}
          />
        </div>
        <div>
          number: <input
          value={newNumber}
          onChange={handleNumber}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {personsToShow.map(person =>
          <li key={person.name}>
            {person.name} {person.number}
            <Button name='Delete' deleteObject={() => handleDelete(person.id, person.name)} />
          </li>
          )}
      </ul>
    </div>
  )

}

export default App
