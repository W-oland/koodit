import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, SETusername] = useState('')
  const [password, SETpassword] = useState('')
  const [user, SETuser] = useState(null)
  const [errorMessage, SETerrorMessage] = useState(null)

  const [title, SETtitle] = useState('')
  const [author, SETauthor] = useState('')
  const [url, SETurl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const addBlog = (event) => {
    event.preventDefault()
    
    const blogObject = {
      title: title,
      author: author,
      url: url 
    }
    blogService
    .create(blogObject)
    .then(returnedBlog => {
    setBlogs(blogs.concat(returnedBlog))
    })
    SETauthor('')
    SETtitle('')
    SETurl('')
    
    SETerrorMessage(`A new blog ${title} by ${author} added`)
    setTimeout(() => {
      SETerrorMessage(null)}, 5000);
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
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
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
        <div>
          username  
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => SETusername(target.value)}
          />
        </div>
        <div>
          password  
          <input
          type="text"
          value={password}
          name="Password"
          onChange = {({target}) => SETpassword(target.value)}
           />
        </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage}/>
      <p>{user.name} logged in</p>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          URL
          <input 
          value={url}
          onChange={({target}) => SETurl(target.value)}
          />
        </div>
        <div>
          TITLE
          <input 
          value={title}
          onChange={({target}) => SETtitle(target.value)}
          />
        </div>
        <div>
          AUTHOR
          <input 
          value={author}
          onChange={({target}) => SETauthor(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App