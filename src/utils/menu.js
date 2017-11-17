module.exports = {
  menus:
  [
    {
      id: '1',
      name: '酒店管理',
      // icon: 'appstore-o',
      route: '/team/list/1/groupManage',
      img:true
    },
    {
      id: '2',
      name: '会员管理',
      // icon: 'tags-o',
      route: '/member/list/1/groupMember',
      img:true
    },
    {
      id: '3',
      name: '集团信息',
      // icon: 'shopping-cart',
      route: '/group/detail/undefine/groupManage',
      img:true
    }
  ],

  openkeys:
  {
    team: { key: '1', sub: '1_1' },
    member: { key: '2', sub: '2_1' },
    shelf: { key: '2', sub: '2_2' },
    group: { key: '3', sub: '3_1' },
  },
}
