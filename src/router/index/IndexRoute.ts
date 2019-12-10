import {RouteConfig} from "vue-router";
import Layout from "@/views/layout/Layout.vue";
import formConstraint from "@/components/formConstraint/formConstraint.vue";
import user from "@/components/user/user.vue";
import upLoad from "@/views/upLoad/upLoad.vue";

export const indexRoute: RouteConfig = {
    name: 'layout',
    path: '/index',
    component: Layout,
    redirect: '/index/upLoad',
    children: [
        {
            path: 'formConstraint',
            name: 'formConstraint',
            component: formConstraint,
        },
        {
            path: 'user',
            name: 'user',
            component: user, 
        },
        {
            path: 'upLoad',
            name: 'upLoad',
            component: upLoad,
        }
    ]
};
