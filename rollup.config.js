import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';
const config = require('./tools.config.json')
const pkg = require('./package.json')
export default {
  input: 'lib/index.ts', // 打包入口
  output: {
    // 打包出口
    file: `dist/${pkg.main}`,
    format: 'umd', 
    name: config.umdName, 
    sourcemap: true
  },
  plugins: [
    // 打包插件
    resolve(), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript(), // 解析TypeScript
    babel({ babelHelpers: 'bundled' }) // babel配置,编译es6
  ]
};
