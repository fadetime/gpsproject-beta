import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import DateFilter from '../public/js/dateFilter'
import TimeFilter from '../public/js/timeFilter'

Vue.use(VueMaterial)
Vue.config.productionTip = false
Vue.filter('datefilter',DateFilter)
Vue.filter('timefilter',TimeFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
