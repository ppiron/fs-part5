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
  const [isFormVisible, setFormVisible] = useState(false)
  const [visibleBlogs, setVisibleBlogs] = useState(undefined)
  // const [allOpen, setAllOpen] = useState(false)

  const fetchBlogs = async user => {
    const blogs = await blogService.getAll()
    const userBlogs = blogs
    // .filter(blog => blog.user.username === user.user)
    setBlogs(userBlogs)
    setVisibleBlogs(Object.fromEntries(Array.from(blogs, blog => [blog.id, false])))
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

  const handleLogin = async (event) => {
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

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible)
  }

  const createNewBlog = newBlog => {
    blogService.createBlog(newBlog, user.token)
      .then(savedBlog => {
        setBlogs([...blogs, savedBlog])
        setMessage(`a new blog ${savedBlog.title} ${savedBlog.author ? 'by ' + savedBlog.author : ' '}  added`)
        window.setTimeout(() => setMessage(''), 3000)
      })
  }

  const deleteBlog = blog => {
    blogService.deleteBlog(blog.id, user.token)
      .then(() => {
        setBlogs(blogs.filter(blg => blg.id !== blog.id))
        setMessage(`the blog ${blog.title} has been deleted`)
        window.setTimeout(() => setMessage(''), 3000)
      })
      .catch(err => console.log(err))
  }

  const incrementLikes = (blog) => {
    blogService.updateBlog(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    })
      .then(updatedBlog => {
        setBlogs(blogs.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog))
      })
  }

  const toggleBlogVisibility = id => {
    setVisibleBlogs({ ...visibleBlogs, [id]: !visibleBlogs[id] })
  }
  const openAllBlogs = () => {
    setVisibleBlogs(Object.fromEntries(Array.from(blogs, blog => [blog.id, true])))
  }
  const closeAllBlogs = () => {
    setVisibleBlogs(Object.fromEntries(Array.from(blogs, blog => [blog.id, false])))
  }

  if (user) {
    console.log('pippo')
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
    return (
      <>
        <h2>Blogs</h2>
        <Notification message={message} />
        <div><span>{user.name} logged in </span>
          <button onClick={handleLogout}>logout</button>
        </div>
        <br />
        <BlogForm isFormVisible={isFormVisible} toggleFormVisibility={toggleFormVisibility} createNewBlog={createNewBlog} />
        {sortedBlogs.map(blog => {
          return (
            <Blog key={blog.id}
              blog={blog}
              incrementLikes={incrementLikes}
              deleteBlog={deleteBlog}
              showRemove={blog.user.username === user.user}
              visible={visibleBlogs[blog.id]}
              toggleBlogVisibility={toggleBlogVisibility} />
          )
        })}
        {(function () {
          const openBlogs = Object.values(visibleBlogs).filter(isOpen => isOpen === true).length
          if (openBlogs === Object.values(visibleBlogs).length) {
            return <button onClick={closeAllBlogs}>Collapse all blogs</button>
          }
          if (openBlogs === 0) {
            return <button onClick={openAllBlogs}>Expand all blogs</button>
          }
          return (
            <>
              <button onClick={openAllBlogs}>Expand all blogs</button>
              <button onClick={closeAllBlogs}>Collapse all blogs</button>
            </>)
        })()}
        {/* {(blogs.length > 0 && !allOpen) ?
          (<button onClick={openAllBlogs}>Open all blogs</button>) :
          (blogs.length > 0 && allOpen) ? (<><button onClick={openAllBlogs}>Open all blogs</button> <button onClick={closeAllBlogs}>Close all blogs</button></>) : null
        } */}
      </>
    )
  } else if (user === null) {
    console.log('pippa')
    return (
      <>
        <h1>log in to application</h1>
        <ErrorNotification errorMessage={errorMessage} />
        <form onSubmit={handleLogin}>
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
