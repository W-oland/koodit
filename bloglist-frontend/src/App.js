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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      SETuser(user)
      SETusername('')
      SETpassword('')
    } catch (exception) {
      SETerrorMessage('wrong credentials')
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
      <p>{user.name} logged in</p>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App