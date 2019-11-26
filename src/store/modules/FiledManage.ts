import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import {getResultResData} from "@/utils/shared/formate";
import {exampleRequest} from "@/api/ExampleRequest";
@Module({name: 'Auth', namespaced: true, stateFactory: true})
export default class Auth extends VuexModule {
    //获取表单约束字段
    @Action
    public async getFormData(data: any ) {
        return getResultResData(await exampleRequest.getData(data));
    }

    //删除表单约束字段
    @Action
    public async deleteField(data: any) {
        return getResultResData(await exampleRequest.deleteData(data));
    }
}