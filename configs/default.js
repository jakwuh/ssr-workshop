const path = require('path');
const nodeExternals = require('webpack-node-externals');

const ROOT = path.resolve(__dirname, '..');

const sharedConfig = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
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
};

const clientConfig = {
    ...sharedConfig,
    target: 'web',
    entry: path.resolve(ROOT, 'src/entries/client.jsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(ROOT, 'public')
    },
};

const serverConfig = {
    ...sharedConfig,
    target: 'node',
    externals: [nodeExternals()],
    entry: path.resolve(ROOT, 'src/entries/server.jsx'),
    output: {
        filename: 'server.js',
        path: path.resolve(ROOT, 'dist')
    },
};

module.exports = [ clientConfig, serverConfig ];
