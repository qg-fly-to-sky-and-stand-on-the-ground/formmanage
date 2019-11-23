import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import {getFormatResult} from "@/utils/format";
import {exampleRequest} from "@/api/ExampleRequest";
@Module({name: 'Auth', namespaced: true, stateFactory: true})
export default class Auth extends VuexModule {
    public count = 12;
    get getCount() {
        return this.count;
    }

    // action 'decr' commits mutation 'decrement' when done with return value as payload
    @Action({ commit: 'decrement' })
    public async decr() {
        return 3;
    }

    @Mutation
    private decrement(delta: number) {
        console.log('delta', delta);
        this.count -= delta;
    }

    @Action
    public async abc(data: any) {

        return getFormatResult(await exampleRequest.字段增删查改(data));
    }
}