# ToolsBase

> ToolsBase是一个方便您使用typescript开发个人工具库的基础构建设施。



## 安装:

使用git将构建模板克隆至本地：

``` shell
https://github.com/loclink/tools-base.git
```

安装构建设施所属的依赖：

``` shell
cd tools-base
npm install # 或者使用yarn install
```



## 目录结构:

``` shell
.
├── lib # 核心库 - 您所有的工具函数都应放在此文件夹内
│   ├── index.ts # 入口文件 - 打包程序将此文件作为入口，您的所有方法都应从此文件导出
│   └── utils #工具方法放于此文件夹或其他新建文件夹
│       └── async-tools.ts # 本身自带的两个方法 debounce 和 throttle
├── package.json # 项目配置文件
├── package-lock.json 
├── readme.md # 描述文档
├── rollup.config.js # rollup配置文件
├── tools.config.json # tools-base的配置文件
├── tsconfig.json # ts配置文件
└── yarn.lock
```



## 体验:

> `tools-base`本身自带两个方法`debounce`（防抖函数）、throttle（节流函数）并统一从`lib/index.ts`中导出。您可以尝试一下从`tools-base`打包并发布的体验版本，因为`tools-base`打包输出的模块格式为`umd`，所以您可以使用`Commonjs`、`ESM`、`cdn`这三种导入方式来导入模块。

- 安装体验库`tool-cat`

``` shell
npm install tool-cat
```

- 使用Commonjs方式导入：

``` js
const {debounce} = require('tool-cat');

const foo = debounce(() => {
  console.log('foo 被执行')
}, 300)

foo()
```

- 使用es6-module方式导入：

``` js
import {debounce} from 'tool-cat'

const foo = debounce(() => {
  console.log('foo 被执行')
}, 300)

foo()
```

- 在html文件中使用`cdn`方式导入：

``` html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script src="https://cdn.jsdelivr.net/npm/tool-cat/index.js"></script>
  </head>
  <body>
    <script>
      // 这里通过全局对象utils调用方法
      const foo = utils.debounce(
        () => {
          console.log('foo被执行');
        },500);
      foo();
    </script>
  </body>
</html>

```



## 快速开始：

> 在`tools-base`中请使用`typescript`来开发您的工具库，这将为您的工具库提供更好的类型检测以及智能提示，所有需要导出的文件都需要放在`lib`文件夹下并通过`export`的方式统一从`index.ts`文件中导出。

### 1. 配置cdn全局对象名称：

`umd`模块必须拥有一个全局对象，所以需要您在`tools.config.json`文件中配置该全局对象的名称，默认名称为`utils`:

``` json
{
  "umdName":"utils"
}
```

### 2. 打包：

开发完成后修改`package.json`文件中的`name`选项，作为库的名称，以及`version`选项，用于管理库的版本，然后使用打包命令：

```  shell
npm run build
```

打包后将输出`dist/index.js`自动将其编译为`es5`语法，并生成`.d.ts`类型声明文件。

### 3. 发布：

发布之前您需要先使用`npm login`指令登录至仓库服务器，然后使用：

``` shell
npm run release
```

该命令将会自动帮您把`dist`打包文件夹作为库发布至您的npm仓库中。发布成功之后您就可以在项目中使用 `npm install <packageName>`命令安装至项目或使用cdn的方式引入并使用了。

