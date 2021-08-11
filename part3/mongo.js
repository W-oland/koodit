const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]


const url =
  `mongodb+srv://fullstack:${password}@cluster0.kakmq.mongodb.net/uusiSovellus?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const yhteystietoSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Yhteystieto = mongoose.model('Yhteystieto', yhteystietoSchema)

const yhteystieto = new Yhteystieto({
    name: process.argv[3],
    number: process.argv[4]
})

if (process.argv.length === 5) {
  yhteystieto.save().then(response => {
    console.log(`Added ${yhteystieto.name} ${yhteystieto.number} to phonebook`)
    mongoose.connection.close()
  })
} else if (process.argv.length === 3) {
  Yhteystieto.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else {
  process.exit(1)
}