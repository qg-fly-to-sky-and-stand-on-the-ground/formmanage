import {Request} from "@/api/config";

class ExampleRequest extends Request {
// {
//     "form":{
//         "id":"uuid" // 参看表单中获取 demo可用 ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95
//     }
// }
    getFormdata(data: any) {
        //data是你发送请求时post请求的字段的字段，post方法返回一个请求函数发送请求
        return this.post('12321', data);
    }


}

export const exampleRequest = new ExampleRequest();