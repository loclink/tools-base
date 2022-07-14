# ToolsBase

> ToolsBase是一个使用typescript而开发的，工具库的起手式基础构建设施。

## 安装:

从该版本开始将不再推荐您使用`git clone`的方式安装本工具，请使用`locilc`脚手架工具安装：

``` shell
npm install locilc -g
lic create my-utils
```

![locilc02](https://tva1.sinaimg.cn/large/0087ufIQgy1h46jyu4x7eg30jd0bpdm7.gif)

使用`lic create <project>`将进入到创建列表选项中，选择`tools-base`将会自动帮助你创建项目并以`<project>`参数作为该项目的名称，选择`tools-base`选项后将会提示输入一个[umd模块](https://github.com/cumt-robin/umd-learning)的全局对象名称，**虽然该脚手架未对 `umdName` 的命名格式进行检测，但还请务必以驼峰或下划线的形式命名，否则在使用过程中会产生语法错误，**`locilc`会自动帮您安装`tools-base`的所属依赖，您无需自己手动操作。

在项目创建完成后你还可以自行编辑`tools.config.json`文件对`umdName`进行修改：

``` json
{
  "umdName":"myUtils"
}
```



## 目录结构:

``` shell
.
├── lib # 核心库 - 您所有的工具函数都应放在此文件夹内
│   ├── index.ts # 入口文件 - 打包程序将此文件作为入口，您的所有方法都应从此文件导出
│   └── utils #工具方法放于此文件夹或其他新建文件夹
│       └── higher-order.ts # 本身自带的两个方法 debounce 和 throttle
├── package.json # 项目配置文件
├── package-lock.json 
├── readme.md # 描述文档
├── rollup.config.js # rollup配置文件
├── tools.config.json # tools-base的配置文件
├── tsconfig.json # ts配置文件
└── yarn.lock
```



## 体验:

`tools-base`本身自带两个方法`debounce`（防抖函数）、throttle（节流函数）并统一从`lib/index.ts`中导出。您可以尝试一下从`tools-base`打包并发布的体验版本，`tools-base`将所有导出的方法打包为`umd`模块，所以您可以使用`Commonjs`、`ESM`、`cdn`这三种方式来引入模块。

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
      const foo = myUtils.debounce(
        () => {
          console.log('foo被执行');
        },500);
      foo();
    </script>
  </body>
</html>

```



## 快速开始：

`tools-base`希望您使用`typescript`来开发您的工具库，这将为您的工具库提供更好的类型检测以及智能提示，所有需要导出的文件都需要放在`lib`文件夹下并通过`export`的方式统一从`index.ts`文件中导出。

### 1. 编写工具函数：

![image](https://tva1.sinaimg.cn/large/0087ufIQgy1h46kp331qkj30nk0gzgqz.jpg)



### 2. 导出函数：

![image](https://tva3.sinaimg.cn/large/0087ufIQgy1h46kqt6ys6j30t70gzafl.jpg)



### 3. cdn全局对象名称：

`umd`模块必须拥有一个全局对象，您可以通过修改`tools.config.json`中的`umdName`属性配置全局对象名称。



### 4. 打包：

打包操作输出至`dist/index.js`自动将其编译为`es5`语法，并生成`.d.ts`类型声明文件。

```  shell
npm run build
```

![tools-base](https://tva3.sinaimg.cn/large/0087ufIQgy1h46kt0ybmbg30t60giqh3.gif)



### 5. 发布：

发布之前您需要先使用`npm login`指令登录至仓库服务器，然后使用：

``` shell
npm run release
```

该命令将会自动帮您把`dist`打包文件夹作为库发布至您的npm仓库中。发布成功之后您就可以在项目中使用 `npm install <packageName>`命令安装至项目或使用cdn的方式引入并使用了。

发布后通过cdn引入方式可使用该地址：`https://cdn.jsdelivr.net/npm/包名称/index.js`

使用`purge.jsdelivr.net/npm/包名称/`可刷新cdn缓存
