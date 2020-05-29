import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import zhuce from '@/components/zhuce'
import xiugai from '@/components/xiugai'
import create_order from '@/components/create_order'
import myorder from '@/components/myorder'
import upload from '@/components/upload'
import serve from '@/components/serve'
import uploadM from '@/components/uploadM'
import orderM from '@/components/orderM'
import message from '@/components/message'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: home },
    { path: '/login', component: login },
    { path: '/zhuce', component: zhuce },
    { path: '/xiugai', component: xiugai },
    { path: '/create_order', component: create_order },
    { path: '/myorder', component: myorder },
    { path: '/upload', component: upload },
    { path: '/serve', component: serve },
    { path: '/uploadM', component: uploadM },
    { path: '/orderM', component: orderM },
    { path: '/message', component: message },
  ]
})
