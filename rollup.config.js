import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import replace from '@rollup/plugin-replace'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import autoExternal from 'rollup-plugin-auto-external'
import bundleSize from 'rollup-plugin-bundle-size'
import { visualizer } from 'rollup-plugin-visualizer'

import * as lib from './package.json'

const year = new Date().getFullYear()
const banner = `// Heseya SDK v${lib.version} Copyright (c) ${year} ${lib.author.name} and contributors`

const config = {
  input: './src/index.ts',
  inlineDynamicImports: true,
  output: {
    name: 'heseya-sdk',
    sourcemap: !process.env.MINIFY,
    banner,
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
    visualizer(),
  ],
}

if (process.env.MINIFY) {
  config.plugins.push(terser())
  config.plugins.push(bundleSize())
}

export default config
