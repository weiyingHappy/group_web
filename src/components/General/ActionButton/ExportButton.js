import React from 'react'
import { connect } from 'dva'
import { Button } from 'antd'
import { apiPrefix } from 'util'

function ExportButton({ dispatch, loading, marginLeft, marginRight, state }) {
  const handleExport = () => {
    console.log('state', state)
    dispatch({
      type: 'app/request',
      uri: 'Export/listOrder',
      data: state.search,
      callback: ({ results }) => {
        const url = `${apiPrefix()}/excels/${results}.xlsx`
        let a = document.createElement('a')
        a.setAttribute('href', url)
        a.setAttribute('target', '_blank')
        a.click()
      },
    })
  }

  return (
    <span>
      <Button
        style={{ marginLeft: marginLeft || 0, marginRight: marginRight || 0 }}
        icon="file-excel"
        loading={loading.effects['app/request']}
        onClick={handleExport}
      >
        导出当前记录
      </Button>
    </span>
  )
}

function mapStateToProps({ loading }) {
  return { loading }
}

export default connect(mapStateToProps)(ExportButton)
