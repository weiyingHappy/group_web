// 配置路由信息
module.exports = {
  modelRoute: [
    {
      model: 'shelf',
      noadd: true,
      nodetail: true,
      nolist: true,
      cus: 'net',
    },
    {
      model: 'member',
      noadd: true,
      cus:"groupMember"
    },
    {
      model: 'team',
      noadd: true,
      cus:"groupManage"
    },
    {
      model: 'group',
      noadd: true,
      nolist: true,
      cus:"groupManage",

    },
  ],
}
