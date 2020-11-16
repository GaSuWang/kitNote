import Vue from 'vue'
import App from './App.vue'
import VCalendar from 'v-calendar'
import vueMoment from 'vue-moment'

Vue.config.productionTip = false
Vue.use(VCalendar);
Vue.use(vueMoment);
window.Kakao.init("e771531e4a0e8cdfe128bb2363280a74")
new Vue({
  render: h => h(App),
}).$mount('#app')
