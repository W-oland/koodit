require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
// const mongoose = require('mongoose')
const Yhteystieto = require('./models/yhteystieto')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

/* const url =
  `mongodb+srv://fullstack:salasana@cluster0.kakmq.mongodb.net/uusiSovellus?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const yhteystietoSchema = new mongoose.Schema({
  name: String,
  number: String
})

yhteystietoSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Yhteystieto = mongoose.model('Yhteystieto', yhteystietoSchema) */

/* let notes = [
  {
    "name": "Tatu T",
    "number": "123",
    "id": 7
  },
  {
    "name": "asd",
    "number": "123",
    "id": 8
  },
  {
    "name": "Arto k",
    "number": "123",
    "id": 9
  },
  {
    "name": "Arto K",
    "number": "123123123",
    "id": 10
  },
  {
    "name": "Matti Kasd",
    "number": "123123123",
    "id": 11
  }
] */

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  Yhteystieto.find({}).then(yhteystieto => {
    res.json(yhteystieto)
  })
})

const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/notes', (request, response) => {
  const body = request.body
  console.log(body)

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const yhteystieto = new Yhteystieto ({
    name: body.name,
    number:body.number
  })

  yhteystieto.save().then(savedNote => {
    response.json(savedNote)
  })
})

app.get('/api/notes/:id', (request, response) => {
  Yhteystieto.findById(request.params.id).then(yhteystieto => {
    response.json(yhteystieto)
  })
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)

  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

