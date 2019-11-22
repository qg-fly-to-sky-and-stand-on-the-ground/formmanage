import {Request} from "@/api/config";

class ExampleRequest extends Request {
    字段增删查改(data: {
        a: string;
    }) {
        return this.post('12321', data);
    }


}

export const exampleRequest = new ExampleRequest();