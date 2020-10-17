## React + Antd 打造在线商城管理系统

### Usage

```js
// 安装依赖
yarn install

// 运行
yarn run start

// 登录账号和密码
admin	admin
```
### 服务器端

与该项目对接的服务器端 API 接口使用`express + mongodb`实现。

后端项目传送地址：[server](https://github.com/root-lucas/admin-backend-server)

[服务端API接口使用文档](https://github.com/root-lucas/admin-backend-server/blob/master/api使用文档.md)

### 功能实现目录

-   [x] 项目搭建，安装插件需要的插件
-   [x] 页面和目录搭建
-   [x] 编写路由文件
-   [x] 管理后台页面框架搭建
-   [x] 管理后台列表页面搭建
-   [x] 管理后台表单页面搭建
-   [x] 退出和登录页面开发
-   [x] 登录判断
-   [x] 使用 axios 对接服务器端 api 接口
-   [x] 网络请求封装
-   [x] 列表数据接口对接
-   [x] 数据新增功能实现
-   [x] 数据修改功能实现
-   [x] 数据删除功能实现
-   [x] 表单功能完善-图片上传
-   [x] 使用 redux 优化用户登录逻辑
-   [x] 完善通知中心内容
-   [x] 完善 dashboard 页面样式

### 项目中使用到的其他插件

项目中使用到的插件列出如下

```bash
antd 			    #UI组件4.xx版本
react-router-dom     #路由
rudex			    #redux核心库
react-redux          #react中集成redux的插件
redux-thunk          #redux插件
axios                #网络请求
braft-editor         #富文本编辑器
```