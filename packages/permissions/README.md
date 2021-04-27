# `permissions`
> 权限控制
```
前端权限控制提供了一系列全局指命、命局函数，它可方便对HTML-Dom元素与Js-代码片段进行权限控制。它遵循Apache Shiro权限规则判断模型。
```

## 显示效果
![alt text](https://raw.githubusercontent.com/yangjijiang/fuf-material/master/assets/permissions/main.jpg "Logo Title Text 1")


## API
```
在应用程序入口文件（main.js）中引入权限模块，它会自动完成全局注册。

步骤：
1、main.js引入 
   import './components/permissions'

2、从后端接口获取权限列表数据 并 将列表存入 window.sessionStorage 中
   window.sessionStorage.setItem('permissions',  JSON.stringify({
       roles: ['system-admin'],
       permissions: ['A:B:*', 'C:*:update']
   }))

```
