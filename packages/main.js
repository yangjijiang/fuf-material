import Vue from "vue";
const App = require(`./${process.env.VUE_APP_NAME}/src`).default

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount("#app");
