import React from 'react'

const Blog = ({ blog, visible, toggleBlogVisibility, incrementLikes, deleteBlog, showRemove }) => {
  // const [fullDetails, setDetails] = useState(false)

  // const toggleDetails = () => {
  //   setDetails(!fullDetails)
  // }

  return (
    <div style={
      {
        boxSizing: "border-box",
        paddingLeft: "3px",
        paddingTop: "10px",
        marginBottom: "3px",
        border: "1px solid grey",
        borderRadius: "2px",
        cursor: "pointer"
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

export default Blog