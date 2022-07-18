import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const config = require('./tools.config.json');
const pkg = require('./package.json');

export default {
  input: 'src/index.ts', // 打包入口
  output: [
    {
      // cjs打包 - 压缩版
      file: `dist/${pkg.main}`,
      format: 'cjs',
      name: config.umdName,
      sourcemap: false,
      plugins: [terser()]
    },
    {
      // esm打包 - 压缩版
      file: `dist/${pkg.module}`,
      format: 'es',
      name: config.umdName,
      sourcemap: false,
      plugins: [terser()]
    },
    {
      // umd打包 - 压缩版
      file: `dist/${pkg.name}.min.js`,
      format: 'umd',
      name: config.umdName,
      sourcemap: false,
      plugins: [terser()]
    },
    {
      // cjs打包
      file: `dist/${pkg.name}.cjs.js`,
      format: 'cjs',
      name: config.umdName,
      sourcemap: false
    },
    {
      // esm打包
      file: `dist/${pkg.name}.esm.js`,
      format: 'es',
      name: config.umdName,
      sourcemap: false
    },
    {
      // umd打包
      file: `dist/${pkg.name}.js`,
      format: 'umd',
      name: config.umdName,
      sourcemap: false
    }
  ],
  external: [], // 打包时忽略第三方库，例如： ['lodash'] 让rollup打包时不要将lodash一同打包
  plugins: [
    resolve(), // 查找和打包node_modules中的第三方模块
    commonjs(), // 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
    typescript(), // 解析TypeScript
    babel({
      babelHelpers: 'bundled',
      exclude: '/node_modules/**'
    }) // babel配置,编译es6
  ]
};
