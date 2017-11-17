import React from 'react'
import { Menu, Icon } from 'antd'
import { menus, openkeys } from 'menu'
import { Link } from 'dva/router'
import styles from './Layout.less'
import cookie from 'js-cookie'
import logo from "../../assets/logo.png";

class Sider extends React.Component {
  state = {
    openKeys: [],
    selectedKey: [],
  };

  componentWillMount() {
    this.state.selectedKey = [openkeys[this.props.router.model].sub]
    this.state.openKeys = [openkeys[this.props.router.model].key]
  }

  onOpenChange = (nopenKeys) => {
    this.setState({
      openKeys: nopenKeys,
    })
  }

  onSelect = (selected) => {
    this.setState({
      selectedKey: selected.selectedKeys,
      openKeys: [selected.key.split('_')[0]],
    })
  }

  getMenus = () => {
    return (menus || []).map((item) => {
      if (item.sub && item.sub.length > 0) {
        return (
          <Menu.SubMenu
            key={item.id}
            title={<span>{item.icon && <Icon type={item.icon} />}{!this.props.siderFold && item.name}</span>}
          >
            {item.sub.map((sitem) => {
              return (<Menu.Item key={sitem.id}>
                <Link to={sitem.route.replace('undefine',cookie.get("group_id"))}>
                  {sitem.icon && <Icon type={sitem.icon} />}{sitem.name}
                </Link>
              </Menu.Item>)
            })}
          </Menu.SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
          <Link to={item.route.replace('undefine',cookie.get("group_id"))}>
            {item.icon && <Icon type={item.icon} />}{!this.props.siderFold && item.name}
          </Link>
        </Menu.Item>)
    })
  }

  render() {
    return (
      <div>
        <div className={styles.logo} style={{backgroundColor:'#FFD100'}}>
          {this.props.siderFold
            ?
            '集团管理'
            :
            <img alt={'logo'} src={logo} />
          }
        </div>
        <Menu
          theme="light"
          mode={this.props.siderFold ? 'vertical' : 'inline'}
          openKeys={this.state.openKeys}
          selectedKeys={this.state.selectedKey}
          onOpenChange={this.onOpenChange}
          onSelect={this.onSelect}
        >
          {this.getMenus()}
        </Menu>
      </div>
    )
  }
}
export default Sider
