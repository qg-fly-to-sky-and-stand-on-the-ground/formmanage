import Vue from 'vue'
import VueRouter from 'vue-router'
import { indexRoute } from "@/router/index/IndexRoute";

Vue.use(VueRouter);

const routes = [
];

const router = new VueRouter({
    routes: [
        indexRoute
    ]
});

export default router;
