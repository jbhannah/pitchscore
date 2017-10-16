import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Backend from '@/components/Backend'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/backend',
      name: 'Backend',
      component: Backend,
      props: true
    }
  ]
})
