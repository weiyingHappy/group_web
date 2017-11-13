import React from 'react'
import { connect } from 'dva'
import { Button, Spin } from 'antd'
import { General } from 'components'
import cs from '../app.less'

const { EditableInput, EditableImage, SelfDataTable } = General
function ProductDetail({ history, product, loading, router }) {
  if (loading.effects[`${router.model}/query`]) {
    return (
      <Spin />
    )
  }
  const { detail } = product

  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      render: (t, r, i) => i + 1,
    },
    {
      title: '网点名称',
      dataIndex: 'net_name',
    },
    {
      title: '货架编号',
      dataIndex: 'shelf_id',
    },
    {
      title: '当前库存',
      dataIndex: 'inventory',
    },
  ]

  return (
    <div>
      <div className={cs.actionTitle}>
        <Button icon="rollback" onClick={() => { history.go(-1) }} >返回</Button>
      </div>
      <div className={cs.title}>{detail.name}--详情</div>
      <div className={cs.whitebgp}>
        <EditableImage title="商品图片" value={detail.imgs} bindName="imgs" />
        <EditableInput title="商品编号" value={detail.id} noedit />
        <EditableInput title="商品名称" value={detail.name} bindName="name" />
        <EditableInput title="商品条码" value={detail.barcode} bindName="barcode" />
        <EditableInput title="销售价格" value={detail.price} bindName="price" />
        <EditableInput title="商品详情" value={detail.intro} bindName="intro" textarea />
        <EditableInput title="生产厂家" value={detail.manufacturer} bindName="manufacturer" />
      </div>
      <div className={cs.title}>在售货架</div>
      <div className={cs.whitebgp}>
        <SelfDataTable
          url="Product/listProductShelf"
          params={{ product_id: detail.id }}
          columns={columns}
        />
      </div>
    </div>
  )
}

function mapStateToProps({ app, product, loading }) {
  return { router: app.router, product, loading }
}

export default connect(mapStateToProps)(ProductDetail)
