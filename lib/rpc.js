// lib/rpc.js

class RPC {
  constructor(ctx) {
    this.ctx = ctx;
    this.app = ctx.app;
    this.logger = ctx.logger;
    this.config = ctx.app.config;
  }

  async api(apiName, data) {
    const host = this.config.rpc.host;
    try {
      const targetUrl = `${host}/api/${apiName}`;
      // log 请求地址
      this.logger.info(`[RPC] request api: ${targetUrl}`);
      // this.ctx.curl 发起网络调用
      const res = await this.ctx.curl(targetUrl, {
        dataType: 'json',
        contentType: 'json',
        timeout: 5000,
        data
      })
      // 成功返回
      return this.handlerResult(res, { apiName, data })
    } catch (err) {
      // 失败返回
      return this.handlerError(err, { apiName, data })
    }
  }

  handlerResult(res) {
    return {
      status: 1,
      data: res.data
    }
  }

  handlerError(err, meta) {
    this.logger.error(`[RPC] request ${meta.apiName} fail: ${err.message}`);
    return {
      status: 0,
      error: {
        message: err.message
      }
    }
  }
}

module.exports = RPC;