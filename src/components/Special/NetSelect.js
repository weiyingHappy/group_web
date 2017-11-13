// 获取所有网点列表的下拉选择框
import React from 'react'
import { Spin, Select } from 'antd'
import { connect } from 'dva'

class NetSelect extends React.Component {
  state = {
    nets: null,
  }

  componentWillMount() {
    this.props.dispatch({
      type: 'shelf/getAllNetToSelect',
      payload: {
        cb: (data) => {
          this.setState({ nets: data.results })
        },
      },
    })
  }

  render() {
    const { nets } = this.state
    const { onChange, defaultValue } = this.props
    if (nets === null) {
      return (
        <Spin />
      )
    }

    const dv = defaultValue || '-1'
    return (
      <Select
        defaultValue={dv}
        onChange={(value) => { onChange(value) }}
      >
        {defaultValue ? '' : <Select.Option value={'-1'} key={'select_net_-1'}>请选择</Select.Option>}
        {
          nets.map((net, index) => (
            <Select.Option value={net.id} key={`select_net_${index}`}>{net.name}</Select.Option>
          ))
        }
      </Select>
    )
  }
}

function mapStateToProps({ shelf }) {
  return { shelf }
}

export default connect(mapStateToProps)(NetSelect)
