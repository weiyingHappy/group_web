import React from 'react'
import { Menu, Icon } from 'antd'
import classnames from 'classnames'
import { domain } from 'util'
import styles from './Layout.less'

const SubMenu = Menu.SubMenu

const Header = ({ user, siderFold, switchSider }) => {
  return (
    <div className={styles.header}>
      <div className={styles.button} onClick={switchSider} >
        <Icon type={classnames({ 'menu-unfold': siderFold, 'menu-fold': !siderFold })} />
      </div>
      <div className={styles.rightWarpper}>
        <Menu mode="horizontal">
          <SubMenu
            style={{
              float: 'right',
            }}
            title={<span>
              <Icon type="user" />
              {user.name}
            </span>}
          >
            <Menu.Item key="logout">
              <div
                style={{ textAlign: 'center' }}
                onClick={() => {
                  window.location.reload()
                  window.location.href = `${domain()}#/login`
                }}
              >退出</div>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </div>
  )
}

export default Header
