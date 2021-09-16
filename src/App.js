import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  
  const hook = async () => {
    
    if (!name) {
      return null 
    }

    const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)

    const object = {
      data: response.data[0], // <-- jos maita enemmän kuin 1, otetaan näistä vain ensimmäinen.
      found: true // <-- annetaan palautetulle objektille uusi kenttä 'found'
    }

    if (!object.found) {
      return setCountry({ found: false })
    } else {
      return setCountry(object)
    }
    
  }

  useEffect(hook, [name])
 
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country.found) { // <-- tarkkana! tässä annettu tieto, että country-objektilla on oltava json-kenttänä 'found'
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div> 
      <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App
