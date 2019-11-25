import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import {getResultResData} from "@/utils/shared/formate";
import {exampleRequest} from "@/api/ExampleRequest";
@Module({name: 'Auth', namespaced: true, stateFactory: true})
export default class Auth extends VuexModule {
    @Action
    public async getFormData(data: any ) {
        return getResultResData(await exampleRequest.getData(data));
    }


}