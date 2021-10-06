const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const { v1:uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
const Author = require ('./models/author')
const Book = require('./models/book')
const User = require ('./models/user')

const JWT_SECRET = 'secret'
const MONGODB_URI = 'mongodb+srv://fullstack:fullstack@cluster0.kakmq.mongodb.net/library-backend?retryWrites=true&w=majority'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB', error.message)
})

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
    allAuthors: [Author!]!
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
      authorCount: async () =>  await Author.collection.countDocuments(), //authors.length,
      bookCount: async () =>  await Book.collection.countDocuments(), //books.length,
      allBooks: async (root, args) => await Book.find({}).populate('author'),
      /*allBooks: async (root, args) => {
        if (!args.genre && args.author) {
          return await Book.find({author: args.author}) //books.filter(books => books.author === args.author)
        } else if (!args.author && args.genre) {
          return await Book.find({genre: args.genr}) //books.filter(books => books.genres.filter(genre => genre === args.genre))
        } else if (!args.author && !args.genre) { // <-- uusi
          return await Book.find({}) //books
        } else {
          return await Book.find({author: args.author, genre: args.genre}) //books.filter(books => books.author === args.author && books.genres.filter(genre => genre === args.genre))
        }
      },*/
      allAuthors: async () => await Author.find({}),
      me: (root, args, context) => {
        return context.currentUser
      },
  },
  
  Author: {
    bookCount: (root) => root.books.length //books.filter(book => book.author === root.name).length
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
    
    addBook: async (root,args, context) => {
      
      let book

      try {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new AuthenticationError('not authenticated')
        }

        let author = await Author.findOne({ name: args.author })
        if (author) {
          book = new Book ({ ...args, author: author._id })
          author.books = author.books.concat(book._id)
          await book.save()
          await author.save()
        } 
        if (!author) {
          const _id = mongoose.Types.ObjectId()
          book = new Book ({ ...args, author: _id })
  
          author = new Author({
            name: args.author,
            born: null,
            bookCount: 1,
            _id,
            books: [book.id]
          })

          await author.save()
          await book.save()
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
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