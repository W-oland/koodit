import React, { useState } from 'react'

const Blog = ({ blog, likeClick, deleteClick }) => {
  const [showDetails, SETshowDetails] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleToggle = () => {
    SETshowDetails(!showDetails)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button id='view-hide-button' onClick={handleToggle}>{showDetails ? 'hide' : 'view'}</button>
      {showDetails &&  (
        <ul>
          <li>{blog.url}</li>
          <li>{blog.likes}
            <button id='like-button' onClick={likeClick}>like</button>
          </li>
          <li>{blog.user.name}</li>
          <li>
            <button id='delete-button' onClick={deleteClick}>Delete</button>
          </li>
        </ul>
      )}
    </div>
  )}

export default Blog