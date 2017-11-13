import React from 'react'
import { Icon, Spin, Select } from 'antd'
import { connect } from 'dva'
import styles from './Editables.less'

class EditableSelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      edit: false,
      showEdit: false,
      initValue: props.defaultValue,
      nowValue: props.defaultValue,
      selectedName: null,
    }
  }

  componentWillMount() {
    this.setSelectName(this.props.defaultValue)
  }

  setSelectName = (value) => {
    const selected = this.props.selects.find((i) => { return i.value == value })
    this.setState({ selectedName: selected.name })
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
          this.setSelectName(this.state.nowValue)
          this.setState({ edit: false, initValue: this.state.nowValue })
        },
      },
    })
  }

  render() {
    const Option = Select.Option
    const { router, loading, title, defaultValue, nocolon } = this.props
    if (this.state.edit) {
      return (
        <div className={styles.signleCenterRow}>
          <p>{title}{nocolon || '：'}</p>
          <Spin spinning={loading.effects[`${router.model}/edit`] === true}>
            <Select
              className={styles.input}
              defaultValue={defaultValue}
              onChange={(value) => {
                this.setState({ nowValue: value })
              }}
            >
              {(this.props.selects || []).map((item) => {
                return (
                  <Option value={`${item.value}`} key={`${item.value}`}>
                    {item.name}
                  </Option>
                )
              }
              )}
            </Select>
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
        <p>{this.state.selectedName}</p>
        {
          this.state.showEdit ?
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

export default connect(mapStateToProps)(EditableSelect)
