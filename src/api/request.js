import axios from "axios";

const service = axios.create({
    timeout: 10000
})

// 请求拦截
service.interceptors.request.use((config) => {
    // do something
    // 添加token

    return config
}, (err) => {
    // 发生错误时的回调函数
    console.log('请求失败')
})

// 响应拦截
service.interceptors.response.use((res) => {
    return res.data
}, (err) => {
    // 发生错误时的回调函数
    console.log('响应失败')
})

export default service