import axios from 'axios'

const request = axios.create({
    baseURL: 'https://youtube-project-server-git-master-duc-viet.vercel.app/'
})

export default request;