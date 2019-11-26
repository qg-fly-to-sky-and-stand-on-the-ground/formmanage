
<style lang="scss" scoped>
    @import "scss/mixin";
    .group-container {
        width: 1528px;
        height: 840px;
        margin: auto;
        margin-top: 24px;
        background-color: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        opacity: 1;
        border-radius: 8px;
    }

    .group-title {
        height: 70px;
        width: 100%;
    }

    .group-name {
        display: inline-block;
        height: 68px;
        width: 250px;
        vertical-align: top;
        border-right: 2px solid rgba(245, 245, 245, 1);
        border-bottom: 2px solid rgba(245, 245, 245, 1);
        line-height: 68px;
        font-size: 23px;
    }

    .group-operate {
        display: inline-block;
        height: 68px;
        width: 399px;
        vertical-align: top;
        border-right: 2px solid rgba(245, 245, 245, 1);
        border-bottom: 2px solid rgba(245, 245, 245, 1);
        line-height: 68px;
        font-size: 23px;
    }

    .group-type {
        display: inline-block;
        height: 68px;
        width: 250px;
        vertical-align: top;
        border-right: 2px solid rgba(245, 245, 245, 1);
        border-bottom: 2px solid rgba(245, 245, 245, 1);
        line-height: 68px;
        font-size: 23px;
    }
    .group-feild {
        display: inline-block;
        height: 68px;
        width: 600px;
        vertical-align: top;
        border-right: 2px solid rgba(245, 245, 245, 1);
        border-bottom: 2px solid rgba(245, 245, 245, 1);
        line-height: 68px;
        font-size: 23px;

        p {
            display: inline-block;
            width: 90%;
        }

        img {
            display: inline-block;
            height: 30px;
            width: 30px;
        }
    }

    .group-content-operate {
        width: 365px;
    }


</style>

<template>
    <div class="group-contanier">
        <div class="group-title">
            <div class="group-name">群组名</div>
            <div class="group-type">类型</div>
            <div class="group-feild">所含字段</div>
            <div class="group-operate">操作</div>
        </div>
        <div class="group-title" v-for="(value, key) in groupType" :key="key">
            <div class="group-name">{{key}}</div>
            <div class="group-type">{{value.member[0].type}}</div>
            <div class="group-feild">
                <p>name, key, word</p>
                <img src="../../../assets/groupEdit.png">
            </div>
            <div class="group-operate">diao1</div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component';
    import store from '@/store';
    import {getModule} from 'vuex-module-decorators';
    import Auth from '@/store/modules/FiledManage'

    const auth = getModule(Auth, store);


    @Component({
        components: {

        }
    })
    export default class group extends Vue {
        data: object = {
            "form":{
                "id":"ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95" // 参看表单中获取 demo可用 ae8a7da6-d7ed-4aac-bc45-1e6dd528fa95
            },
        }
        groupList: Array<object> = [

        ];
        //用来装分组group
        groupType: any = {}
        temp: any = null;

        Group() {
            for (let i = 0; i < this.groupList.length; i++) {
                this.temp = this.groupList[i]

                if(this.temp.group == null) {
                    this.groupType.single = {groupName: "single", member: []}
                    this.groupType.single.member.push(this.temp)
                    continue
                } else if(!(this.temp.group in this.groupType)) {
                    this.groupType[this.temp.group] = {groupName: this.temp.group, member: []}
                }

                this.groupType[this.temp.group].member.push(this.temp)
            }
        }

        mounted() {
            auth.getFormData(this.data).then((res: any) => {
                console.log(res.data)
                this.groupList = res.data.constraintList
                this.Group()
                console.log(this.groupType)
        })
            // this.Group()
            // console.log(this.groupType)

        }


    }
</script>