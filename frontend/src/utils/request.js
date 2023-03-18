import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3023/'
})

let retry = 0

request.interceptors.request.use((config) => {
    config.headers = { ...config.headers, Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    return config
}, function (error) {
    return Promise.reject(error);
})


request.interceptors.response.use((res) => {
    retry = 0
    return res

}, async (error) => {
    retry += 1
    if (retry < 5) {
        if (error.response.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken')
            const response = await request.post('refresh-token',
                {
                    refreshToken: refreshToken
                })

            console.log(response.data.accessToken);
            localStorage.setItem("accessToken", response.data.accessToken);
            return request.request({ method: error.config.method, url: error.config.url, data: error.config.data, status: error.config.status })
        }
        else {
            // localStorage.removeItem('accessToken')
            return Promise.reject(error);
        }
    }

})



export default request;