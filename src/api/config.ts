import axios from 'axios';

let baseUrl: string;

if (process.env.NODE_ENV === 'production') {
    // 生产环境下使用真实路径
    baseUrl = 'http://47.106.213.116/api';
} else {
    // 非生产环境下，都使用代理服务器
    baseUrl = '/api/api';
}

// @ts-ignore
const _Request = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
});

/**
 * 统一对请求进行处理
 */
_Request.interceptors.request.use((config: any): any => {

}, error => {})

/**
 * 统一对返回的数据进行过滤
 */
_Request.interceptors.response.use((result: any): any => {

    return result.data;

}, (error: any) => {
    // 请求发生错误的时候
    let status = error.response.status;

    return error;
});

export class Request {
    protected post(url: string = '', data: any) {
        return _Request.post(url, data);
    }

    protected get(url: string = '') {
        return _Request.get(url);
    }

    protected put(url: string = '', data: any) {
        return _Request.put(url, data);
    }

    protected deletes(url: string = '') {
        return _Request.delete(url);
    }

    protected upload(url: string = '', data: any) {
        return _Request.post(url, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}