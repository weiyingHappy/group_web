import React from 'react'
import { connect } from 'dva'
import { Popconfirm, Button, Row, Col, Input, Select, DatePicker } from 'antd'
import { General } from 'components'
import cs from '../app.less'
import style from './index.less'
const Option = Select.Option

const { DataTable, SearchBar } = General
function MemberList({ dispatch, history, member, router }) {
  let { search } = member
  const columns = [
    {
      title: '会员昵称',
      dataIndex: 'nickname',
    },
    {
      title: '会员手机号码',
      dataIndex: 'phone',
    },
    {
      title: '会员等级',
      dataIndex: 'level',
    },
    {
      title: '会员来源',
      render:(text, record) => {
        let str = '住那儿网';
        str += record.group_id ? `-${record.group_name}` : '';
        str += record.team_id ? `-${record.team_name}` : '';
        return str;
      }
    },
    {
      title: '会员创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '会员积分',
      dataIndex: 'point',
    },
    {
      title: '操作',
      render(record) {
        return (
          <div className={cs.tableAction}>
            <span onClick={() => { history.push(`/${router.model}/detail/${record.id}`) }}>查看详情</span>
            <Popconfirm
              title={`是否删除${record.name}这个商品？`}
              onConfirm={() => {
                dispatch({
                  type: `${router.model}/edit`,
                  payload: record.id,
                  action: 'del',
                  didAction: { type: 1 },
                })
              }}
            >
              删除
            </Popconfirm>
            <span onClick={() => { history.push(`/${router.model}/detail/${record.id}`) }}>核销积分</span>
          </div>
        )
      },
    },
  ]

  const renderMemberSource = list => {
    let arr = [];
    (list || []).map ((i,k) => {arr.push(<Option value={i} key={i}>{i}</Option>)})
    return arr
  }

  return (
    <div>
      <div className={style.searchCase}>
        <Row>
          <Col span={8}>
            <label className={style.label}>用户昵称：</label>
            <Input
              className={style.formItem}
              placeholder="请输入用户昵称"
              value={search.nickname}
              onChange={e => {
                search.nickname = e.target.value;
                dispatch ({
                  type:"member/success",
                  payload:{}
                })
              }}
            />
          </Col>
          <Col span={8}>
            <label className={style.label}>会员来源：</label>
            <Select
              className={style.formItem}
            >{renderMemberSource (member.sourceArr)}</Select>
          </Col>
          <Col span={8}>
            <label className={style.label}>会员等级：</label>
            <Select
              className={style.formItem}
            >
              <Option value="0">普通</Option>
              <Option value="1">VIP</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <label className={style.label}>用户手机号：</label>
            <Input
              className={style.formItem}
              placeholder="请输入用户手机号"
            />
          </Col>
          <Col span={8}>
            <label className={style.label}>创建时间：</label>
            <DatePicker
              className={style.formItem}
            />
          </Col>
          <Col span={8} style={{textIndent:142}}>
            <Button className={style.clearBtn}>清除</Button>
            <Button className={style.searchBtn}>查询</Button>
          </Col>
        </Row>
      </div>

      <div className={style.searchCountCase} >
        共搜索到<span className={style.searchCount}>{member.count}</span>条信息
      </div>

      <div className={cs.whitebg}>
        <DataTable
          columns={columns}
          model={member}
          onChange={p => {
            dispatch ({
              type:"member/success",
              payload:{
                nowPage:p,
              }
            })
          }}
        />
      </div>
    </div>

  )
}

function mapStateToProps({ app, member }) {
  return { member, router: app.router }
}

export default connect(mapStateToProps)(MemberList)
