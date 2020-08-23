import Vue from 'vue'
import App from './App.vue'
//define o gerenciamento por rotas
import router from './router'
import Vue_Resource from "vue-resource";

Vue.config.productionTip = false

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(Vue_Resource);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
