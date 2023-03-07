import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3023/'
})

export default request;