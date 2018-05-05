const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
ExtractTextPlugin:  Extract text from a bundle, or bundles, into a separate file.
It moves all the required *.css modules in entry chunks into a separate CSS file.
your styles are no longer inlined into the JS bundle, but in a separate CSS file (styles.css). 
If your total stylesheet volume is big, 
it will be faster because the CSS bundle is loaded in parallel to the JS bundle.
*/

const HtmlWebpackPlugin = require('html-webpack-plugin');
// HtmlWebpackPlugin : create  index.html automtically  while build

const CleanWebpackPlugin = require('clean-webpack-plugin');
// cleanWebpackPlugin: cleans up or removes dist folder automatically  everytime when build is run

const  BrowserSyncPlugin = require('browser-sync-webpack-plugin');
 
module.exports = {
    entry:'./src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname,'dist'),
    },
    devtool:'inline-source-map',  
    devServer :{
        contentBase:'./dist',
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test:/\.scss$/,
                use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  use: [
                      {loader:'css-loader', options:{sourceMap:true}}, 
                      {loader:'postcss-loader', options:{sourceMap:true}},
                      {loader:'sass-loader', options:{sourceMap:true}},
                  ]
                })
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader: 'babel-loader',
            }
        ]
    },
    plugins: [
       // new CleanWebpackPlugin(['dist']),  // telling which folder to delete 
      new ExtractTextPlugin("styles.css"), // specifying the file name seperatly for css
      new HtmlWebpackPlugin({
          title:'Learning Webpack 2'
      }), // creating index.html automatically while npm run build 
      new BrowserSyncPlugin(
        // BrowserSync options
        {
          // browse to http://localhost:3000/ during development
          host: 'localhost',
          port: 3000,
          // proxy the Webpack Dev Server endpoint
          // (which should be serving on http://localhost:3100/)
          // through BrowserSync
          proxy: 'http://localhost:8080/'
        },
        // plugin options
        {
          // prevent BrowserSync from reloading the page
          // and let Webpack Dev Server take care of this
          reload: false
        }
      )

    ]
}
/*
module.exports = {
    entry: {
      app: './src/index.js',
      about: './src/js/about.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader']
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {loader: 'css-loader', options: {sourceMap: true} },
              {loader: 'postcss-loader', options: {sourceMap: true} },
              {loader: 'sass-loader', options: {sourceMap: true} }
            ]
          })
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist']),
      new ExtractTextPlugin('styles.css'),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/views/index.html',
        chunks: ['app']
      }),
      new HtmlWebpackPlugin({
        filename: 'about.html',
        template: 'src/views/about.html',
        chunks: ['about']
      }),
      new BrowserSyncPlugin(
        // BrowserSync options
        {
          // browse to http://localhost:3000/ during development
          host: 'localhost',
          port: 3000,
          // proxy the Webpack Dev Server endpoint
          // (which should be serving on http://localhost:3100/)
          // through BrowserSync
          proxy: 'http://localhost:8080/'
        },
        // plugin options
        {
          // prevent BrowserSync from reloading the page
          // and let Webpack Dev Server take care of this
          reload: false
        }
      )
    ]
  };
  */