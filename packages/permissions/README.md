# `permissions`
> 权限控制
```
前端权限控制提供了一系列全局指命、命局函数，它可方便对HTML-Dom元素与Js-代码片段进行权限控制。它遵循Apache Shiro权限规则判断模型。
```

## 显示效果
![alt text](https://raw.githubusercontent.com/yangjijiang/fuf-material/master/assets/permissions/main.jpg "Logo Title Text 1")


## API
```
权限控制全局指令与全局函数：
>> 全局指令:
    v-hasRole="'system-admin'"                         //判断角色权限
    v-lacksRole="'system'"                             //判断角色权限与v-hasRole逻辑相反
    v-hasAnyRoles="'system,administrator,developer'"   //验证当前用户是否属于以下任意一个角色
    v-lacksAnyRoles="'system,administrator,developer'" //验证当前用户是否不属于以下任意一个角色与v-hasAnyRoles逻辑相反
    v-hasAllRoles="''system,administrator,developer''" //验证当前用户是否同时满足以下所有角色
    v-hasPermission="'A:B:*'"                          //判断资源权限
    v-lacksPermission="'user:*'"                       //判断资源权限与v-hasPermission逻辑相反
    v-hasAnyPermissions="'role:create,user:create:*'"  //验证当前用户是否属于以下任意一个资源
    v-lacksAnyPermissions="'role:create,user:create:*'"//验证当前用户是否不属于以下任意一个资源与hasAnyPermissions逻辑相反
    v-hasAllPermissions="'role:create,user:create:*'"  //验证当前用户是否同时满足以下所有资源  
>> 全局函数:
    $hasRole('sysadmin')
    $lacksRole('system')
    $hasAnyRoles('system,administrator,developer')
    $lacksAnyRoles('system,administrator,developer')
    $hasAllRoles('system,administrator,developer')
    $hasPermission('user:*')
    $lacksPermission('user:*')
    $hasAnyPermissions('role:create,user:create:*)
    $lacksAnyPermissions('role:create,user:create:*')
    $hasAllPermissions('role:create,user:create:*')

在应用程序入口文件（main.js）中引入权限模块，它会自动完成全局注册。
步骤：main.js文件中
1、引入权限模块
   import './components/permissions'

2、从后端接口获取权限列表数据 并 将列表存入 window.sessionStorage 中
   window.sessionStorage.setItem('permissions',  JSON.stringify({
       roles: ['system-admin'],
       permissions: ['A:B:*', 'C:*:update']
   }))
```
