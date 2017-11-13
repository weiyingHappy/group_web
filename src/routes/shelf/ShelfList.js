import React from 'react'
import { connect } from 'dva'
import { Popconfirm, Button, Row, Col } from 'antd'
import { General } from 'components'
import { apiPrefix } from 'util'
import cs from '../app.less'

const { DataTable, SearchBar } = General
function ShelfList({ router, dispatch, history, shelf }) {
  const columns = [
    {
      title: '货架编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '网点名称',
      dataIndex: 'net_name',
      key: 'net_name',
    }, {
      title: '联系人',
      dataIndex: 'contact',
      key: 'contact',
    }, {
      title: '联系电话',
      dataIndex: 'contact_phone',
      key: 'contact_phone',
    },
    {
      title: '操作',
      render(record) {
        return (
          <div className={cs.tableAction}>
            <span onClick={() => { history.push(`/${router.model}/detail/${record.id}/net`) }}>查看详情</span>
            <Popconfirm
              title={'是否删除这个记录？'}
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
            <span>
              <a href={`${apiPrefix()}Show/ShelfQr/${record.id}`} target="_blank" >二维码</a>
            </span>
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
            <Button icon="plus" onClick={() => { history.push(`/${router.model}/add/1/net`) }} >添加货架</Button>
          </Col>
          <Col span={6}>
            <SearchBar
              placeholder="货架名称/编号"
              dispatch={dispatch}
              router={router}
              value={shelf.search.query}
            />
          </Col>
        </Row>
      </div>

      <div className={cs.whitebg}>
        <DataTable
          columns={columns}
          model={shelf}
        />
      </div>
    </div>

  )
}

function mapStateToProps({ app, shelf }) {
  return { shelf, router: app.router }
}

export default connect(mapStateToProps)(ShelfList)
