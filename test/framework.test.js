// test/framework.test.js
'use strict';

const mock = require('egg-mock');

describe('test/framework.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'example',
      // 声明是测试 Framework
      framework: true,
    });
    return app.ready();
  });

  after(() => app && app.close());

  afterEach(mock.restore);

  it('should GET /', async () => {
    return app.httpRequest()
      .get('/')
      .expect('<div>framework-example</div>')
      .expect(200);
  });
});