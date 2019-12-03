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
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * 统一对请求进行处理
 */
_Request.interceptors.request.use((config: any): any => {
  // 当存在token的时候，将token加到请求头上面
  return config
}, error => {})

/**
 * 统一对返回的数据进行过滤
 */
_Request.interceptors.response.use((result: any): any => {
  let data = result.data;



  // 当没有前面的问题的时候，返回请求对象的数据
  return result.data;

}, (error: any) => {
  console.log(error)
  // 请求发生错误的时候
  let status = error.response.status;


  return error;
});

export class Request {
  protected commonUrl: string = 'https://qgailab.com:12410/intelligent-form';

  public get(url: string): Promise<any> {
    return _Request.get(this.commonUrl + url);
  }

  public post(url: string, data: any): Promise<any> {
    return _Request.post(this.commonUrl + url, data);
  }

  public upload(url: string, data: any): Promise<any> {
    return _Request.post(this.commonUrl + url, data, {
      headers:{'Content-Type':'multipart/form-data'}
    });
  }

  public put(url: string, data: any) {
    return _Request.put(this.commonUrl + url, data);
  }

  public delete(url: string, data: any) {
    return _Request.delete(this.commonUrl + url);
  }
}
