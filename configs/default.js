const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const ROOT = path.resolve(__dirname, '..');

const sharedConfig = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    },
};

const clientConfig = {
    ...sharedConfig,
    target: 'web',
    entry: path.resolve(ROOT, 'src/entries/client.jsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(ROOT, 'public')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/env',
                            '@babel/react',
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                include: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true
                    }
                }]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                    },
                }, {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            ONLINER_API_BASE_URL: JSON.stringify('/'),
            IS_SERVER: JSON.stringify(false),
        }),
    ]
};

const serverConfig = {
    ...sharedConfig,
    devtool: false,
    target: 'node',
    externals: [nodeExternals()],
    entry: path.resolve(ROOT, 'src/entries/server.jsx'),
    output: {
        filename: 'server.js',
        path: path.resolve(ROOT, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                "@babel/preset-env",
                                {
                                    "targets": {
                                        "node": "current",
                                    }
                                }
                            ],
                            '@babel/react',
                        ],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],
                        ]
                    }
                }
            },
            {
                test: /\.less/,
                use: [{
                    loader: 'css-loader/locals',
                    options: {
                        modules: true,
                    },
                }]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            PUBLIC_ROOT: JSON.stringify(path.resolve(ROOT, 'public')),
            ONLINER_API_BASE_URL: JSON.stringify('https://ak.api.onliner.by'),
            IS_SERVER: JSON.stringify(true),
        }),
    ]
};

module.exports = [ clientConfig, serverConfig ];
