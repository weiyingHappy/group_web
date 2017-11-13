/** SearchActionButton表单操作组件(取消和确认) */
import React from 'react'
import { Select } from 'antd'
import { connect } from 'dva'
import cs from './Search.less'

function SearchSelect({ dispatch, router, lable, bindName, options, value, nocolon }) {
  return (
    <div className={cs.searchItem}>
      <span className={cs.lable}>{lable}{nocolon || '：'}</span>
      <span className={cs.input}>
        <Select className={cs.select}
          defaultValue={value || '-1'}
          onChange={(val) => {
            const payload = {}
            payload[bindName] = val
            dispatch({
              type: `${router.model}/changeSearch`,
              payload: { ...payload },
            })
          }}
        >
          {
            options.map((item) => {
              return <Select.Option key={item.value} value={item.value} >{item.name}</Select.Option>
            })
          }
        </Select>
      </span>
    </div>
  )
}

function mapStateToProps({ app }) {
  return { router: app.router }
}

export default connect(mapStateToProps)(SearchSelect)
