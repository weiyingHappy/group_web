import React from 'react'
import { connect } from 'dva'
import { Row, Col } from 'antd'
import { General } from 'components'
import cs from '../app.less'

const { DataTable, SAButton, ExportButton, SearchInput, SearchSelect, SearchDateRange } = General
function OrdertList({ dispatch, history, order, router }) {
  const columns = [
    {
      title: '订单编号',
      dataIndex: 'order_no',
    },
    {
      title: '网点名称',
      dataIndex: 'net_name',
    },
    {
      title: '网点编号',
      dataIndex: 'net_id',
    },
    {
      title: '货架编号',
      dataIndex: 'shelf_id',
    },
    {
      title: '商品名称',
      render(record) {
        return (record.product_snapshot || []).map((i) => {
          return (<span key={`${record.order_no}_${i.id}`} >{i.name}　x{i.num}<br /></span>)
        })
      },
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      render(record) {
        return (<span>{record == 0 ? '未支付' : '已支付'}</span>)
      },
    },
    {
      title: '支付金额',
      dataIndex: 'pay_price',
    },
    {
      title: '下单日期',
      dataIndex: 'create_time',
    },
    {
      title: '操作',
      render(record) {
        return (
          <div className={cs.tableAction}>
            <span onClick={() => { history.push(`/${router.model}/detail/${record.order_no}`) }}>查看详情</span>
          </div>
        )
      },
    },
  ]

  const { search } = order
  const status = [
    {
      value: '-1',
      name: '全部',
    }, {
      value: '0',
      name: '未支付',
    }, {
      value: '1',
      name: '已支付',
    },
  ]
  return (
    <div>
      <div className={cs.whitebgp} style={{ paddingBottom: 10 }}>
        <Row>
          <Col span={12}>
            <SearchInput lable="订单编号" value={search.order_no} bindName="order_no" />
            <SearchInput lable="商品名称" value={search.product_name} bindName="product_name" />
            <SearchInput lable="货架编号" value={search.shelf_id} bindName="shelf_id" />
            <SearchDateRange lable="下单日期" value={search.time} bindName="time" />
          </Col>
          <Col span={12}>
            <SearchInput lable="网点名称" value={search.net_name} bindName="net_name" />
            <SearchInput lable="网点编号" value={search.net_id} bindName="net_id" />
            <SearchSelect lable="订单状态" options={status} value={search.status} bindName="status" />
            <SAButton dispatch={dispatch} model={router.model} />
            <ExportButton marginLeft={40} state={order} />
          </Col>
        </Row>
      </div>

      <div className={cs.whitebg}>
        <DataTable
          columns={columns}
          model={order}
          rowKey="order_no"
        />
      </div>
    </div>

  )
}

function mapStateToProps({ app, order }) {
  return { order, router: app.router }
}

export default connect(mapStateToProps)(OrdertList)
