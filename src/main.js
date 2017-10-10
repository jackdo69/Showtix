import Vue from 'vue'
import VueFire from 'vuefire'
import Auth from './data/Auth'
import App from './App'
import VueRouter from 'vue-router'
import AuthPage from './components/pages/Auth'
import Home from './components/pages/Home'
import EventDetail from './components/pages/EventDetail'
import UserDetail from './components/pages/User'
import Index from './components/events/Index'
import VeeValidate from 'vee-validate';
import * as firebase from "firebase";
import checkAuth from './data/checkAuth'
import printOrder from './components/pages/printOrder'


Vue.use(VueFire)
Vue.use(VeeValidate)
Vue.use(VueRouter)

const router = new VueRouter({
	mode : 'history',
	routes : [
		{
			name : 'index',
			path : '',
			component : Home
		},
		{
			name : 'home',
			path : '/home',
			component : Home
		},
		{
			name : 'auth',
			path : '/auth',
			component : AuthPage
		},
		{
			name : '/eventDetail/:id',
			path : '/eventDetail/:id',
			component : EventDetail
		},
		{
			name : '/user',
			path : '/user',
			component : UserDetail,
			meta: { requiresAuth: true }
		},
		{
			name : '/printOrder/:id',
			path : '/printOrder/:id',
			component : printOrder
		},
		{
			name : 'event_manager',
			path : '/eventManager',
			component : Index,
			meta: { requiresAuth: true }
		}
	]
})


router.beforeEach((to, from, next) => {
    console.log("checkAuth():");
    firebase.auth().onAuthStateChanged(function(user) {
        if (to.matched.some(record => record.meta.requiresAuth) && !user &&!checkAuth.isAdmin(user.email)) {
            next({ path: '/auth', query: { redirect: to.fullPath }});
          } else {
            next();
          }
      });

})


new Vue({
	el : '#app',
	template : '<App/>',
	components : {
		App
	},
	router : router
})
