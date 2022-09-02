import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import typescript from 'rollup-plugin-typescript2'
import json from '@rollup/plugin-json'
import { babel } from '@rollup/plugin-babel'
import autoExternal from 'rollup-plugin-auto-external'
import bundleSize from 'rollup-plugin-bundle-size'

import * as lib from './package.json'

const outputFileName = 'index'
const name = 'heseya-sdk'
const input = './src/index.ts'

const buildConfig = ({ es5, browser = true, minifiedVersion = true, ...config }) => {
  const build = ({ minified }) => ({
    input,
    ...config,
    output: {
      ...config.output,
      file: `${config.output.file}.${minified ? 'min.js' : 'js'}`,
    },
    plugins: [
      typescript({
        tsconfig: 'tsconfig.prod.json',
      }),
      json(),
      resolve({ browser }),
      commonjs(),
      minified && terser(),
      minified && bundleSize(),
      ...(es5
        ? [
            babel({
              babelHelpers: 'bundled',
              presets: ['@babel/preset-env'],
            }),
          ]
        : []),
      ...(config.plugins || []),
    ],
  })

  const configs = [build({ minified: false })]

  if (minifiedVersion) {
    configs.push(build({ minified: true }))
  }

  return configs
}

export default async () => {
  const year = new Date().getFullYear()
  const banner = `// Heseya SDK v${lib.version} Copyright (c) ${year} ${lib.author} and contributors`

  return [
    ...buildConfig({
      es5: true,
      output: {
        file: `dist/${outputFileName}`,
        name,
        format: 'umd',
        exports: 'named',
        banner,
      },
    }),

    ...buildConfig({
      output: {
        file: `dist/esm/${outputFileName}`,
        format: 'esm',
        preferConst: true,
        exports: 'named',
        banner,
      },
    }),
    // Node.js commonjs build
    {
      input,
      output: {
        file: `dist/node/${outputFileName}.cjs`,
        format: 'cjs',
        preferConst: true,
        exports: 'named',
        banner,
      },
      plugins: [
        typescript({
          tsconfig: 'tsconfig.prod.json',
        }),
        autoExternal(),
        resolve(),
        commonjs(),
      ],
    },
  ]
}
