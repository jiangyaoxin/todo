//path模块提供了一些工具函数，用于处理文件与目录的路径。可以通过以下方式使用：
const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const ExtracPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  //编译目标
  target: 'web',
  //entry声明入库文件
  //__dirname表示Todo2所在地址，即根目录
  //path.join把两个地址拼接起来，形成绝对路径
  entry: path.join(__dirname, 'src/index.js'),
  //输出选项告诉webpack如何编写编译后的文件到磁盘
  output: {
    filename: 'bundel.js',
    path: path.join(__dirname, 'dist')
  },
  //配置一些语法规则，因为webpack只能支持js类型的es5语法，不能解析vue文件时，我们增加一个vue-loader帮我们处理.vue文件类型
  module: {
    //rules中包含对象数组，每个对象中{test,use}test对应正则表达式,use包含多个所需loader，如只需一个loader可省去use，格式如:loader : 'xxx-loader'
    rules: [
      {
        test: /\.vue$/, //是一个正则，代表vue后缀的文件要使用下面的loader
        loader: 'vue-loader'
      },
      /*
      {
        test: /\.css$/,
        use:[
          'style-loader',//将css用js方法写入html文件里
          'css-loader', //读取css
        ]
      },*/
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        //这个写法和上面不同，因为loader是可以配置的
        use:[
          {
            loader: 'url-loader',
            options: {
              limit:1024,//一个限制，小于1024的图片转换成base64代码，直接写在js内容里面，不用生成图片，减少http请求(可以用于小图标)
              name: '[name]-jiang.[ext]' //图片名字也可以自定义
            }
          }
        ]
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    //通过webpack配置的全局标识
    new webpack.DefinePlugin({
      //通过配置DefinePlugin，process.env就相当于全局变量，你的业务代码可以直接使用配置的标识
      'process.env': {
        NODE_ENV: isDev ? '"developent"' : '"production"'
      }
    }),
    new HTMLPlugin() //里面可以添加配置项，具体看官方文档
  ]
}

//可以在这里改开发环境的配置
if(isDev) {
  config.module.rules.push({
    test: /\.styl/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true
          //配置的用处是stylus-loader会生成sourceMap，postcss-loader也会生成sourceMap，当已经有处理器生成sourceMap，就可以直接使用，加快编译速度
        }
      },
      'stylus-loader'
    ]
  },)
  //帮助调试浏览器代码
  config.devtool = '#cheap-module-eval-source-map'
  //config.devServer是webpack2加入的
  config.devServer = {
    port: 8000,
    host: '0.0.0.0', //也可以设置成localhost,设置成ip可以在别人的电脑手机访问
    overlay:{
      errors: true, //错误可以显示在网页当中
    },
    hot: true,//热加载

  }
  config.plugins.push(
    //热加载插件
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
}else {
  //vue和一些其他框架可以单独打包，因为这些框架是相对稳定的，而我们的业务是不断迭代的。这样浏览器可以尽可能长时间的缓存我们的静态文件
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push(
    {
      test: /\.styl$/,
      use: ExtracPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]    
      })
    }   
  )
  config.plugins.push(
      new ExtracPlugin('styles.[contentHash:8].css'),
      new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor'
      }),
      //webpack生成的代码单独打包到一个文件里,也是为了缓存
      new webpack.optimize.CommonsChunkPlugin({
          name: 'runtime'
      })
  )
}
module.exports = config