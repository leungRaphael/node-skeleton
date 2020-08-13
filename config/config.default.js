// config/config.default.js
'use strict';

module.exports = appInfo => {
  const config = {};

  /**
   * some description
   * @member Config#test
   * @property {String} key - some description
   */
  config.test = {
    key: appInfo.name + '_123456',
  };

  /**
   * 把默认的模板引擎设置为 nunjucks
   * @defaultViewEngine 全局配置，如果根据文件后缀没有找到对应的模板引擎，会使用默认的模板引擎进行渲染
   * @mapping 每个模板在注册时都会指定一个模板名（viewEngineName），在使用时需要根据后缀来匹配模板名，比如指定 .nj 后缀的文件使用 Nunjucks 进行渲染。
   */
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.nj': 'nunjucks',
      '.tpl': 'nunjucks',
    }
  }

  // 自定义加载规范 https://eggjs.org/zh-cn/advanced/loader.html
  config.customLoader = {
    // 定义在 app 上的属性名 app.rpc
    rpc: {
      // 相对于 app.config.baseDir
      directory: 'app/rpc',
      // 如果是 ctx 则使用 loadToContext
      // loadToContext 是加载到 ctx 上而非 app，而且是懒加载。加载时会将文件都放到一个临时对象上，在调用 ctx API 时才实例化对象。
      inject: 'ctx',
      // 是否加载框架和插件的目录
      loadunit: true
    }
  }

  return config;
};
