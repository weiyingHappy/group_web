import React from 'react'
import { connect } from 'dva'
import { Popconfirm, Button, Row, Col } from 'antd'
import { General } from 'components'
import cs from '../app.less'

const { DataTable, SearchBar } = General
function NetList({ router, dispatch, history, net }) {
  const columns = [
    {
      title: '网点编号',
      dataIndex: 'id',
    },
    {
      title: '网点名称',
      dataIndex: 'name',
    },
    {
      title: '企业名称',
      dataIndex: 'enterprise_name',
    },
    {
      title: '联系人',
      dataIndex: 'contact',
    },
    {
      title: '联系电话',
      dataIndex: 'contact_phone',
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '操作',
      render(record) {
        return (
          <div className={cs.tableAction}>
            <span onClick={() => { history.push(`/${router.model}/detail/${record.id}`) }}>查看详情</span>
            <Popconfirm
              title={`是否删除${record.name}这个记录？`}
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
            <Button icon="plus" onClick={() => { history.push(`/${router.model}/add/1`) }} >添加网点</Button>
          </Col>
          <Col span={6}>
            <SearchBar
              placeholder="网点名称/编号"
              router={router}
              dispatch={dispatch}
              value={net.search.query}
            />
          </Col>
        </Row>
      </div>

      <div className={cs.whitebg}>
        <DataTable
          columns={columns}
          model={net}
        />
      </div>
    </div>

  )
}

function mapStateToProps({ app, net }) {
  return { net, router: app.router }
}

export default connect(mapStateToProps)(NetList)
