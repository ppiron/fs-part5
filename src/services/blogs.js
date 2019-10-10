import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = (newBlog, token) => {
  return axios.post(baseUrl, newBlog, {
    headers: { 'Authorization': `Bearer ${token}` },
  }).then(response => response.data)
}

const updateBlog = (id, newBlog) => {
  return axios.put(`${baseUrl}/${id}`, newBlog)
    .then(response => response.data)
}

const deleteBlog = (id, token) => {
  return axios.delete(`${baseUrl}/${id}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  })
}

export default {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog
}