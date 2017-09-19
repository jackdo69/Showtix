import Vue from 'vue'
import VueFire from 'vuefire'
import Auth from './data/Auth'
import App from './App'
import VueRouter from 'vue-router'
import AuthPage from './components/pages/Auth'
import Home from './components/pages/Home'
import EventDetail from './components/pages/EventDetail'
import Index from './components/events/Index'
import VeeValidate from 'vee-validate';

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
			name : 'event_manager',
			path : '/eventManager',
			component : Index
		}
	]
})

/*router.beforeEach((to, from, next) => {
	if (Auth.userData) {
		next()
	}
	if (to.meta.auth && !Auth.getAuth()) {
		next({
			name : 'auth'
		})
	} else {
		next()
	}
})*/


Vue.prototype.setCookie = (c_name, value, expiredays) => {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

//getCookie
function getCookie(name) {
	var arr,
		reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg))
		return (arr[2]);
	else
		return null;
}
Vue.prototype.getCookie = getCookie;

//delCookie
Vue.prototype.delCookie = (name) => {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval != null)
		document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

new Vue({
	el : '#app',
	template : '<App/>',
	components : {
		App
	},
	router : router
})