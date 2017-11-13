import React from 'react'
import { connect } from 'dva'
import { Button, Form, Input, InputNumber, message } from 'antd'
import { General } from 'components'
import cs from '../app.less'

const FormItem = Form.Item
const { TextArea } = Input
const { FAButton, MultiUpFile } = General
class ProductAdd extends React.Component {
  state = {
    imgs: [],
  }

  render() {
    const { form, dispatch, history, loading, router } = this.props
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
      if (this.state.imgs.length <= 0) {
        message.error('必须上传1~3张图片')
        return
      }
      form.validateFields((err, values) => {
        e.preventDefault()
        if (!err) {
          dispatch({
            type: `${router.model}/edit`,
            payload: {
              ...values,
              imgs: this.state.imgs,
            },
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
        <div className={cs.title}>添加商品</div>
        <div className={cs.whitebgp}>
          <Form onSubmit={handleSubmit} >
            <FormItem {...formItemLayout} label="商品图片">
              <MultiUpFile
                imgs={this.state.imgs}
                dispatch={dispatch}
                onChange={(imgs) => {
                  this.setState({
                    imgs,
                  })
                }}
                length={3}
              />
            </FormItem>

            <FormItem {...formItemLayout} label="商品条码">
              {getFieldDecorator('barcode', {
                rules: [
                  { required: true, message: '请填入条码' },
                ],
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="商品名称">
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: '请填入名称' },
                ],
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="生产厂家">
              {getFieldDecorator('manufacturer', {
                rules: [
                  { required: true, message: '请填入生产厂家' },
                ],
              })(
                <Input />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="销售价格">
              {getFieldDecorator('price', {
                rules: [
                  { required: true, message: '请填入销售价格' },
                ],
              })(
                <InputNumber
                  step={0.01}
                />,
              )}
            </FormItem>

            <FormItem {...formItemLayout} label="商品详情">
              {getFieldDecorator('intro', {
                rules: [
                  { required: true, message: '请填入数据' },
                ],
              })(
                <TextArea />,
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

export default connect(mapStateToProps)(Form.create()(ProductAdd))
