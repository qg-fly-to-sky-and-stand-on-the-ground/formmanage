
<style lang="scss" scoped>
    @import "scss/mixin";
    .group-container {
        width: 1528px;
        height: auto;
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
        width: 420px;
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
        <div class="group-title" v-for="(dataList, index) in constraintList" :key="index">
            <div class="group-name">{{dataList.group}}</div>
            <div class="group-type">{{dataList.type}}</div>
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


    @Component({
        components: {

        }
    })
    export default class group extends Vue {
        constraintList: Array<object> = [
            {
                "nameEn":"NSRMC",
                "nameCh":"纳税人名称",
                "des":"纳税人的名称",
                "type":"SINGLE_COLUMN",
                "length":"0-10",
                "defaultValue":"100",
                "group":"MX",
                "regularExpression":"xxx"
            },
            {
                "nameEn":"NSRMC",
                "nameCh":"纳税人名称",
                "des":"纳税人的名称",
                "type":"SINGLE_COLUMN",
                "length":"0-10",
                "defaultValue":"100",
                "group":"MX",
                "regularExpression":"xxx"
            },
            {
                "nameEn":"NSRMC",
                "nameCh":"纳税人名称",
                "des":"纳税人的名称",
                "type":"SINGLE_COLUMN",
                "length":"0-10",
                "defaultValue":"100",
                "group":"MX",
                "regularExpression":"xxx"
            },
        ];
        groupMap = new Map();

        Group() {
            for (let i = 0; i < this.constraintList.length; i++) {
                // this.groupMap.set(toString(this.constraintList[i].group), this.constraintList[i])
            }
        }


    }
</script>