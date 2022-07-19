# 说明
根据我们的业务抽离出常见的一些图表，封装成组件。基于 Vue2.0 和 echarts 封装的 p-charts 图表组件，只需要统一提供一种对前后端都友好的数据格式设置简单的配置项，便可轻松生成常见的图表。

http://www.bovosz.com/uidemo/index.html#/intro

# 目录说明

```

└ chartDocs // p-charts文档说明网站
└ packages // 不同图表的vue组件，主要是mixin src/util/mixin.js
└ src  // 入口文件
     └ config  // 配置文件
        └ config_.js  // 常用的颜色，变量配置项
     └ images  // 图片
     └ util    // 工具类
        └ mixin.js    // 这个是组件的核心方法
        └ normalChart.js    // 各种图表的配置项目
        └ utils.js    // 一些常用的工具类
     └ index.js    // 入口js
└ babel.config.js       //es6转es5
└ package.json          //npm 包管理文件
└ vue.config.js         //vue config 命令来审查或修改全局的 vue-cli 配置（可选配置）
```