import axios from 'axios'
const baseUrl = '/login'

const login = async userData => {
  try {
    const response = await axios.post(baseUrl, userData)
    return response.data
  } catch (error) {
    console.log(error.message)
  }
}

export default { login }