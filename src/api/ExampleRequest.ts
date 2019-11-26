import {Request} from "@/api/config";


class ExampleRequest extends Request {
    //获取表单约束字段
    getData(data: {
        "form": object
    }) {
        return this.post('/form/getconstraint', data);
    }

    //删除字段
    deleteData(data: any){
        return this.post('/form/delformconstraint', data);
    }


}

export const exampleRequest = new ExampleRequest();