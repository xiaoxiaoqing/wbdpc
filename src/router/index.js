import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import Home from '@/components/common/Home'
import Dashboard from '@/components/page/Dashboard.vue'//系统首页消息处理中心
import Promanage from '@/components/page/Promanage.vue'//项目管理
import Userinfo from '@/components/page/Userinfo.vue'//人员信息
import Grade from '@/components/page/Grade.vue'
import Task from '@/components/page/Task.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta:{title:'自述文件'},
      children:[
        {
          path: '/dashboard',
          component:Dashboard,
          meta: { title: '系统首页' }
        },
        {
          path: '/promanage',
          component: Promanage,
          meta: { title: '项目列表' }
        },
        {
          path: '/userinfo',
          component: Userinfo,
          meta: { title: '人员信息' }
        },
        {
          path: '/grade',
          component: Grade,
          meta: { title: '评级信息' }
        },
        {
          path: '/task',
          component: Task,
          meta: { title: '任务分配' }
        },
      ]
    },{
      path:'/login',
      name:'Login',
      component:Login,
      meta: { title: '登录' }
    }
  ]
})
