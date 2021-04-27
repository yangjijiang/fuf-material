import Vue from 'vue'
import App from './App'

// 加载权限控制模块
import './components/permissions'
// 假设从后端获取的权限列表数据为
window.sessionStorage.setItem('permissions',  JSON.stringify({
    roles: ['system-admin'],
    permissions: ['A:B:*', 'C:*:update']
}))

new Vue({
    render: h => h(App)
}).$mount('#app')
