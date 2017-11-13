module.exports = {
  name: '酷客',
  apiPackage: 'Admin',
  openPages: ['/', '/login'],
  apiPrefix: {
    production: 'http://www.cooke100.com/api/',
    testing: 'http://test.lianwuyun.cn/newbuy_api/',
    development: 'http://test.lianwuyun.cn/newbuy_api/',
    // development: 'http://127.0.0.1/nb/',
  },
  domain: {
    production: 'http://www.cooke100.com/admin/',
    testing: 'http://test.lianwuyun.cn/admin/',
    development: 'http://localhost:8000/',
  },
  qiniuPrefix: 'http://ov2ek9bbx.bkt.clouddn.com/',
  homePath: '/order/list/1',
  leaveClean: false,
  lazy: false,
}
