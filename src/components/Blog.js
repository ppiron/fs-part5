import React from 'react'
import PropTypes from 'prop-types'
const Blog = ({ blog, visible, toggleBlogVisibility, incrementLikes, deleteBlog, showRemove }) => {

  return (
    <div style={
      {
        boxSizing: 'border-box',
        paddingLeft: '3px',
        paddingTop: '10px',
        marginBottom: '3px',
        border: '1px solid grey',
        borderRadius: '2px',
        cursor: 'pointer'
      }
    } onClick={() => toggleBlogVisibility(blog.id)} >
      <div >
        {blog.title} {blog.author}
      </div>
      {
        visible ? (
          <>
            <div>{blog.url}</div>
            <div>{blog.likes} likes <button onClick={(event) => {
              event.stopPropagation()
              incrementLikes(blog)
            }}>like</button></div>
            <div>added by {blog.user.name}</div>
            {showRemove && <button onClick={(event) => {
              event.stopPropagation()
              if (window.confirm(`Do you want to delete the blog ${blog.title}?`)) {
                deleteBlog(blog)
              }
            }}>remove</button>}
          </>
        ) : null
      }
    </div >
  )
}

// Blog.propTypes = {
//   toggleBlogVisibility: PropTypes.func.isRequired,
//   incrementLikes: PropTypes.func.isRequired,
//   deleteBlog: PropTypes.func.isRequired,
//   visible: PropTypes.bool.isRequired,
//   showRemove: PropTypes.bool.isRequired,
//   blog: PropTypes.object.isRequired,
// }



export default Blog