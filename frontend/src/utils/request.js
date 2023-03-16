import axios from 'axios'

const request = axios.create({
    baseURL: 'http://localhost:3023/'
})



let retry = 0

request.interceptors.request.use((req) => {

    // console.log(req.data);
    // req.data = [...req.data]
    req.headers = { ...req.headers, Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
    return req
},
)


request.interceptors.response.use((res) => {
    retry = 0
    return res

}, async (error) => {

    retry = + 1

    if (retry < 4) {
        if (error.response.status === 401) {
            const refreshToken = localStorage.getItem('refreshToken')
            const response = await request.post('refresh-token',
                {
                    refreshToken: refreshToken
                })
            localStorage.setItem("accessToken", response.data.accessToken);
        }
        return request.request({ method: error.config.method, url: error.config.url, data: error.config.data })
    }
    else {
        return localStorage.removeItem('accessToken')
    }

})



export default request;