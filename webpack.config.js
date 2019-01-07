const path = require('path');
var webpack = require('webpack');
var JasmineWebpackPlugin = require('jasmine-webpack-plugin');


module.exports = {
    mode: "development",
    devServer: {
        inline: true,
        contentBase: './',
        port: '3001',
        host: '0.0.0.0'
    },
    entry: {
        "bundle": "./bundle-config.js",
    },
    externals: [{
        "window": "window"
    }],
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, '..')
    },
    // Like shims in require.js
    module: {
        rules: [
            {
                test: require.resolve('jquery'),
                use: [{
                        loader: 'expose-loader',
                        query: '$'
                    },
                    {
                        loader: 'expose-loader',
                        query: 'jQuery'
                    }
                ]
            },
            {
                test: /jquery.chosen/,
                use: [{
                        loader: 'expose-loader',
                        query: 'AbstractChosen'
                    },
                    {
                        loader: 'imports-loader?chosen,jQuery=jquery,$=jquery,this=>window',
                    }
                ]
            },
            {
                test: /jquery.anythingslider|jcrop|jquery.placeholder|jquery.textchange|parsley|parsley.extend|select2|spectrum|spectrum-colorpicker/,
                use: [
                    {
                      loader: 'imports-loader?jquery',
                    }
                ]
            },
            {
                test: /showdown-prettify/,
                use: [
                    {
                      loader: 'imports-loader?showdown,google-code-prettify',
                    }
                ]
            },
            // { test: /pat-calendar/, loader: 'imports-loader?fullcalendar' }
        ]
    },
    resolve: {
        modules: ['src', 'node_modules'],
        alias: {
            "dropzone":             "dropzone/dist/dropzone",
            "i18n":                 "patternslib/src/core/i18n",
            "jquery":               "jquery/dist/jquery",
            "jquery.browser":       "jquery.browser/dist/jquery.browser",
            "jquery.form":          "jquery-form/jquery.form",
            "logging":              "logging/src/logging",
            "pat-mockup-parser":    "core/mockup-parser.js",
            "pat-ajax":             "patternslib/src/pat/ajax/ajax",
            "pat-base":             "patternslib/src/core/base",
            "pat-compat":           "patternslib/src/core/compat",
            "pat-htmlparser":       "patternslib/src/lib/htmlparser",
            "pat-inject":           "patternslib/src/pat/inject/inject",
            "pat-jquery-ext":       "patternslib/src/core/jquery-ext",
            "pat-logger":           "patternslib/src/core/logger",
            "pat-parser":           "patternslib/src/core/parser",
            "pat-registry":         "patternslib/src/core/registry",
            "pat-utils":            "patternslib/src/core/utils",
            "pat-upload":           "pat-upload.js",
            "patterns":             "patternslib/bundle",
            "preview":              "templates/preview.xml",
            "text":                 "requirejs-text/text",
            "underscore":           "underscore/underscore",
            "upload":               "templates/upload.xml"
        }
    },
    resolveLoader: {
        alias: {
            text: 'text-loader'
        }
    },
    devtool: "source-map",
    node: {
        // https://github.com/webpack-contrib/css-loader/issues/447
        fs: 'empty'
    },
    devServer: {
        contentBase: './'
    },
    plugins: [
        new JasmineWebpackPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.ProvidePlugin({
            Promise: 'es6-promise-promise',
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            jquery: "jquery"
        })
    ]
};



