import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Times from './views/Times.vue'
import Dirver from './views/Dirver.vue'
import Client from './views/Client.vue'
import Car from './views/Car.vue'
import login from './views/login.vue'
import Admin from './views/Admin.vue'
import Log from './views/Log.vue'
import AuthGuard from './auth-guard'
import Staff from './views/Staff.vue'
import Table from './views/table.vue'
import workStream_home from './views/workStream/workStream_home.vue'
import customerService from './views/customerService.vue'
import Announcement from './views/announcement.vue'
import SearchOrder from './views/SearchOrder.vue'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
			beforeEnter: AuthGuard
		},
		{
			path: '/times',
			name: 'times',
			component: Times,
			beforeEnter: AuthGuard
		},
		{
			path: '/dirver',
			name: 'dirver',
			component: Dirver,
			beforeEnter: AuthGuard
		},
		{
			path: '/client',
			name: 'client',
			component: Client,
			beforeEnter: AuthGuard
		},
		{
			path: '/car',
			name: 'car',
			component: Car,
			beforeEnter: AuthGuard
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/admin',
			name: 'admin',
			component: Admin,
			beforeEnter: AuthGuard
		},
		{
			path: '/log',
			name: 'log',
			component: Log
		},
		{
			path: '/staff',
			name: 'staff',
			component: Staff
		},
		{
			path: '/table',
			name: 'table',
			component: Table
		},
		{
			path: '/searchorder',
			name: 'searchorder',
			component: SearchOrder
		},
		{
			path: '/announcement',
			name: 'announcement',
			component: Announcement
		},
		{
			path: '/customerService',
			name: 'customerService',
			component: customerService
		},
		{
			path: '/workStream_home',
			name: 'workStream_home',
			component: workStream_home
		}
	]
})
