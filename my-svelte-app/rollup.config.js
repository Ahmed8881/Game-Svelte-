import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import { babel } from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

const production = !process.env.ROLLUP_WATCH;

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        svelte({
            // enable run-time checks when not in production
            dev: !production,
            // extract CSS into a separate file (recommended)
            css: css => {
                css.write('public/build/bundle.css');
            }
        }),
        // resolve .js and .svelte files
        resolve({
            browser: true,
            dedupe: ['svelte']
        }),
        // convert CommonJS modules to ES6
        commonjs(),
        // transpile with Babel
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-env']
        }),
        // minify the bundle in production
        production && terser(),
        // serve the app and enable live reloading
        !production && serve({
            open: true,
            contentBase: 'public',
            historyApiFallback: true
        }),
        !production && livereload('public')
    ],
    watch: {
        clearScreen: false
    }
};