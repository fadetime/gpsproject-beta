import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		token: '',
		language: 'en'
	},
	mutations: {
		setToken:(state , item) => {
			state.token = item
		},
		setLanguage:(state , item) => {
			console.log(item)
			state.language = item
		}
	},
	actions: {
		setToken: ({ commit }, item) => {
			commit('setToken', item)
		},
		setLanguage: ({ commit }, item) => {
			commit('setLanguage', item)
		}
	}
})
