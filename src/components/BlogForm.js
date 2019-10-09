import React, { useState } from 'react'

const BlogForm = ({ createNewBlog }) => {
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
  }

  return (
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
      </form>
    </>
  )
}

export default BlogForm