import {RouteConfig} from "vue-router";
import Layout from "@/views/layout/Layout.vue";
import formConstraint from "@/components/formConstraint/formConstraint.vue";

export const indexRoute: RouteConfig = {
    name: 'layout',
    path: '/index',
    component: Layout,
    // redirect: '',
    children: [
        {
            path: 'formConstraint',
            name: 'formConstraint',
            component: formConstraint,
        },
    ]
};
