import {Request} from "@/api/config";


class ExampleRequest extends Request {
    getData(data: {
        "form": object
    }) {
        return this.post('/form/getconstraint', data);
    }


}

export const exampleRequest = new ExampleRequest();