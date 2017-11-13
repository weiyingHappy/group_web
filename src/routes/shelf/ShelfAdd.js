import React from 'react'
import { Button, Form, Input, message } from 'antd'
import { General, Special } from 'components'
import { connect } from 'dva'
import cs from '../app.less'

const FormItem = Form.Item
const { FAButton } = General
const { NetSelect } = Special
class ShelfAdd extends React.Component {
  state = {
    net_id: null,
  }
  render() {
    const { dispatch, history, loading, router, form } = this.props
    const { getFieldDecorator } = form
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 8 },
      hasFeedback: true,
    }

    const tailformItemLayout = {
      wrapperCol: { span: 8, offset: 2 },
    }
    const handleSubmit = (e) => {
      e.preventDefault()
      if (this.state.net_id === null || this.state.net_id === '-1') {
        message.error('请先选择网店')
        return
      }
      form.validateFields((err, values) => {
        if (!err) {
          dispatch({
            type: `${router.model}/edit`,
            payload: { ...values, net_id: this.state.net_id },
            action: 'add',
            didAction: { type: 2 },
          })
        }
      })
    }

    return (
      <div>
        <div className={cs.actionTitle}>
          <Button icon="rollback" onClick={() => { history.go(-1) }} >返回</Button>
        </div>
        <div className={cs.title}>添加货架</div>
        <div className={cs.whitebgp}>
          <Form onSubmit={handleSubmit}>
            <FormItem {...formItemLayout} label="网点名称">
              {getFieldDecorator('net_id', {
                rules: [
                  { required: true, message: '请填入名称' },
                ],
              })(
                <NetSelect onChange={(value) => { this.setState({ net_id: value }) }} />
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="联系人">
              {getFieldDecorator('contact', {
                rules: [
                  { required: true, message: '请填入货架联系人' },
                ],
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="联系电话">
              {getFieldDecorator('contact_phone', {
                rules: [
                  { required: true, message: '请填入货架联系人电话' },
                ],
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem {...tailformItemLayout}>
              <FAButton loading={loading} model={router.model} />
            </FormItem>
          </Form>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ loading, app }) {
  return { loading, router: app.router }
}

export default connect(mapStateToProps)(Form.create()(ShelfAdd))
