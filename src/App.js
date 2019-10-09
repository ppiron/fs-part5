import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Blog from './components/Blog'
import Notification from './components/Notification'
import ErrorNotification from './components/ErrorNotification'
import BlogForm from './components/BlogForm'
import './index.css'

function App() {
  const [user, setUser] = useState(undefined)
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const fetchBlogs = async user => {
    const blogs = await blogService.getAll()
    const userBlogs = blogs.filter(blog => blog.user.username === user.user)
    setBlogs(userBlogs)
    setUser(user)
  }

  useEffect(() => {
    const savedUser = localStorage.getItem('loggedUser')
    if (savedUser) {
      fetchBlogs(JSON.parse(savedUser))
    } else {
      setUser(null)
    }
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const userData = {
      username,
      password
    }
    const user = await loginService.login(userData)
    if (user) {
      console.log(user)
      localStorage.setItem('loggedUser', JSON.stringify(user))
      fetchBlogs(user)
    } else {
      setErrorMessage('Invalid username or password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const createNewBlog = newBlog => {
    blogService.createBlog(newBlog, user.token)
      .then(savedBlog => {
        setBlogs([...blogs, savedBlog])
        setMessage(`a new blog ${savedBlog.title} ${savedBlog.author ? 'by ' + savedBlog.author : ' '}  added`)
        window.setTimeout(() => setMessage(''), 5000)
      })
  }

  if (user) {
    console.log('pippo')
    return (
      <>
        <h2>Blogs</h2>
        <Notification message={message} />
        <span>{user.name} logged in </span><button onClick={handleLogout}>logout</button>
        <BlogForm createNewBlog={createNewBlog} />
        {blogs.map(blog => {
          return (
            <Blog key={blog.id} blog={blog} />
          )
        })}
      </>
    )
  } else if (user === null) {
    console.log('pippa')
    return (
      <>
        <h1>log in to application</h1>
        <ErrorNotification errorMessage={errorMessage} />
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">username </label>
          <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <br />
          <label htmlFor="password">password </label>
          <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="submit">login</button>
        </form>
      </>
    )
  } else if (user === undefined) {
    console.log('crotalo')
    return null
  }
}

export default App;
