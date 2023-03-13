import axios from 'axios'

const request = axios.create({
    baseURL: 'https://youtube-project-server.vercel.app/'
})

export default request;