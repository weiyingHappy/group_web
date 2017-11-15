import React from 'react'
import { connect } from 'dva'
import { Popconfirm, Button, Row, Col } from 'antd'
import { General } from 'components'
import cs from '../app.less'

const { DataTable, SearchBar } = General
function TeamList({ dispatch, history, team, router }) {
  const columns = [
    {
      title: '酒店编号',
      dataIndex: 'id',
    },
    {
      title: '状态',
      dataIndex: 'checked',
      render:text => {
        return text != 1 ? "下线" : "上线"
      }
    },
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '联系手机号',
      dataIndex: 'telphone',
    },
    {
      title: '操作',
      render(record) {
        return (
          <div className={cs.tableAction}>
            <Popconfirm
              {...{
                title:`确认${record.checked != 1 ? "上线" : "下线"}此集团酒店？`,
                onConfirm:() => {
                  dispatch ({
                    type:"team/edit",
                    payload:{team_id:record.id,checked:record.checked != 1 ? 1 : 2},
                    action: 'edit',
                    didAction: { type: 1 },
                  })
                }
              }}
            >{record.checked != 1 ? "上线" : "下线"}</Popconfirm>
            <span onClick={() => { history.push(`/${router.model}/detail/${record.id}/groupManage`) }}>查看详情</span>
          </div>
        )
      },
    },
  ]

  return (
    <div>
      <div className={cs.whitebg}>
        <DataTable
          columns={columns}
          model={team}
        />
      </div>
    </div>

  )
}

function mapStateToProps({ app, team }) {
  return { team, router: app.router }
}

export default connect(mapStateToProps)(TeamList)
