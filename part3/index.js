require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const Yhteystieto = require('./models/yhteystieto')
const { response } = require('express')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

app.get('/', (req, res) => {
  res.send('<h1>Phonebook</h1>')
})

app.get('/api/notes', (req, res) => {
  Yhteystieto.find({}).then(yhteystieto => {
    res.json(yhteystieto)
  })
})

app.get('/api/notes/:id', (request, response, next) => {
  Yhteystieto.findById(request.params.id)
    .then(yhteystieto => {
      if (yhteystieto) {
        response.json(yhteystieto)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {next(error)})
})

app.get('/api/info', (request, response) => {
  Yhteystieto.find({}).then(yhteystiedot => {
    response.send(`<div> <p> Phonebook has info for ${yhteystiedot.length} people</p> <p> ${new Date()}</p> </div>`)
  })
})


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

app.delete('/api/notes/:id', (request, response, next) => {
  Yhteystieto.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const yhteystieto = {
    name: body.name,
    number: body.number
  }

  Yhteystieto.findByIdAndUpdate(request.params.id, yhteystieto, { new: true })
    .then((update) => {
      response.json(update)
    })
    .catch((error) => next(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  }
  next(error)
}
app.use(errorHandler)