import Vue from 'vue'
import App from './App.vue'
import VCalendar from 'v-calendar'
import vueMoment from 'vue-moment'

Vue.config.productionTip = false
Vue.use(VCalendar);
Vue.use(vueMoment);

new Vue({
  render: h => h(App),
}).$mount('#app')
