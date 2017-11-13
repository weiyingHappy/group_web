import React from 'react'
import { Icon, Spin, Select } from 'antd'
import { connect } from 'dva'
import styles from '../General/Editables/Editables.less'

class EditableNetSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      showEdit: false,
      initValue: props.defaultValue,
      nowValue: props.defaultValue,
      text: props.text,
      nets: null,
    }
  }

  render() {
    const { nets } = this.state
    const { dispatch, app, loading, title, defaultValue, bindName, nocolon } = this.props
    if (this.state.edit) {
      if (nets === null) {
        return (
          <div className={styles.signleCenterRow}>
            <p>{title}{nocolon || '：'}</p>
            <span><Spin /></span>
          </div>
        )
      }
      return (
        <div className={styles.signleCenterRow}>
          <p>{title}{nocolon || '：'}</p>
          <Spin spinning={loading.effects[`${app.router.model}/edit`] === true}>
            <Select
              className={styles.input}
              defaultValue={defaultValue}
              onChange={(value) => {
                this.setState({ nowValue: value })
              }}
            >
              {
                nets.map((net, index) => (
                  <Select.Option value={net.id} key={`select_net_${index}`}>{net.name}</Select.Option>
                ))
              }
            </Select>
            <p>
              <Icon
                type="check"
                onClick={() => {
                  const payload = {}
                  payload[bindName] = this.state.nowValue
                  dispatch({
                    type: `${app.router.model}/edit`,
                    payload: { ...payload },
                    action: 'edit',
                    didAction: { type: 1 },
                  })
                }}
              />
            </p>
            <p>
              <Icon
                type="close"
                onClick={() => { this.setState({ edit: false, nowValue: this.state.initValue }) }}
              />
            </p>
          </Spin>
        </div>
      )
    }
    return (
      <div
        className={styles.signleCenterRow}
        onMouseOver={() => { this.setState({ showEdit: true }) }}
        onMouseLeave={() => { this.setState({ showEdit: false }) }}
      >
        <p>{title}{nocolon || '：'}</p>
        <p>{this.state.text}</p>
        {
          this.state.showEdit ?
            <p>
              <Icon
                type="edit"
                onClick={() => {
                  this.setState({ edit: true })
                  if (nets === null) {
                    dispatch({
                      type: 'shelf/getAllNetToSelect',
                      payload: {
                        cb: (data) => {
                          this.setState({ nets: data.results })
                        },
                      },
                    })
                  }
                }}
              />
            </p>
            : ''
        }
      </div>
    )
  }
}

function mapStateToProps({ app, loading }) {
  return { app, loading }
}

export default connect(mapStateToProps)(EditableNetSelect)
