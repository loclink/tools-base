# ToolsBase

> 一个构建`javascript`工具库的起手式开发模板。轻而易举造轮子，我们不生产轮子，我们只是轮子的搬运工。

## 安装:

请使用`locilc`脚手架工具构建模板：

``` shell
npm install locilc -g
lic create my-utils
```

![locilc02](https://tva1.sinaimg.cn/large/0087ufIQgy1h46jyu4x7eg30jd0bpdm7.gif)

使用`lic create <project>`指令进入创建选项，创建时请选择`tools-base`模板，创建过程需要输入一个`UMD`模块的全局对象名称，作为`cdn`方式引入时的全局对象来使用，名称若存在多个单词，推荐使用大驼峰命名，例如: `CandyBag` 请遵循变量的命名规范来命名`UMD`模块名称。

如需了解`locilc`其他相关操作请查阅：https://github.com/loclink/locilc。

在项目创建完成后，如需修改`UMD`名称，则可以自行编辑`tools.config.json`文件对`umdName`属性进行修改：

``` json
{
  "umdName":"myUtils"
}
```



## 目录结构:

``` shell
.
├── index.d.ts  # 类型声明文件
├── package.json # 项目配置文件
├── readme.md # 项目描述文件
├── rollup.config.ts # rollup打包配置文件
├── src # 工具库核心代码
│   ├── index.ts # 打包入口文件，所有的方法都应从此文件统一导出
│   └── modules # 所有的模块放于此文件夹下方便区分和管理
│       ├── higher # 高阶函数类型的工具函数放于此
│       │   ├── debounce.ts # 内置的防抖函数
│       │   └── throttle.ts # 内置的节流函数
│       └── string # 处理string的工具函数放于此
│           └── format.ts # 格式化方法 - 内置一个字符串首字母转大写的工具函数
├── tools.config.json # tools-base的配置文件 - 目前仅支持配置 umdName
└── tsconfig.json # ts配置文件
```

项目构建之初将内置三个工具函数`debounce`(防抖) `throttle`(节流) `firstUpperCase`(首字母转大写)，具体内容查看`modules`文件夹下所有包含的文件。



## 约定:

1. 模块要求使用`typescript`来开发你的工具库，并使用`ES6 module`的导入导出方式，即：`import ... from ...` 和 `export`。
2. 所有方法必须统一从`src/index.ts`下导出。
2. 请利用`typescript`的优势，多使用类型声明。这将使你的库具备良好的语法智能提示，以及类型检测。



## 体验:

- 体验一下基于`tools-base`而开发的工具库`candy-bag`

``` shell
npm install candy-bag
```

- 使用`Commonjs`方式导入：

``` js
const { firstUpperCase } = require('candy-bag');
console.log(firstUpperCase('hello')) // Hello
```

- 使用`ES6 module`方式导入：

``` js
import { firstUpperCase } from 'candy-bag'
console.log(firstUpperCase('hello')) // Hello
```

- 在`html`文件中使用`cdn`方式导入：

``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <!-- 通过cdn方式引入全局对象：CandyBag -->
  <script src="https://cdn.jsdelivr.net/npm/candy-bag"></script>
  <script>
    console.log(CandyBag.firstUpperCase('hello')) // Hello
  </script>
</body>
</html>
```

想了解更多有关`candy-bag`的内容： https://github.com/loclink/candy-bag



## 快速开始：

默认情况下，`tools-base`的使用无需修改任何配置，按照约定的规则即可快速开发工具库，如果你使用了第三方库，例如你的工具库中依赖`lodash`，并且不希望在打包时将`loaash`打包至自己的库中，希望用户在使用时自行安装`lodash`，那么你可以在`rollup.config.ts`配置文件中找到：`external`配置项，并且配置为：`external: ['lodash'],`该配置可配置多个第三方依赖库。

### 1. 编写工具函数：

![image](https://tva1.sinaimg.cn/large/0087ufIQgy1h46kp331qkj30nk0gzgqz.jpg)



### 2. 导出函数：

![image](https://tva3.sinaimg.cn/large/0087ufIQgy1h46kqt6ys6j30t70gzafl.jpg)



### 3. cdn全局对象名称：

`umd`模块必须拥有一个全局对象，您可以通过修改`tools.config.json`中的`umdName`属性配置全局对象名称。

### 1.  打包：

打包操作会将你编写的工具库核心代码打包至`dist`文件夹下，并按照模块类型区分文件名：

打包指令：

```  shell
npm run build
```

打包输出后的文件目录结构：

``` shell
├── dist
│   ├── projectName.js # cjs 模块格式的文件
│   ├── projectName.cjs.min.js # cjs 格式压缩后的文件
│   ├── projectName.esm.js # ESM 模块格式的文件
│   ├── projectName.esm.min.js # ESM 模块压缩后的文件
│   ├── projectName.js # umd 模块格式文件 
│   ├── projectName.min.js # umd 模块格式压缩文件
│   ├── package.json # 项目配置文件
│   ├── readme.md  # 描述文件
│   ├── rollup.config.d.ts 
│   └── src # 工具库的类型声明文件放于此文件夹内
│       ├── index.d.ts 
│       └── modules
│           ├── higher
│           │   ├── debounce.d.ts
│           │   └── throttle.d.ts
│           └── string
│               └── format.d.ts
```

打包后你将得到一个完整的库文件，并覆盖所有模块类型。

通过查看`package.json`文件我们可以看到：

| 属性     | 值                     | 说明                                    |
| -------- | ---------------------- | --------------------------------------- |
| main     | projectName.cjs.min.js | 入口函数的文件， cjs 版本打包后的文件名 |
| module   | projectName.esm.min.js | esm 版本打包后的文件名                  |
| umd:mian | projectName.js         | umd 版本打包后的文件名                  |
| jsdelivr | projectName.min.js     | jsdelivr cdn 默认加载文件               |



### 2.  发布：

发布之前最好先编写`readme.md`项目描述文件，然后使用`npm login`指令登录至仓库服务器，再使用指令：

``` shell
npm run release
```

该命令将会自动帮您把`dist`打包文件夹作为库发布至您的`npm`仓库中。发布成功之后您就可以在项目中使用 `npm install <packageName>`命令安装至项目或使用`cdn`的方式引入并使用了。

发布后通过`cdn`引入方式可使用该地址：`https://cdn.jsdelivr.net/npm/包名称`

使用 `purge.jsdelivr.net/npm/` 包名称/可刷新`cdn`缓存。
