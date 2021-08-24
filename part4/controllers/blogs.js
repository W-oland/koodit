const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async(request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
        response.json(blog.toJSON())
    } else {
        response.status(404).end()
    }
})

/*const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}*/

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    //const token = getTokenFrom(request)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }
    
    const user = await User.findById(decodedToken.id)
    //const user = request.user
    

    //const user = await User.findById(body.userId)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
    })

    try {
        const saved = await blog.save()
        user.blogs = user.blogs.concat(saved._id)
        await user.save()

        response.json(saved.toJSON())
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({error: 'not authorized'})
    }

    /*try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }*/
})

blogsRouter.put('/:id', async (request, response, next) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
        response.status(200).end()
    } catch (exception) {
        next(exception)
    }

    /*Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    .then(updatedBlog => {
        response.json(updatedBlog.toJSON())
    })
    .catch(error => next(error))*/
})

module.exports = blogsRouter