const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { PersistedQueryNotSupportedError, AuthenticationError } = require('apollo-server-errors')
const { v1:uuid } = require('uuid')

const mongoose = require('mongoose')
const Author = require ('./models/author')
const Book = require('./models/book')
const User = require ('./models/user')

const MONGODB_URI = 'mongodb+srv://fullstack:fullstack@cluster0.kakmq.mongodb.net/library-backend?retryWrites=true&w=majority'

const jwt = require('jsonwebtoken')
const JWT_SECRET = 'secret'


console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB', error.message)
})

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}

type Token {
  value: String!
}

type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
}

type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
}
  
type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks (author: String, genre: String): [Book]
    allAuthors: [Author]
    me: User
  }

type Mutation {
  
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String]
  ): Book
  
  editAuthor(
    name: String 
    setBornTo: Int
  ): Author

  createUser(
    username: String!
    favoriteGenre: String!
  ): User

  login(
    username: String!
    password: String!
  ): Token

}
`

const resolvers = {

  Query: {
      authorCount: () => Author.collection.countDocuments(), //authors.length,
      bookCount: () => Book.collection.countDocuments(), //books.length,
      allBooks: (root, args) => {
        if (!args.genre && args.author) {
          return Book.find({author: args.author}) //books.filter(books => books.author === args.author)
        } else if (!args.author && args.genre) {
          return Book.find({genre: args.genr}) //books.filter(books => books.genres.filter(genre => genre === args.genre))
        } else if (!args.author && !args.genre) { // <-- uusi
          return Book.find({}) //books
        } else {
          return Book.find({author: args.author, genre: args.genre}) //books.filter(books => books.author === args.author && books.genres.filter(genre => genre === args.genre))
        }
      },
      allAuthors: () => Author.find({}), //authors,
      me: (root, args, context) => {
        return context.currentUser
      },
  },
  
  Author: {
    bookCount: (root) => books.filter(book => book.author === root.name).length
  },

  Mutation: {

    createUser: (root, args) => {
      const user = new User({ username: args.username })

      return user.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })

    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }

    },
    
    addBook: (root,args, context) => {
    const book = new Book ({ ...args /* , id: uuid()*/ })
    const currentUser = context.currentUser

    if (!currentUser) {
      throw new AuthenticationError('not authenticated')
    }
      //books = books.concat(book)
      try {
        book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book // <-- Näin ainakin koodiesimerkeissä
    },
    
    editAuthor: async (root,args, context) => {
      const author = await Author.findOne({ name: args.name }) //authors.find(author => author.name === args.name)
      const currentUser = context.currentUser
      
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      
      if (author) {
        try {
          author.born = args.setBornTo
          await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args, 
          })
        }
        return author // <-- Näin ainakin koodiesimerkissä 
      } else {
        return null
      }
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    
    const auth = req
    ? req.headers.authorization
    : null

    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(decodedToken.id)

      return { currentUser }

    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})