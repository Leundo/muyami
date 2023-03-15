const path = require('path');
const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const webConfig = {
    mode: 'development',
    entry: {
        main: [
            'webpack-hot-middleware/client',
            path.resolve(__dirname, './index.js')
        ],
    },
    devtool: 'eval-source-map',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, './dist'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'sass-loader' },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env'
                                ],
                            ],
                        },
                    },
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-sprite-loader',
                        options: {
                            extract: true,
                            publicPath: './static/'
                        },
                    },
                    'svgo-loader',
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[contenthash:8][ext]'
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                type: 'asset/inline',
            }
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './lib'),
        },
        fallback: {
            'path': require.resolve('path-browserify'),
            'zlib': require.resolve('browserify-zlib'),
            'assert': require.resolve('assert/'),
            'stream': require.resolve('stream-browserify'),
            'buffer': require.resolve('buffer/'),
        },
        extensions: ['.js', '.json', '.css', 'scss',],
    },
    target: 'web',
};

module.exports = webConfig;