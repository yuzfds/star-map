const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopywebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const WebpackBar = require('webpackbar'); //进度条
const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        app: './examples/index.ts',
    },
    output: {
        sourcePrefix: ""
    },
    amd: {
      toUrlUndefined: true
    },
    node:{
      fs: 'empty'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/,
                options: {
                    presets: [
                        [
                            '@babel/env',
                            {
                                targets: {
                                    browsers: [
                                        'last 2 versions',
                                        'Firefox ESR',
                                        '> 1%',
                                        'ie >= 9',
                                        'iOS >= 8',
                                        'Android >= 4',
                                    ],
                                },
                            },
                        ],
                    ],
                    plugins: ['@babel/plugin-transform-runtime'],
                },
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]',
                },
            },
            {
                test: /\.less$/,
                use: [{
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        },
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                sourceMap: true,
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        alias:{
        'star-map': path.join(__dirname, './src'),
        cesium: path.resolve(__dirname, cesiumSource)
        },
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        host: 'localhost',
        port: 9008,
        historyApiFallback: {
            rewrites: [{
                from: /./,
                to: '/index.html'
            }],
        },
        disableHostCheck: true,
        hot: true,
        open: true,
    },
    devtool: '#source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'examples/index.html',
            filename: 'index.html',
            inject: true,
        }),
        new WebpackBar(),
        new CopywebpackPlugin({
            patterns: [
                { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
                { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
                { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' }
            ]
        }),
        new webpack.DefinePlugin({
            // Define relative base path in cesium for loading assets
            CESIUM_BASE_URL: JSON.stringify('')
        })
    ],
};
