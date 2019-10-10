import React, { useState } from 'react'

const BlogForm = ({ createNewBlog, isFormVisible, toggleFormVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    createNewBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
    toggleFormVisibility()
  }

  return (
    isFormVisible ? (
      <>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">title </label>
          <input type="text" name="title" value={title} onChange={event => setTitle(event.target.value)} />
          <br />
          <label htmlFor="author">author </label>
          <input type="text" name="author" value={author} onChange={event => setAuthor(event.target.value)} />
          <br />
          <label htmlFor="url">url </label>
          <input type="text" name="url" value={url} onChange={event => setUrl(event.target.value)} />
          <br />
          <button type="submit">create</button>
          <br />
          <button onClick={toggleFormVisibility}>cancel</button>
        </form>
      </>
    ) :
      (
        <button onClick={toggleFormVisibility}>new blog</button>
      )
  )
}

export default BlogForm