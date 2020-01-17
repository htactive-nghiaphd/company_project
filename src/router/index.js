import Vue from 'vue'
import VueRouter from 'vue-router'
import { forgotpassword, resetpassword, confirm, login, register, interfaceAdmin } from '../views'
import { TKHoatdong, newAccont } from '../components'
import thucTap from '../components/intershipTable/intership'
import tienLuong from '../components/tienLuong/saraly_basic'
import cvAplly from '../components/cv_apply/cv_apply'

Vue.use(VueRouter)

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/xacthuc',
    name: 'xacthuc',
    component: confirm
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: forgotpassword
  },
  {
    path: '/resetpassword',
    name: 'resetpassword',
    component: resetpassword
  },
  {
    path: '/interfaceAdmin',
    name: 'interfaceAdmin',
    component: interfaceAdmin,

    children: [
      {
        path: '/TKHoatdong',
        name: 'TKHoatdong',
        component: TKHoatdong
      },
      {
        path: '/thucTap',
        name: 'thucTap',
        component: thucTap
      },
      {
        path: '/tienLuong',
        name: 'tienLuong',
        component: tienLuong
      },
      {
        path: '/cvAplly',
        name: 'cvAplly',
        component: cvAplly
      }
    ]
  },
  {
    path: '/taoTaiKhoan',
    name: 'taoTaiKhoan',
    component: newAccont
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
