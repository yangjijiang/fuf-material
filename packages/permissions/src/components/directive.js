/**
 * 新增VUE全局指命（用于控制资源权限）
 */
import Vue from 'vue'
import { core, getPermissions } from './core'

/**
 * 判断角色权限
 * （使用方法 v-hasRole="'system'"）
 */
Vue.directive('hasRole', {
  bind: async (el, binding) => {
    try {
      const name = binding.value ? binding.value : binding.expression
      const promise = new Promise(resolve => {
        const permissions = getPermissions()
        resolve(((permissions && permissions['roles']) || []).includes(name))
      })
      if (!await promise) {
        el.parentNode.removeChild(el)
      }
    } catch (e) {
      el.parentNode.removeChild(el)
      console.warn('** v-hasRole **', e)
    }
  }
})

/**
 * 判断角色权限与hasRole逻辑相反
 * （使用方法 v-lacksRole="'system'"）
 */
Vue.directive('lacksRole', {
  bind: async (el, binding) => {
    try {
      const name = binding.value ? binding.value : binding.expression
      const promise = new Promise(resolve => {
        const permissions = getPermissions()
        resolve(((permissions && permissions['roles']) || []).includes(name))
      })
      if (await promise) {
        el.parentNode.removeChild(el)
      }
    } catch (e) {
      el.parentNode.removeChild(el)
      console.warn('** v-lacksRole **', e)
    }
  }
})

/**
 * 验证当前用户是否属于以下任意一个角色
 * （使用方法 v-hasAnyRoles="'system,administrator,developer'"）
 */
Vue.directive('hasAnyRoles', {
  bind: async (el, binding) => {
    try {
      const name = binding.value ? binding.value : binding.expression
      const names = name.split(',')
      const promise = new Promise(resolve => {
        let permissions = getPermissions()
        permissions = ((permissions && permissions['roles']) || [])
        resolve(names.filter(v => permissions.includes(v)).length > 0)
      })
      if (!await promise) {
        el.parentNode.removeChild(el)
      }
    } catch (e) {
      el.parentNode.removeChild(el)
      console.warn('** v-hasAnyRoles **', e)
    }
  }
})

/**
 * 验证当前用户是否不属于以下任意一个角色与hasAnyRoles逻辑相反
 * （使用方法 v-lacksAnyRoles="'system,administrator,developer'"）
 */
Vue.directive('lacksAnyRoles', {
  bind: async (el, binding) => {
    try {
      const name = binding.value ? binding.value : binding.expression
      const names = name.split(',')
      const promise = new Promise(resolve => {
        let permissions = getPermissions()
        permissions = ((permissions && permissions['roles']) || [])
        resolve(names.filter(v => permissions.includes(v)).length === 0)
      })
      if (!await promise) {
        el.parentNode.removeChild(el)
      }
    } catch (e) {
      el.parentNode.removeChild(el)
      console.warn('** v-lacksAnyRoles **', e)
    }
  }
})

/**
 * 验证当前用户是否同时满足以下所有角色
 * （使用方法 v-hasAllRoles="'system,administrator,developer'"）
 */
Vue.directive('hasAllRoles', {
  bind: async (el, binding) => {
    try {
      const name = binding.value ? binding.value : binding.expression
      const names = name.split(',')
      const promise = new Promise(resolve => {
        let permissions = getPermissions()
        permissions = ((permissions && permissions['roles']) || [])
        resolve(names.filter(v => permissions.includes(v)).length === names.length)
      })
      if (!await promise) {
        el.parentNode.removeChild(el)
      }
    } catch (e) {
      el.parentNode.removeChild(el)
      console.warn('** v-hasAllRoles **', e)
    }
  }
})

/**
 * 判断资源权限
 * （使用方法 v-hasPermission="'A:B:*'"）
 */
Vue.directive('hasPermission', {
  bind: async (el, binding) => {
    try {
      const name = binding.value ? binding.value : binding.expression
      const promise = new Promise(resolve => {
        resolve(core(name))
      })
      if (!await promise) {
        el.parentNode.removeChild(el)
      }
    } catch (e) {
      el.parentNode.removeChild(el)
      console.warn('** v-hasPermission **', e)
    }
  }
})

/**
 * 判断资源权限与hasPermission逻辑相反
 * （使用方法 v-lacksPermission="'A:B:*'"）
 */
Vue.directive('lacksPermission', {
  bind: async (el, binding) => {
    try {
      const name = binding.value ? binding.value : binding.expression
      const promise = new Promise(resolve => {
        resolve(core(name))
      })
      if (await promise) {
        el.parentNode.removeChild(el)
      }
    } catch (e) {
      el.parentNode.removeChild(el)
      console.warn('** v-lacksPermission **', e)
    }
  }
})

/**
 * 验证当前用户是否属于以下任意一个资源
 * （使用方法 v-hasAnyPermissions="'role:create,user:create:*'"）
 */
Vue.directive('hasAnyPermissions', {
  bind: async (el, binding) => {
    try {
      const name = binding.value ? binding.value : binding.expression
      const names = name.split(',')
      const promise = new Promise(resolve => {
        resolve(names.filter(v => core(v)).length > 0)
      })
      if (!await promise) {
        el.parentNode.removeChild(el)
      }
    } catch (e) {
      el.parentNode.removeChild(el)
      console.warn('** v-hasAnyPermissions **', e)
    }
  }
})

/**
 *  验证当前用户是否不属于以下任意一个资源与hasAnyPermissions逻辑相反
 *  （使用方法 v-lacksAnyPermissions="'role:create,user:create:*'"）
 */
Vue.directive('lacksAnyPermissions', {
  bind: async (el, binding) => {
    try {
      const name = binding.value ? binding.value : binding.expression
      const names = name.split(',')
      const promise = new Promise(resolve => {
        resolve(names.filter(v => core(v)).length === 0)
      })
      if (!await promise) {
        el.parentNode.removeChild(el)
      }
    } catch (e) {
      el.parentNode.removeChild(el)
      console.warn('** v-lacksAnyPermissions **', e)
    }
  }
})

/**
 * 验证当前用户是否同时满足以下所有资源
 * （使用方法 v-hasAllPermissions="'role:create,user:create:*'"）
 */
Vue.directive('hasAllPermissions', {
  bind: async (el, binding) => {
    try {
      const name = binding.value ? binding.value : binding.expression
      const names = name.split(',')
      const promise = new Promise(resolve => {
        resolve(names.filter(v => core(v)).length === names.length)
      })
      if (!await promise) {
        el.parentNode.removeChild(el)
      }
    } catch (e) {
      el.parentNode.removeChild(el)
      console.warn('** v-hasAllPermissions **', e)
    }
  }
})
