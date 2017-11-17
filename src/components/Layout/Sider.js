import React from 'react'
import { Menu, Icon } from 'antd'
import { menus, openkeys } from 'menu'
import { Link } from 'dva/router'
import styles from './Layout.less'
import cookie from 'js-cookie'
import logo from "../../assets/logo.png";
import icon_group from "../../assets/icon-group.png"
import icon_group_active from "../../assets/icon-group-active.png"
import icon_member from "../../assets/icon-member.png"
import icon_member_active from "../../assets/icon-member-active.png"
import icon_team from "../../assets/icon-team.png"
import icon_team_active from "../../assets/icon-team-active.png"

let imgs = [icon_group,icon_group_active,icon_member,icon_member_active,icon_team,icon_team_active];

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
    let self = this;
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
      console.log ('selectedKey',self.state.selectedKey)
      let sk = self.state.selectedKey[0].split('_')[0]
      return (
        <Menu.Item key={item.id}>
          <Link to={item.route.replace('undefine',cookie.get("group_id"))}>
            <div style={{color:sk == item.id ? '#FFD100' : 'white'}}>
              {item.img ?
                <img
                  src={sk == item.id ? imgs[(+item.id-1)*2] : imgs[(+item.id-1)*2+1]}
                  style={{display:'block',margin:"auto"}}
                /> : ''}
              {item.icon && <Icon type={item.icon} />}{!this.props.siderFold && item.name}
            </div>

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
