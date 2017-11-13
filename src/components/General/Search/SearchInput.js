/** SearchActionButton表单操作组件(取消和确认) */
import React from 'react'
import { Input } from 'antd'
import { connect } from 'dva'
import cs from './Search.less'

function SearchInput({ dispatch, router, lable, bindName, value, nocolon }) {
  return (
    <div className={cs.searchItem}>
      <span className={cs.lable}>{lable}{nocolon || '：'}</span>
      <span className={cs.input}>
        <Input
          value={value}
          onChange={(e) => {
            const payload = {}
            payload[bindName] = e.target.value
            dispatch({
              type: `${router.model}/changeSearch`,
              payload: { ...payload },
            })
          }}
        />
      </span>
    </div>
  )
}

function mapStateToProps({ app }) {
  return { router: app.router }
}

export default connect(mapStateToProps)(SearchInput)
