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
      model: 'product',
    },
    {
      model: 'net',
    },
    {
      model: 'staff',
    },
    {
      model: 'order',
      noadd: true,
    },
    {
      model: 'delivery',
      noadd: true,
    },
  ],
}
