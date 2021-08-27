import React, {useState} from 'react'

const Blog = ({blog, likeClick, deleteClick}) => { // <--- Tässä
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
    <button onClick={handleToggle}>{showDetails ? 'hide' : 'view'}</button>
    {showDetails &&  (
      <ul>
        <li>{blog.url}</li>
        <li>{blog.likes}
          <button onClick={likeClick}>like</button>
        </li>
        <li>{blog.user.name}</li>
          <li>
          <button onClick={deleteClick}>Delete</button>
          </li>
      </ul>
    )}
  </div>  
)}
 // myös rivillä 25
export default Blog