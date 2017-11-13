import React from 'react'
import { connect } from 'dva'
import { Button, Spin } from 'antd'
import { General } from 'components'
import cs from '../app.less'

const { EditableInput } = General
function DeliveryDetail({ app, history, delivery, loading }) {
  if (loading.effects[`${app.router.model}/query`]) {
    return (
      <Spin />
    )
  }
  const { detail } = delivery

  return (
    <div>
      <div className={cs.actionTitle}>
        <Button icon="rollback" onClick={() => { history.go(-1) }} >返回</Button>
      </div>
      <div className={cs.title}>{detail.name}--详情</div>
      <div className={cs.whitebgp}>
        <EditableInput title="网点编号" value={detail.id} noedit />
        <EditableInput title="配送人员名称" value={detail.staff_name} bindName="staff_name" />
        <EditableInput title="企业名称" value={detail.enterprise_name} bindName="enterprise_name" />
        <EditableInput title="联系人" value={detail.contact} bindName="contact" />
        <EditableInput title="联系电话" value={detail.contact_phone} bindName="contact_phone" />
        <EditableInput title="省" value={detail.province} bindName="province" />
        <EditableInput title="市" value={detail.city} bindName="city" />
        <EditableInput title="区" value={detail.area} bindName="area" />
        <EditableInput title="地址" value={detail.address} bindName="address" />
      </div>
    </div>
  )
}

function mapStateToProps({ app, delivery, loading }) {
  return { delivery, loading, app }
}

export default connect(mapStateToProps)(DeliveryDetail)
