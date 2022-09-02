import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import autoExternal from 'rollup-plugin-auto-external'
import bundleSize from 'rollup-plugin-bundle-size'

const config = {
  input: './src/index.ts',
  inlineDynamicImports: true,
  output: {
    name: 'HeseyaStoreCore',
    sourcemap: !process.env.MINIFY,
  },
  external: [],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.prod.json',
    }),
    json(),
    autoExternal(),
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    resolve(),
    replace({
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],
}

if (process.env.MINIFY) {
  config.plugins.push(terser())
  config.plugins.push(bundleSize())
}

export default config
