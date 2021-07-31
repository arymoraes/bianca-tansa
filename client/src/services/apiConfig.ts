import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

// if the user has a valid token that hasn't expired yet we retrieve and set it on headers
const accessToken = localStorage.getItem('accessToken')

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Authorization: accessToken ? accessToken : '',
  },
})

export default api
