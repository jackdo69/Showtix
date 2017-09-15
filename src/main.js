import Vue from 'vue'
import Auth from './data/Auth'
import App from './App'
import VueRouter from 'vue-router'
import AuthPage from './components/pages/Auth'
import Home from './components/pages/Home'
import EventDetail from './components/pages/EventDetail'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: './components/pages/Home',
      component: Home
    },
    {
      name: 'auth',
      path: '/auth',
      component: AuthPage
    },
    {
      name: 'detail',
      path: './components/pages/EventDetail',
      component: Detail
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (Auth.userData) { next() }
  if (to.meta.auth && !Auth.getAuth()) {
    next({name: 'auth'})
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router: router
})
