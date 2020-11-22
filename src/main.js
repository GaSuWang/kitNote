import Vue from 'vue'
import App from './App.vue'
import VCalendar from 'v-calendar'
import vueMoment from 'vue-moment'

Vue.config.productionTip = false
Vue.use(VCalendar);
Vue.use(vueMoment);
window.Kakao.init("cd0852921402270fba77d26ba5bf56a1")
new Vue({
  render: h => h(App),
}).$mount('#app')
