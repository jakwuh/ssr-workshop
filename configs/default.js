const path = require('path');

const ROOT = path.resolve(__dirname, '..');

module.exports = {
    entry: path.resolve(ROOT, 'src/entries/client.jsx'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(ROOT, 'public')
    },
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
    devServer: {
        contentBase: path.join(ROOT, 'public'),
        compress: true,
        port: 10001,
        proxy: {
            '/search/apartments': {
                target: 'https://ak.api.onliner.by',
                secure: false,
                changeOrigin: true,
            },
        },
    }
};
