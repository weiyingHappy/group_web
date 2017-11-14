// 配置路由信息
module.exports = {
  modelRoute: [
    {
      model: 'shelf',
      noadd: false,
      nodetail: false,
      nolist: false,
      cus: 'net',
    },
    {
      model: 'member',
    },
    {
      model: 'hotel',
      noadd: true,
    },
    {
      model: 'group',
      noadd: true,
    },
  ],
}
