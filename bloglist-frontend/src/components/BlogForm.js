import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, SETtitle] = useState('')
  const [author, SETauthor] = useState('')
  const [url, SETurl] = useState('')

  const handleTitleChange = ({ target }) => {
    SETtitle(target.value)
  }

  const handleAuthorChange = ({ target }) => {
    SETauthor(target.value)
  }

  const handleUrlChange = ({ target }) => {
    SETurl(target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    SETauthor('')
    SETtitle('')
    SETurl('')
  }

  return (
    <div>
      <form onSubmit={addBlog} >
        <div>
    title
          <input
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
    author
          <input
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
    url
          <input
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit" >create</button>
      </form>
    </div>
  )
}

export default BlogForm