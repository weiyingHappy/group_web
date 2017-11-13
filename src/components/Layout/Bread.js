import React from 'react'
import { Breadcrumb } from 'antd'
import { Link } from 'dva/router'
import { menus, openkeys } from 'menu'
import styles from './Layout.less'

const Bread = ({ router }) => {
  const getBread = () => {
    const open = openkeys[router.model]
    if (!open) {
      return ''
    }
    const menu = menus.find((i) => { return i.id === open.key })
    if (menu) {
      if (menu.sub && menu.sub.length > 0) {
        let sub = menu.sub[0]
        if (menu.sub.length > 1) {
          sub = menu.sub.find((i) => { return i.id == open.sub })
        }

        const mainName = sub.name.replace('管理', '').replace('列表', '')
        let actionName = '列表'
        if (router.originAction === 'add') {
          actionName = '添加'
        } else if (router.originAction === 'detail') {
          actionName = '详情'
        }
        return (
          <Breadcrumb>
            <Breadcrumb.Item><Link to={sub.route}>{menu.name}</Link></Breadcrumb.Item>
            <Breadcrumb.Item>{mainName + actionName}</Breadcrumb.Item>
          </Breadcrumb>
        )
      }
      return (
        <Breadcrumb>
          <Breadcrumb.Item>{menu.name}</Breadcrumb.Item>
        </Breadcrumb>
      )
    }
    return (<Breadcrumb.Item>/</Breadcrumb.Item>)
  }

  return (
    <div className={styles.bread}>
      {getBread()}
    </div>
  )
}

export default Bread
