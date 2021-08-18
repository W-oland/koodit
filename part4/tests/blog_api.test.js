const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

/*const init = [
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
]*/

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.init[0])
    await blogObject.save()
    blogObject = new Blog(helper.init[1])
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
    expect(response.body).toHaveLength(helper.init.length)
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
    .expect(200) // <-- Materiaalissa jostakin syystä 200 vaikka tässä luodaan uusi muistiinpano! 
    .expect('Content-Type', /application\/json/)

    /*const response = await api.get('/api/blogs')

    const title = response.body.map(response => response.title)

    expect(response.body).toHaveLength(init.length + 1) */

    const blogsExodus = await helper.blogsDB()
    expect(blogsExodus).toHaveLength(helper.init.length + 1)

    const title = blogsExodus.map(blog => blog.title)
    expect(title).toContain('Mains goals')
})

test('a blog without title and url is not added', async () => {
    
    const newBlog = {
        author: "Ozzy Halford"
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

    /*const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(init.length)*/

    const blogsExodus = await helper.blogsDB()
    expect(blogsExodus).toHaveLength(helper.init.length)
})

test('a blog without likes has likes set to default value of zero', async () => {
    const newBlog = {
        title: "Heavy Metal",
        author: "Lemmy",
        url: "motorhead.com"
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.init.length + 1)
    expect(response.body[2].likes).toBe(0)
})

test('a blog can be deleted', async () => {
    const blogsGenesis = await helper.blogsDB()
    const blogToDelete = blogsGenesis[0]

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsExodus = await helper.blogsDB()

    expect(blogsExodus).toHaveLength(helper.init.length - 1)

    const titles = blogsExodus.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
})

afterAll(() => {
    mongoose.connection.close()
})
