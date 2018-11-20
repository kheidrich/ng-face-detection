const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const html = require('rollup-plugin-html');
const externalGlobals = require('rollup-plugin-external-globals');

module.exports = {
    input: './src/detector.module.js',
    output: {
        dir: 'dist',
        file: 'ng-face-detection.js',
        format: 'iife',
        name: 'ngFaceDetection'
    },
    plugins: [
        resolve(),
        commonjs(),
        html(),
        externalGlobals({
            angular: "angular"
        })
    ]
}