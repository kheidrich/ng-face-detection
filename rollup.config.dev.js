const resolve = require('rollup-plugin-node-resolve');
const serve = require('rollup-plugin-serve');
const commonjs = require('rollup-plugin-commonjs');
const html = require('rollup-plugin-html');
const async = require('rollup-plugin-async');
const copy = require('rollup-plugin-copy');
const liveReload = require('rollup-plugin-livereload');

module.exports = [
    {
        input: './src/detector.module.js',
        output: {
            dir: 'dist-dev',
            file: 'ng-face-detection.js',
            format: 'iife',
            name: 'ngFaceDetection',
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs(),
            async(),
            html(),
            serve('dist-dev'),
            liveReload('dist-dev')
        ],
        watch: {
            include: 'src/**',
            exclude: 'node_modules/**',
            clearScreen: true
        }
    },
    {
        input: './test/test.js',
        output: {
            dir: 'dist-dev',
            file: 'test.js',
            format: 'iife',
            name: 'tes',
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs(),
            html(),
            copy({
                'test/index.html': 'dist-dev/index.html'
            })
        ],
        watch: {
            include: 'test/**',
            exclude: 'node_modules/**',
            clearScreen: true
        }
    }
]