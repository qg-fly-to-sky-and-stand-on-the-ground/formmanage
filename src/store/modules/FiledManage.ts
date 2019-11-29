import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import {getResultResData} from "@/utils/shared/formate";
import {exampleRequest} from "@/api/ExampleRequest";
@Module({name: 'Auth', namespaced: true, stateFactory: true})
export default class Auth extends VuexModule {
    constraintList: any = null
    groupType: any = {
    }
    temp: any = null;

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

    //修改群主
    @Action
    public async modifyGroupPropData(data: any) {
        return getResultResData(await exampleRequest.modifyGroupProp(data));
    }

    //存放后台返回的约束列表
    @Mutation
    public setList(list: any[]) {
        this.constraintList = list;
        console.log(this.constraintList)
        for(let i = 0; i < this.constraintList.length; i++) {
            delete this.constraintList[i].multiConstraint
            delete this.constraintList[i].singleConstraint
            delete this.constraintList[i].store
        }
    }

    //存放分类好的群主
    @Mutation
    public setGroup() {
        this.groupType = {}
        for (let i = 0; i < this.constraintList.length; i++) {
            this.temp = this.constraintList[i]

            if(this.temp.group != null) {
                if (!(this.temp.group in this.groupType)) {
                    this.groupType[this.temp.group] = {
                        groupName: this.temp.group,
                        type: this.temp.type,
                        groupString: '',
                        member: []
                    }
                }
                this.groupType[this.temp.group].member.push(this.temp)
                this.groupType[this.temp.group].groupString += this.temp.nameCh + '|'
            }
        }
    }

    //修改群组属性，名称单字段还是多字段
    // @Mutation
    // public async modifyGroupPropData(data: any) {
    //     let saveTemp = null
    //     for(let i in this.groupType) {
    //         console.log(i)
    //         if(i == data.oldName) {
    //             console.log("diaon")
    //             saveTemp = this.groupType[i].member
    //             delete this.groupType[i];
    //             this.groupType[data.name] = {groupName: data.name, member: saveTemp}
    //             for(let j = 0; j < this.groupType[data.name].member.length; j++) {
    //                 this.groupType[data.name].member[j].type = data.type
    //             }
    //             console.log(this.groupType)
    //             break
    //         }
    //     }
    // }
}