import React from 'react'
import { connect } from 'dva'
import { Popconfirm, Button, Row, Col } from 'antd'
import { General } from 'components'
import cs from '../app.less'

const { DataTable } = General
function StaffList({ router, dispatch, history, staff }) {
  const columns = [
    {
      title: '用户编号',
      dataIndex: 'id',
    },
    {
      title: '用户名称',
      dataIndex: 'name',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
    },
    {
      title: '权限',
      dataIndex: 'role',
      render(record) {
        return (record ? record.name : '')
      },
    }, {
      title: '操作',
      render(record) {
        return (
          <div className={cs.tableAction}>
            <span onClick={() => { history.push(`/${router.model}/detail/${record.id}`) }}>查看详情</span>
            <Popconfirm
              title={`是否删除${record.name}这个成员？`}
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
            <Button icon="plus" onClick={() => { history.push(`/${router.model}/add/1`) }} >添加成员</Button>
          </Col>
        </Row>
      </div>

      <div className={cs.whitebg}>
        <DataTable
          columns={columns}
          model={staff}
        />
      </div>
    </div>

  )
}

function mapStateToProps({ app, staff }) {
  return { staff, router: app.router }
}

export default connect(mapStateToProps)(StaffList)
