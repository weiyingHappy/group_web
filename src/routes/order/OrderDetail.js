import React from 'react'
import { connect } from 'dva'
import { Spin, Button, Row, Col, Table } from 'antd'
import { General } from 'components'
import cs from '../app.less'
import styles from './styles.less'

const { EditableInput } = General
function OrderDetail({ history, order, router, loading }) {
  if (loading.effects[`${router.model}/query`]) {
    return (
      <Spin />
    )
  }
  const { detail } = order
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品编号',
      dataIndex: 'id',
    },
    {
      title: '单价',
      dataIndex: 'price',
    },
    {
      title: '数量',
      dataIndex: 'num',
    },
    {
      title: '小计',
      dataIndex: 'total',
    },
  ]
  return (
    <div>
      <div className={cs.actionTitle}>
        <Button icon="rollback" onClick={() => { history.go(-1) }} >返回</Button>
      </div>

      <div className={cs.title}>
        <Row>
          <Col span={8}>订单编号：{detail.order_no}</Col>
          <Col span={8}>订单状态：{detail.status == 0 ? '未支付' : '已支付'}</Col>
          <Col span={8}>下单时间：{detail.create_time}</Col>
        </Row>
      </div>
      <div className={cs.whitebgp}>
        <EditableInput title="网点名称" value={detail.net_name} noedit />
        <EditableInput title="货架编号" value={detail.shelf_id} noedit />
        <EditableInput title="支付金额" value={detail.pay_price} noedit />
      </div>
      <div className={cs.title}>交易清单</div>
      <div className={cs.whitebgp}>
        <Table
          columns={columns}
          dataSource={detail.product_snapshot}
          rowKey={(record) => {
            return `data-${record.id}`
          }}
          pagination={false}
        />
        <div style={{ marginTop: 30 }}>
          <div className={styles.rightMount}>
            <p>商品总额：</p>
            <p>￥{detail.total_price}</p>
          </div>
          <div className={styles.rightMount}>
            <p>优惠金额：</p>
            <p>￥0</p>
          </div>
        </div>
      </div>
    </div>

  )
}

function mapStateToProps({ app, order, loading }) {
  return { order, loading, router: app.router }
}

export default connect(mapStateToProps)(OrderDetail)
