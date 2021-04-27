/**
 * 新增VUE全局函数（用于控制资源权限）
 */
import Vue from 'vue'
import {core, getPermissions} from './core'

Vue.mixin({
  methods: {
    /**
     * 角色权限验证规则（资源名称name值为：'admin'）
     * @param name
     * @returns {boolean}
     */
    $hasRole(name) {
      const permissions = getPermissions()
      return ((permissions && permissions['roles']) || []).includes(name)
    },
    /**
     * 判断角色权限与hasRole逻辑相反
     * @param name
     * @returns {boolean}
     */
    $lacksRole(name) {
      return !this.$hasRole(name)
    },
    /**
     * 验证当前用户是否属于以下任意一个角色（使用方法 $hasAnyRoles="system,administrator,developer"）
     * @param names
     * @returns {boolean}
     */
    $hasAnyRoles(names) {
      names = names.split(',')
      const permissions = getPermissions()
      return names.filter(v => ((permissions && permissions['roles']) || []).includes(v)).length > 0
    },
    /**
     * 验证当前用户是否不属于以下任意一个角色与hasAnyRoles逻辑相反
     * @param names
     * @returns {boolean}
     */
    $lacksAnyRoles(names) {
      names = names.split(',')
      const permissions = getPermissions()
      return names.filter(v => ((permissions && permissions['roles']) || []).includes(v)).length === 0
    },
    /**
     * 验证当前用户是否同时满足以下所有角色
     * @param names
     * @returns {boolean}
     */
    $hasAllRoles(names) {
      names = names.split(',')
      const permissions = getPermissions()
      return names.filter(v => ((permissions && permissions['roles']) || []).includes(v)).length === names.length
    },
    /**
     * 资源权限验证规则（资源名称name值为：'user:modify:usermodify'）
     * @param name
     * @returns {boolean}
     */
    $hasPermission(name) {
      return core(name)
    },
    /**
     * 判断资源权限与hasPermission逻辑相反
     * @param name
     */
    $lacksPermission(name) {
      return !core(name)
    },
    /**
     * 验证当前用户是否属于以下任意一个资源（使用方法 $hasAnyPermissions="role:create,user:create:*"）
     * @param names
     */
    $hasAnyPermissions(names) {
      names = names.split(',')
      return names.filter(v => core(v)).length > 0
    },
    /**
     * 验证当前用户是否不属于以下任意一个资源与hasAnyPermissions逻辑相反
     * @param names
     */
    $lacksAnyPermissions(names) {
      names = names.split(',')
      return names.filter(v => core(v)).length === 0
    },
    /**
     * 验证当前用户是否同时满足以下所有资源
     * @param names
     */
    $hasAllPermissions(names) {
      names = names.split(',')
      return names.filter(v => core(v)).length === names.length
    }
  }
})
