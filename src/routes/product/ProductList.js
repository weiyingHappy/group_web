import React from 'react'
import { connect } from 'dva'
import { Popconfirm, Button, Row, Col } from 'antd'
import { General } from 'components'
import cs from '../app.less'

const { DataTable, SearchBar } = General
function ProductList({ dispatch, history, product, router }) {
  const columns = [
    {
      title: '商品编号',
      dataIndex: 'id',
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '条形码',
      dataIndex: 'barcode',
    },
    {
      title: '价格(RMB)',
      dataIndex: 'price',
    }, {
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
              value={product.search.query}
            />
          </Col>
        </Row>
      </div>

      <div className={cs.whitebg}>
        <DataTable
          columns={columns}
          model={product}
        />
      </div>
    </div>

  )
}

function mapStateToProps({ app, product }) {
  return { product, router: app.router }
}

export default connect(mapStateToProps)(ProductList)
