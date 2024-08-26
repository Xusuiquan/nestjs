# nestjs

创建数据库testdb
数据服务器地址：43.139.229.15
端口号: 3306
账号: root
密码: 123456

- 实现注册功能
- 新增权限守卫
  npm install @nestjs/passport passport passport-jwt
- 新增策略jwt认证，结合权限守卫
  权限和认证是相互独立的，但是权限需要依赖认证机制