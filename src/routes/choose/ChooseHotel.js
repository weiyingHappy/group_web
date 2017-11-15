import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import styles from './index.less'

const FormItem = Form.Item

const ChooseHotel = ({loading, choose,dispatch}) => {
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
    <div className={styles.form}>
      ChooseHotel
    </div>
  )
}


export default connect(({ loading, choose }) => ({ loading, choose }))(ChooseHotel)
