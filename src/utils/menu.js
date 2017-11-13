module.exports = {
  menus:
  [
    {
      id: '1',
      name: '商品管理',
      icon: 'appstore-o',
      sub: [
        {
          id: '1_1',
          name: '商品列表',
          route: '/product/list/1',
        },
      ],
    },
    {
      id: '2',
      name: '网点管理',
      icon: 'tags-o',
      sub: [
        {
          id: '2_1',
          name: '网点列表',
          route: '/net/list/1',
        },
        {
          id: '2_2',
          name: '货架列表',
          route: '/shelf/list/1/net',
        },
      ],
    },
    {
      id: '3',
      name: '订单管理',
      icon: 'shopping-cart',
      sub: [
        {
          id: '3_1',
          name: '订单列表',
          route: '/order/list/1',
        },
      ],
    },
    {
      id: '4',
      name: '团队管理',
      icon: 'team',
      sub: [
        {
          id: '4_1',
          name: '团队列表',
          route: '/staff/list/1',
        },
      ],
    },
    {
      id: '5',
      name: '配送管理',
      icon: 'team',
      sub: [
        {
          id: '5_1',
          name: '配送列表',
          route: '/delivery/list/1',
        },
      ],
    },
  ],

  openkeys:
  {
    product: { key: '1', sub: '1_1' },
    net: { key: '2', sub: '2_1' },
    shelf: { key: '2', sub: '2_2' },
    order: { key: '3', sub: '3_1' },
    staff: { key: '4', sub: '4_1' },
    delivery: { key: '5', sub: '5_1' },
  },
}
