import React from 'react'
import { connect } from 'dva'
import { Button, Spin } from 'antd'
import { General } from 'components'
import cs from '../app.less'

const { EditableInput, EditableSelect } = General
function StaffDetail({ app, history, staff, loading }) {
  if (loading.effects[`${app.router.model}/query`]) {
    return (
      <Spin />
    )
  }
  const { detail } = staff
  const selects = [
    {
      value: 1,
      name: '超级管理员',
    },
    {
      value: 2,
      name: '管理员',
    },
    {
      value: 3,
      name: '普通员工',
    },
    {
      value: 4,
      name: '配送',
    },
  ]
  return (
    <div>
      <div className={cs.actionTitle}>
        <Button icon="rollback" onClick={() => { history.go(-1) }} >返回</Button>
      </div>
      <div className={cs.title}>{detail.name}--详情</div>
      <div className={cs.whitebgp}>
        <EditableInput title="成员编号" value={detail.id} noedit />
        <EditableInput title="手机号码" value={detail.phone} noedit />
        <EditableInput title="成员名称" value={detail.name} bindName="name" />
        <EditableSelect
          title="成员权限"
          selects={selects}
          bindName="role_id"
          defaultValue={detail.role_id}
        />
      </div>
    </div>
  )
}

function mapStateToProps({ app, staff, loading }) {
  return { staff, loading, app }
}

export default connect(mapStateToProps)(StaffDetail)
