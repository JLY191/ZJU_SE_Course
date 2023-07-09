# Online_System
软工基第一大组仓库

### 前端文件结构：
├─ public                     # 静态资源<br>
│   ├─ favicon.ico            # favicon图标（网站图标，现在还没有添加<br>
│   └─ index.html             # html模板<br>
├─ src                        # 项目源代码<br>
│   ├─ components             # 放非路由组件<br>
│   ├─ pages                  # 放路由组件<br>
│   ├─ App.js                 # 入口页面<br>
│   └─index.js                # 源码入口<br>
└── package.json              # package.json<br>

### 前端文件组织：
1. 每个组先在 component 和 pages 中创建文件夹 module组号，每个组写的组件就放在对应的文件夹里就可以，自己创建的组件自己使用

### 后端配置：
1. 下载安装 node.js
2. git clone 下本仓库
3. cd backend 进入 backend 文件夹
4. `npm install` 安装依赖 node_modules

### 后端统一：
1. 每个组先在 router 和 router_handler 中创建文件夹 module组号，每个组写的后端文件就放在对应的文件夹里就可以
2. 每个组写的后端 API 前加 /module组号