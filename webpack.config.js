const path = require('path');
const webpack = require('webpack');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.less$/i,
                use: [
                  // compiles Less to CSS
                  "style-loader",
                  "css-loader",
                  "less-loader",
                ],
            },
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: true
        })
    ]
    
};
