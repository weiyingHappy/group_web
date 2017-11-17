import React from 'react'
import { connect } from 'dva'
import { Popconfirm, Button, Row, Col, Input, Select, DatePicker, Modal, InputNumber, message } from 'antd'
import { General } from 'components'
import cs from '../app.less'
import moment from 'moment'
import styles from './index.less'
const Option = Select.Option
const { TextArea } = Input
const { RangePicker } = DatePicker

let componentState = {
  pointVisible:false,
  couponVisble:false,
  pointInfo:{
    num:'',
    intro:'',
    max:1,
    id:''
  },
  couponInfo:{
    type:'',
    num:''
  }
}

const { DataTable, SearchBar } = General
function MemberOrderDetail({ dispatch, history, member, router }) {
  let { orderDetail } = member
  orderDetail = orderDetail || {}

  console.log ('orderDetail',orderDetail)

  const filter_type = value => {
    switch (Number(value)) {
      case 0:
        return "平台订单";
      case 1:
        return "抢房订单";
      case 2:
        return "门店订单";
      case 3:
        return "到店支付订单";
    }
  };
  const filter_state = value => {
    switch (Number(value)) {
      case 0:
        return "待支付";
      case 1:
        return "已支付";
      case 2:
        return "已确认";
      case 10:
        return "已完成";
      case 11:
        return "用户取消";
      case 12:
        return "商户取消";
      case 13:
        return "平台强行取消";
    }
  };
  return (
    <div>
      <div className={"yz_container " + styles.container}>
        <div className={styles.room_wrap} style={{ marginBottom: 59 }}>
          <p className={styles.roomMsg}>房型信息</p>
          <table className={styles.tab}>
            <thead>
              <tr>
                <th>房型名称</th>
                <th>数量/间</th>
                <th>房型住一天的价格</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {orderDetail.room_name}
                </td>
                <td>
                  {orderDetail.num}
                </td>
                <td style={{ color: "#FF3333" }}>
                  ￥{orderDetail.price / orderDetail.days}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className={styles.room_wrap + " " + styles.order_wrap}
          style={{
            marginBottom: 20,
            display: orderDetail.package_id ? "block" : "none"
          }}
        >
          <p className={styles.roomMsg}>套餐信息</p>
          <table className={styles.tab}>
            <thead>
              <tr>
                <th>套餐名称</th>
                <th>套餐内容</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {orderDetail.package_snapshot
                    ? orderDetail.package_snapshot.name
                    : " "}
                </td>
                <td>
                  {orderDetail.package_snapshot
                    ? (orderDetail.package_snapshot.products || [])
                        .map((item, i) =>
                          <span style={{ marginRight: 15 }} key={i}>
                            {item.product_name}*{item.num}
                          </span>
                        )
                    : " "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div
          className={styles.room_wrap + " " + styles.order_wrap}
          style={{ marginBottom: 59, borderBottom: "none" }}
        >
          <p className={styles.roomMsg}>订单详情</p>
          <ul className={styles.item_orderNo}>
            <li>
              订单编号：{orderDetail.order_no}
            </li>
          </ul>
          <ul className={styles.item_left}>
            <li>
              订单类型：{filter_type(orderDetail.type)}
            </li>
            <li>
              下单用户：{orderDetail.phone}
            </li>
            <li>
              入住人：{orderDetail.user_name}
              {/* ---{orderDetail.level} */}
            </li>
            <li>
              入住时间：{orderDetail.start}
            </li>
          </ul>
          <ul className={styles.item_right}>
            <li>
              订单状态：{filter_state(orderDetail.state)}
            </li>
            <li>
              下单时间：{orderDetail.create_time}
            </li>
            <li>
              入住人手机号：{orderDetail.phone}
            </li>
            <li>
              离开时间：{orderDetail.end}
            </li>
          </ul>
        </div>

        <div
          className={styles.room_wrap + " " + styles.order_wrap}
          style={{ borderBottom: "none" }}
        >
          <p className={styles.roomMsg}>支付费用</p>
          <ul className={styles.item_left}>
            <li>
              实际支付金额：<span style={{ color: "#FF3333" }}>
                ￥{orderDetail.pay_price}
              </span>
            </li>
            <li>
              商户优惠：<span style={{ color: "#FF3333" }}>
                ￥{orderDetail.discount_merchant}
              </span>
            </li>
          </ul>
          <ul className={styles.item_right}>
            <li>积分支出：0</li>
            <li>
              平台优惠：<span style={{ color: "#FF3333" }}>
                ￥{orderDetail.discount_ulive}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>

  )
}

function mapStateToProps({ app, member }) {
  return { member, router: app.router }
}

export default connect(mapStateToProps)(MemberOrderDetail)
