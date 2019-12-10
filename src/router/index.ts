import Vue from 'vue'
import VueRouter from 'vue-router'
import {indexRoute} from "@/router/index/IndexRoute";

Vue.use(VueRouter);

const routes = [];
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any) {
    // @ts-ignore
    return routerPush.call(this, location).catch((error: any) => error)
}
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/index',
        },
        indexRoute
    ]
});

export default router;
