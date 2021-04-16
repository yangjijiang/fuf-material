import Vue from "vue";
// const App = require(`./${process.env.VUE_APP_NAME}/src`).default
import App from '../src/index'
Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
