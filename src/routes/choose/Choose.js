import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import styles from './index.less'

const FormItem = Form.Item

const Choose = ({loading,dispatch,history}) => {
  function handleOk () {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        console.log (errors)
        return
      }
      dispatch({ type: 'app/login', payload: values })
    })
  }

  return (
    <div className={styles.choose}>
      <div className={styles.main}>
        <h1>选择要进入的管理系统</h1>
        <div className={styles.left} onClick={() => {
          history.push ('/team/list/1/groupManage')
        }}>
          <p>图片</p>
          <label>集团管理平台</label>
        </div>
        <div className={styles.right} onClick={() => {
          history.push ('/choose_hotel')
        }}>
          <p>图片</p>
          <label>酒店平台</label>
        </div>
      </div>
    </div>
  )
}

export default connect(({ loading }) => ({ loading }))(Choose)
