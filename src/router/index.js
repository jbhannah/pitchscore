import Vue from 'vue'
import Router from 'vue-router'
import Frontend from '@/components/Frontend'
import Backend from '@/components/Backend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Frontend',
      component: Frontend,
      props: true
    },
    {
      path: '/backend',
      name: 'Backend',
      component: Backend,
      props: true
    }
  ]
})
