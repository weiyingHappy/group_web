import React from 'react'
import { Table } from 'antd'
import { connect } from 'dva'

function DataTable({ dispatch, loading, router, columns, model, rowKey, onChange, showTotal }) {
  return (
    <Table
      columns={columns}
      dataSource={model.lists}
      rowKey={record => record[rowKey || 'id']}
      loading={loading.effects[`${router.model}/query`] || loading.effects[`${router.model}/edit`]}
      pagination={{
        current: model.nowPage,
        total: model.count,
        showTotal: showTotal ? total => `共 ${total} 条` : () => '',
        onChange: onChange ? onChange : (p) => {
          dispatch({
            type: `${router.model}/query`,
            payload: { page: p },
            source: 'page',
          })
        },
      }}
    />
  )
}

function mapStateToProps({ app, loading }) {
  return { loading, router: app.router }
}

export default connect(mapStateToProps)(DataTable)
