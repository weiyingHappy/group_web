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
      model: 'team',
      noadd: true,
      cus:"groupManage"
    },
    {
      model: 'group',
      noadd: true,
    },
  ],
}
