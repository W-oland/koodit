const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const init = [
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      } 
]
beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(init[0])
    await blogObject.save()
    blogObject = new Blog(init[1])
    await blogObject.save()
})

test('all blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(init.length)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: "Mains goals",
        author: "Robs Halford",
        url: "http://judaspriest.com",
        likes: 55
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201) // <-- Materiaalissa jostakin syystä 200 vaikka tässä luodaan uusi muistiinpano! 
    .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    const title = response.body.map(response => response.title)

    expect(response.body).toHaveLength(init.length + 1)
    expect(title).toContain('Mains goals')
})

afterAll(() => {
    mongoose.connection.close()
})
