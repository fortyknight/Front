
// ref: https://umijs.org/config/
const path = require('path');

export default {
  publicPath: './',
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: true,
      dynamicImport: true,
      dll: {
        exclude: ['ace'],
      },
      title: 'ices',
      locale: {
        enable: true,
        // default: 'en-US',
        default: 'zh-CN',
      },
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  alias: {
    
    components: path.resolve(__dirname, './src/components'),
    '@': path.resolve(__dirname, './src'),
  },
  proxy: {
    '/api': {
      target: 'http://localhost:8000/',
      // // // // // // // // target: 'http://172.20.51.5:8240/',
      // target:'http://39.105.125.118:8000/',
      // changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    }
  },
  outputPath: 'build', // 将输出目录设置为 build
  hash: true, // 添加文件哈希以便于缓存
  chainWebpack(config) {
    // 修改 CSS 输出路径
    config.plugin('extract-css').tap(args => {
      args[0].filename = 'static/css/[name].[hash:8].css';
      args[0].chunkFilename = 'static/css/[name].[hash:8].chunk.css';
      return args;
    });

    // 修改 JS 输出路径
    config.output
      .filename('static/js/[name].[hash:8].js')
      .chunkFilename('static/js/[name].[hash:8].chunk.js');
  }
}
