import path from 'path'
import ts from 'rollup-plugin-typescript2'
import server from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'

const isDev = () => {
    return process.env.NODE_ENV === 'development'
}

export default {
    input: './src/index.ts',
    output: [
        {
            file: path.resolve(__dirname, './lib/index.umd.js'),
            format: 'umd',
            name: "type",
        },
        {
            file: path.resolve(__dirname, './lib/index.es.js'),
            format: 'es',
            name: "type",
        },
    ],
    plugins: [
        ts(),
        terser(),
        isDev && livereload(),
        replace({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        isDev && server({
            open: true,
            port: 3988,
            openPage: '/public/index.html'
        })
    ]
}