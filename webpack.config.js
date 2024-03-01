const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {
    devtool: 'inline-source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            // html files
            {
                test: /\.html$/i,
                use: 'html-loader'
            },
            // typescript files
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            // css files
            {
                test: /\.css$/,
                use: [
                 'style-loader',
                    'css-loader'
                ]
            },
            // for images
            {
                test: /\.(png|gif|jpeg|jpg|svg)/,
                type: 'asset/resource'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        clean: true,
    },
    devServer: {
        liveReload: true,
        open: false,
        compress: true,
    }
}
