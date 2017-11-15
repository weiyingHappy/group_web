import React from 'react'
import { connect } from 'dva'
import { Popconfirm, Button, Row, Col } from 'antd'
import { General } from 'components'
import cs from '../app.less'

const { DataTable, SearchBar } = General
function MemberList({ dispatch, history, member, router }) {
  const columns = [
    {
      title: '会员昵称',
      dataIndex: 'id',
    },
    {
      title: '会员手机号码',
      dataIndex: 'name',
    },
    {
      title: '会员等级',
      dataIndex: 'barcode',
    },
    {
      title: '会员来源',
      dataIndex: 'price',
    },
    {
      title: '会员创建时间',
      dataIndex: 'price',
    },
    {
      title: '会员积分',
      dataIndex: 'price',
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

  return (
    <div>
      <div className={cs.actionTitle}>
        <Row>
          <Col span={18}>
            <Button icon="plus" onClick={() => { history.push(`/${router.model}/add/1`) }} >添加商品</Button>
          </Col>
          <Col span={6}>
            <SearchBar
              placeholder="商品名称/编号"
              dispatch={dispatch}
              router={router}
              value={member.search.query}
            />
          </Col>
        </Row>
      </div>

      <div className={cs.whitebg}>
        <DataTable
          columns={columns}
          model={member}
        />
      </div>
    </div>

  )
}

function mapStateToProps({ app, member }) {
  return { member, router: app.router }
}

export default connect(mapStateToProps)(MemberList)
