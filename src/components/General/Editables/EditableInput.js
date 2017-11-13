import React from 'react'
import { Icon, Spin, Input } from 'antd'
import { connect } from 'dva'
import styles from './Editables.less'

class EditableInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      showEdit: false,
      initValue: props.value,
      nowValue: props.value,
    }
  }

  handleChange = () => {
    if (this.state.initValue == this.state.nowValue) {
      this.setState({ edit: false })
      return
    }
    const { dispatch, bindName, router } = this.props
    const payload = {}
    payload[bindName] = this.state.nowValue
    dispatch({
      type: `${router.model}/edit`,
      payload: { ...payload },
      action: 'edit',
      didAction: {
        type: 0,
        cb: () => {
          this.setState({ edit: false, initValue: this.state.nowValue })
        },
      },
    })
  }

  render() {
    const { router, loading, title, noedit, nocolon, textarea } = this.props
    if (this.state.edit) {
      return (
        <div className={styles.signleCenterRow}>
          <p>{title}{nocolon || '：'}</p>
          <Spin spinning={loading.effects[`${router.model}/edit`] === true}>
            <p className={styles.input}>
              {
                textarea ?
                  <Input.TextArea
                    autosize
                    style={{ width: '100%' }}
                    value={this.state.nowValue}
                    onChange={(e) => { this.setState({ nowValue: e.target.value }) }}
                  />
                  :
                  <Input
                    value={this.state.nowValue}
                    onChange={(e) => { this.setState({ nowValue: e.target.value }) }}
                  />
              }
            </p>
            <p>
              <Icon type="check" onClick={this.handleChange} />
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
        <p>{this.state.initValue}</p>
        {
          this.state.showEdit && noedit !== true ?
            <p>
              <Icon
                type="edit"
                onClick={() => { this.setState({ edit: true }) }}
              />
            </p>
            : ''
        }
      </div>
    )
  }
}

function mapStateToProps({ app, loading }) {
  return { router: app.router, loading }
}

export default connect(mapStateToProps)(EditableInput)
