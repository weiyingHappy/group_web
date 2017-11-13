import React from 'react'
import { connect } from 'dva'
import { Button, Spin } from 'antd'
import { General, Special } from 'components'
import cs from '../app.less'

const { EditableInput } = General
const { EditableNetSelect } = Special
function ShelfDetail({ app, history, shelf, loading }) {
  if (loading.effects[`${app.router.model}/query`]) {
    return (
      <Spin />
    )
  }
  const { detail } = shelf

  return (
    <div>
      <div className={cs.actionTitle}>
        <Button icon="rollback" onClick={() => { history.go(-1) }} >返回</Button>
      </div>
      <div className={cs.title}>货架详情</div>
      <div className={cs.whitebgp}>
        <EditableInput title="网点编号" value={detail.id} noedit />
        <EditableNetSelect
          title="网点名称"
          text={detail.net_name}
          defaultValue={detail.net_id}
          bindName="net_id"
        />
        <EditableInput title="联系人" value={detail.contact} bindName="contact" />
        <EditableInput title="联系电话" value={detail.contact_phone} bindName="contact_phone" />
      </div>
      <div className={cs.title}>商品列表</div>
      <div className={cs.whitebgp}>
        <div className={cs.table}>
          <table>
            <thead>
              <tr>
                <th>商品名称</th>
                <th>数量</th>
              </tr>
            </thead>
            <tbody>
              {(detail.products || []).map((item) => {
                return (
                  <tr key={`tb_${item.id}`}>
                    <td>{item.product_name}</td>
                    <td>{item.inventory}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function mapStateToProps({ app, shelf, loading }) {
  return { shelf, loading, app }
}

export default connect(mapStateToProps)(ShelfDetail)
