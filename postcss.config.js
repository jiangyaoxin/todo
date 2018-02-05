//postcss是帮我们后处理css的，优化css代码
const autoprefixer = require('autoprefixer')

module.exports = {
    plugins: [
      require('precss'),
      //帮我们加上css前缀
      autoprefixer()
    ]
}