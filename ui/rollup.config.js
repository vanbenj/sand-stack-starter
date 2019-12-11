import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import svelte from 'rollup-plugin-svelte'
import { terser } from 'rollup-plugin-terser'
import config from 'sapper/config/rollup.js'
import preprocess from './scss.config.js'
import pkg from './package.json'

// const mode = process.env.NODE_ENV
const mode = 'development'
const dev = mode === 'development'

const onwarn = (warning, onwarn) =>
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  onwarn(warning)
const dedupe = importee =>
  importee === 'svelte' || importee.startsWith('svelte/')

export default {
  client: {
    input: config.client.input(),
    output: config.client.output(),
    plugins: [
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess,
      }),
      resolve({
        browser: true,
        dedupe,
      }),
      commonjs(),

      !dev &&
        terser({
          module: true,
        }),
    ],

    onwarn,
  },

  server: {
    input: config.server.input(),
    output: config.server.output(),
    plugins: [
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        generate: 'ssr',
        dev,
        preprocess,
      }),
      resolve({
        dedupe,
      }),
      commonjs(),
    ],
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules ||
        Object.keys(process.binding('natives'))
    ),

    onwarn,
  },

  serviceworker: {
    input: config.serviceworker.input(),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      commonjs(),
      !dev && terser(),
    ],

    onwarn,
  },
}
