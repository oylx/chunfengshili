import axios from 'axios'
import store from '@/store'

const service = axios.create({
    baseURL: window.__POWERED_BY_QIANKUN__ ? '/operation-merchant' : '',
    timeout: 300000,
    headers: {
        // 'x-requested-with': 'XMLHttpRequest'
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

service.interceptors.request.use(config => {
    // 自定义一些config 配置
    store.dispatch('setRequestLoading', true)
    /** mock start **/
    const MockControl = process.env.VUE_APP_MOCK === 'true'
    const MockUrl = process.env.VUE_APP_MOCKURL + config.useMock + config.url
    config.url = MockControl && config.useMock ? MockUrl : config.url
    /** mock end **/
    return config
}, error => {
    setTimeout(() => {
        store.dispatch('setRequestLoading', 0)
    }, 200)
    //  处理一些请求出错的情况
    Promise.reject(error)
})

service.interceptors.response.use(response => {
    // 处理一些response 正常返回的逻辑
    store.dispatch('setRequestLoading', false)
    return response
}, error => {
    const { status, headers } = error.response

    if (status === 401) {
        if (headers['cas-redirect-url']) {
            location = headers['cas-redirect-url']
        }
        return
    }
    if (status === 403) {
        if (headers['upc-redirect-url']) {
            location = headers['upc-redirect-url']
        }
    }

    // 这里处理一些response 出错时的逻辑
    store.dispatch('setRequestLoading', false)
    return Promise.reject(error)
})

export const request = async option => {
    try {
        const response = await service(option)
        const { status, data } = response
        if (status === 200) {
            /**
             * mos的后台有时返回message 有时返回msg，这里从接口层面做一次兼容吧
             */
            data.message = data.msg = data.message || data.msg
            return data
        }
    } catch (err) {
        if (err.response) {
            const { data } = err.response
            let msg = data.message || data.msg
            throw msg
        }
        throw err
    }
}

export const fileRequest = async option => {
    try {
        const response = await service(option)
        const { status } = response
        if (status === 200) {
            /**
             * mos的后台有时返回message 有时返回msg，这里从接口层面做一次兼容吧
             */
            return response
        }
    } catch (err) {
        if (err.response) {
            const { data } = err.response
            let msg = data.message || data.msg
            throw msg
        }
        throw err
    }
}
