import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, SETusername] = useState('')
  const [password, SETpassword] = useState('')
  const [user, SETuser] = useState(null)
  const [errorMessage, SETerrorMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      SETuser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {
    blogFormRef.current.toggle()
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
    })
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    SETuser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      console.log(user.token)
      SETuser(user)
      console.log(user)
      SETusername('')
      SETpassword('')
    } catch (exception) {
      SETerrorMessage('wrong username or password')
      setTimeout(() => {
        SETerrorMessage(null)}, 5000)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2>Log in to application</h2>
        <Togglable buttonLabel="Reveal hidden secrets">
          <LoginForm
          username={username}
          password = {password}
          handleUsernameChange={({target}) => SETusername(target.value) }
          handlePasswordChange={({target}) => SETpassword(target.value)}
          handleSubmit = {handleLogin}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}/>
      <p>{user.name} logged in</p>
      <button onClick={handleLogout}>Logout</button>
      <h2>create new</h2>
      <Togglable buttonLabel="Create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}
        />
    </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App