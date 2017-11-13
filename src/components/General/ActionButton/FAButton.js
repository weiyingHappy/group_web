/** FormActionButton表单操作组件(取消和确认) */
import React from 'react'
import { Button } from 'antd'

function FAButton({ sureName, loading, model }) {
  return (
    <span>
      <Button style={{ marginRight: 20 }} onClick={() => { window.history.back() }} >取消</Button>
      <Button
        type="primary"
        htmlType="submit"
        loading={loading.effects[`${model}/edit`]}
      >
        {sureName || '确定'}
      </Button>
    </span>
  )
}

export default FAButton
