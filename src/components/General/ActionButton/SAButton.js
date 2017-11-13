/** SearchActionButton表单操作组件(取消和确认) */
import React from 'react'
import { Button } from 'antd'
import cs from './ActionButton.less'

function SAButton({ dispatch, sureName, model }) {
  return (
    <span className={cs.sabutton}>
      <Button
        style={{ marginRight: 20 }}
        onClick={() => {
          dispatch({
            type: `${model}/clearSearch`,
          })
        }}
      >
        清除
      </Button>
      <Button
        type="primary"
        onClick={() => {
          dispatch({
            type: `${model}/query`,
          })
        }}
      >
        {sureName || '查询'}
      </Button>
    </span>
  )
}

export default SAButton
