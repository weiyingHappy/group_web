import React from 'react'
import { Button, Select, Form, Input } from 'antd'
import { General } from 'components'
import { connect } from 'dva'
import cs from '../app.less'

const Option = Select.Option
const FormItem = Form.Item
const { FAButton } = General
function StaffAdd({ dispatch, history, loading, router, form }) {
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
    form.validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: `${router.model}/edit`,
          payload: values,
          action: 'add',
          didAction: { type: 2 },
        })
      }
    })
    return ''
  }

  return (
    <div>
      <div className={cs.actionTitle}>
        <Button icon="rollback" onClick={() => { history.go(-1) }} >返回</Button>
      </div>
      <div className={cs.title}>添加成员</div>
      <div className={cs.whitebgp}>
        <Form onSubmit={handleSubmit}>
          <FormItem {...formItemLayout} label="权限">
            {getFieldDecorator('role_id', {
              rules: [
                { required: true, message: '请选择' },
              ],
              initialValue: '1',
            })(
              <Select>
                <Option value="1" key="1">超级管理员</Option>
                <Option value="2" key="2">管理员</Option>
                <Option value="3" key="3">普通员工</Option>
                <Option value="4" key="4">配送</Option>
              </Select>,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="用户名称">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '请填入数据' },
              ],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="手机号码">
            {getFieldDecorator('phone', {
              rules: [
                { required: true, message: '请填入数据' },
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

function mapStateToProps({ loading, app }) {
  return { loading, router: app.router }
}

export default connect(mapStateToProps)(Form.create()(StaffAdd))
