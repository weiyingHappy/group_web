module.exports = {
  name: '酷客',
  apiPackage: 'Group',
  openPages: ['/', '/login'],
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
  qiniuPrefix: 'http://ov2ek9bbx.bkt.clouddn.com/',
  homePath: '/team/list/1/groupManage',
  leaveClean: false,
  lazy: false,
}
