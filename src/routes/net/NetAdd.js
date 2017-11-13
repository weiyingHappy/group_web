import React from 'react'
import { Button, Form, Input, Col } from 'antd'
import { General } from 'components'
import { connect } from 'dva'
import cs from '../app.less'

const FormItem = Form.Item
const { FAButton } = General

function NetAdd({ dispatch, history, loading, router, form }) {
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
      <div className={cs.title}>添加网点</div>
      <div className={cs.whitebgp}>
        <Form onSubmit={handleSubmit}>
          <FormItem {...formItemLayout} label="网点名称">
            {getFieldDecorator('name', {
              rules: [
                { required: true, message: '请填入数据' },
              ],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="企业名称">
            {getFieldDecorator('enterprise_name', {
              rules: [
                { required: true, message: '请填入数据' },
              ],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="联系人">
            {getFieldDecorator('contact', {
              rules: [
                { required: true, message: '请填入数据' },
              ],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="联系电话">
            {getFieldDecorator('contact_phone', {
              rules: [
                { required: true, message: '请填入数据' },
              ],
            })(
              <Input />,
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="地址">
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('province', {
                  rules: [
                    { required: true, message: '请填入数据' },
                  ],
                })(
                  <Input placeholder="省" />,
                )}
              </FormItem>
            </Col>
            <Col span={1}>
              <p className="ant-form-split">-</p>
            </Col>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('city', {
                  rules: [
                    { required: true, message: '请填入数据' },
                  ],
                })(
                  <Input placeholder="市" />,
                )}
              </FormItem>
            </Col>
            <Col span={1}>
              <p className="ant-form-split">-</p>
            </Col>
            <Col span={7}>
              <FormItem>
                {getFieldDecorator('area', {
                  rules: [
                    { required: true, message: '请填入数据' },
                  ],
                })(
                  <Input placeholder="区" />,
                )}
              </FormItem>
            </Col>
          </FormItem>
          <FormItem {...formItemLayout} label="详细地址">
            {getFieldDecorator('address', {
              rules: [
                { required: true, message: '请填入数据' },
              ],
            })(
              <Input.TextArea rows={4} placeholder="详细地址……" />,
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

export default connect(mapStateToProps)(Form.create()(NetAdd))
