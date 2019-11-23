import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import {getFormatResult} from "@/utils/format";
import {exampleRequest} from "@/api/ExampleRequest";
@Module({name: 'Auth', namespaced: true, stateFactory: true})
export default class Auth extends VuexModule {
    // public count = 12;
    // get getCount() {
    //     return this.count;
    // }

    // action 'decr' commits mutation 'decrement' when done with return value as payload
    // @Action({ commit: 'decrement' })
    // public async decr() {
    //     return 3;
    // }
    //
    // @Mutation    ·
    // private decrement(delta: number) {
    //     console.log('delta', delta);
    //     this.count -= delta;
    // }

    @Action
    public async getDate(data: any) {
        //本质上需要调用这个异步函数
        //exampleRequest函数返回this.post('12321', data)，this.post方法返回
        //exampleRequest.getFormdata(data)返回
        return getFormatResult(await exampleRequest.getFormdata(data));
    }
}