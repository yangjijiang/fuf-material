<template>
  <div>
    <h1>权限控制（全局指命、命局函数）</h1>
    <div>
      假设从后端获取的权限列表数据为：permissions = { roles: ['system-admin'], permissions: ['A:B:*', 'C:*:update', 'D:*:delete,view,update'] }
    </div>
    <h3>角色控制：</h3>
    <div v-hasRole="'system-admin'">v-hasRole</div>
    <div v-lacksRole="'system'">v-lacksRole</div>
    <div v-hasAnyRoles="'system,admin,system-admin'">v-hasAnyRoles</div>
    <div v-lacksAnyRoles="'system,admin'">v-lacksAnyRoles</div>
    <div v-hasAllRoles="'system-admin'">v-hasAllRoles</div>

    <h3>资源控制：</h3>
    <div v-hasPermission="'A:B:C'">v-hasPermission</div>
    <div v-lacksPermission="'A:C'">v-lacksPermission</div>
    <div v-hasAnyPermissions="'E:F,C:D:update'">v-hasAnyPermissions</div>
    <div v-lacksAnyPermissions="'E:F,C:D:delete'">v-lacksAnyPermissions</div>
    <div v-hasAllPermissions="'A:B:C,C:D:E:update'">v-hasAllPermissions</div>
    <hr />

    <h3>对应控制指命 的 控制函数：</h3>
    <div v-if="hasRole">$hasRole</div>
    <div v-if="lacksRole">$lacksRole</div>
    <div v-if="hasAnyRoles">$hasAnyRoles</div>
    <div v-if="lacksAnyRoles">$lacksAnyRoles</div>
    <div v-if="hasAllRoles">$hasAllRoles</div>
    <div v-if="hasPermission">$hasPermission</div>
    <div v-if="lacksPermission">$lacksPermission</div>
    <div v-if="hasAnyPermissions">$hasAnyPermissions</div>
    <div v-if="lacksAnyPermissions">$lacksAnyPermissions</div>
    <div v-if="hasAllPermissions">$hasAllPermissions</div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        hasRole: false,
        lacksRole: false,
        hasAnyRoles: false,
        lacksAnyRoles:false,
        hasAllRoles:false,
        hasPermission:false,
        lacksPermission:false,
        hasAnyPermissions:false,
        lacksAnyPermissions:false,
        hasAllPermissions:false
      }
    },
    mounted() {
      // 命局函数权限控制
      if(this.$hasRole('system-admin')) {
        this.hasRole = true
      }
      if(this.$lacksRole('system')) {
        this.lacksRole = true
      }
      if(this.$hasAnyRoles('system,admin,system-admin')) {
        this.hasAnyRoles = true
      }
      if(this.$lacksAnyRoles('system,admin')) {
        this.lacksAnyRoles = true
      }
      if(this.$hasAllRoles('system-admin')) {
        this.hasAllRoles = true
      }
      if(this.$hasPermission('A:B:C')) {
        this.hasPermission = true
      }
      if(this.$lacksPermission('A:C')) {
        this.lacksPermission = true
      }
      if(this.$hasAnyPermissions('E:F,C:D:update')) {
        this.hasAnyPermissions = true
      }
      if(this.$lacksAnyPermissions('E:F,C:D:delete')) {
        this.lacksAnyPermissions = true
      }
      if(this.$hasAllPermissions('A:B:C,C:D:E:update')) {
        this.hasAllPermissions = true
      }
    }
  }
</script>
