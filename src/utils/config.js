module.exports = {
  name: '集团管理',
  apiPackage: 'Group',
  openPages: ['/', '/login', '/choose', '/choose_hotel'],
  apiPrefix: {
    production: 'http://www.hotelets.com/api/',
    testing: 'http://www.lianwuyun.cn/api/',
    development: 'http://www.lianwuyun.cn/api/',
    // development: 'http://127.0.0.1/nb/',
  },
  domain: {
    production: 'http://www.cooke100.com/admin/',
    testing: 'http://test.lianwuyun.cn/admin/',
    development: 'http://localhost:8000/',
  },
  qiniuPrefix: 'http://7xo285.com1.z0.glb.clouddn.com/',
  homePath: '/choose',
  leaveClean: false,
  lazy: false,
}
