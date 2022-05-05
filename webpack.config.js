const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {

    const configObj = {splitChunks: {chunks: 'all'}};

    if (isProd) {configObj.minimizer = [new CssMinimizerPlugin(), new TerserWebpackPlugin()]}

    return configObj;

};

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './main.js',
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: "./img/[name][hash][ext]",
        publicPath: ''
    },
    devServer: {
        historyApiFallback: true,
        static:{
            directory:path.join(__dirname, 'dist')
        },
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    devtool: isProd ? false : 'source-map',
    optimization: optimization(),
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: "index.html",
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(html)$/,
                use: ['html-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resourcePath, context) => {
                                return path.relative(path.dirname(resourcePath), context) + '/';
                            },
                        }
                    },
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(gif|png|svg|jpeg)$/,
                type: 'asset/resource'
            }
        ]
    }
}