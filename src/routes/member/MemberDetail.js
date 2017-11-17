import React from 'react'
import { connect } from 'dva'
import { Button, Input, message, Row, Col, Modal, InputNumber, Select  } from 'antd'
import { General } from 'components'
import cs from '../app.less'
import style from './index.less'
import plus from "../../assets/jia.png";
import config from 'config'
const { TextArea } = Input;
const Option = Select.Option;

let componentState = {
  pointVisible:false,
  couponVisble:false,
  pointInfo:{
    num:'',
    intro:''
  },
  couponInfo:{
    type:'',
    num:''
  }
}                 //利用闭包模拟组件数据仓库

const { DataTable, SearchBar } = General
function MemberDetail({ dispatch, history, member, router, loading }) {
  let { detail, order, point, listCoupon } = member;
  detail = detail || {};
  order = order || {};
  point = point || {};
  listCoupon = listCoupon || [];

  const renderListCoupon = list => {
    let arr = [];
    (list || []).map ((i,k) => arr.push (
      <Option key={k} value={i.id}>{i.title}</Option>
    ))
    return arr;
  }

  const renderCoupons = list => {
    let arr = [],filterCoupon = [];
    // (list || []).map ((i,k) => arr.push(
    //   <div className={style.couponItem} key={k}>
    //     <span>{i.title}</span>
    //   </div>
    // ))
    (list || []).map (i => {
      let index = -1;
      filterCoupon.map ((t,k) => {
        if (t.coupon_type == i.coupon_type)
          index = k;
      })
      if (index != -1)
        filterCoupon[index].num++;
      else
        filterCoupon.push ({title:i.title,num:1,coupon_type:i.coupon_type})
    })
    filterCoupon.map ((i,k) => arr.push(
      <div className={style.couponItem} key={k}>
        <span>{i.title}</span>
        {i.num-1?<label>{i.num}张</label>:''}
      </div>
    ))
    return arr;
  }

  const calcUsed = list => {
    if (list) {
      let count = 0;
      list.map(i => i.used == 1?count++:null);
      return count;
    } else
      return 0;
  }

  const handle_open = (type) => {
    if (type) {
      type += 'Visible';
      componentState[type] = true;
      dispatch ({type:"member/success"})
    }
  }

  const point_cancel = () => {
    componentState.pointVisible = false;
    componentState.pointInfo = {num:'',intro:''};
    dispatch ({type:"member/success"})
  }
  const point_ok = () => {
    componentState.pointVisible = false;
    let {num,intro} = componentState.pointInfo;
    if (!num) message.warning ("核销积分不能为空");
    if (!intro) message.warning ("核销内容不能为空");
    if (num && intro) {
      componentState.pointInfo = {num:'',intro:''};
      dispatch ({
        type:"member/pointExchange",
        payload:{
          user_id:router.id,
          point:num,
          note:intro
        }})
    }
  }
  const coupon_cancel = () => {
    componentState.couponVisible = false;
    componentState.couponInfo = {num:'',intro:''};
    dispatch ({type:"member/success"})
  }
  const coupon_ok = () => {
    componentState.couponVisible = false;
    let {num,type} = componentState.couponInfo;
    if (!num) message.warning ("优惠券数量不能为空");
    if (!type) message.warning ("优惠券类型不能为空");
    if (num && type) {
      componentState.pointInfo = {num:'',intro:''};
      dispatch ({
        type:"member/sendCoupon",
        payload:{
          user_id:router.id,
          coupon_id:type,
          num,
          phone:detail.phone
        }})
    }
  }

  const orderColumns = [
    {
      title:"订单类型",
      dataIndex:"type",
      render:text => {
        switch (+text) {
          case 0: return '普通订单';
          case 1: return '抢房订单';
          case 2: return '门店订单';
          case 3: return '到店支付订单';
          default: return '';
        }
      }
    },
    {
      title:"订单编号",
      dataIndex:"order_no"
    },
    {
      title:"下单时间",
      dataIndex:"create_time"
    },
    {
      title:"入离时间",
      render:(text,record) => (
        <div>
          <span>{record.create_time.split(' ')[0]}</span>
          <br />
          <span>至{record.end}</span>
        </div>
      )
    },
    {
      title:"订单金额",
      dataIndex:"pay_price"
    },
    {
      title:"支付类型",
      dataIndex:"pay_type"
    },
    {
      title:"订单状态",
      dataIndex:"state"
    },
    {
      title:"操作",
      render:(text, record) => (
        <div className={cs.tableAction}>
          <span onClick={() => { history.push(`/member/member_detail/${record.order_no}`) }}>查看详情</span>
        </div>
      )
    },
  ]
  const orderModel = {
    nowPage:order.nowPage || 0,
    count:order.totalPage*10 || 0,
    lists:order.lists || [],
    rowkey:"user_id",
  }

  const pointColumns = [
    {
      title:"来源/用途",
      dataIndex:"etc"
    },
    {
      title:"积分数量",
      dataIndex:"point"
    },
    {
      title:"日期",
      dataIndex:"create_time"
    },
    {
      title:"备注",
      dataIndex:"note"
    },
    {
      title:"订单编号",
      dataIndex:"id"
    },
    // {
    //   title:"操作",
    //   dataIndex:'object_id',
    //   render:(text, record) => (
    //     <div className={cs.tableAction}>
    //       {text?<span onClick={() => { history.push(`/member/member_detail/${record.object_id}`) }}>查看详情</span>:''}
    //     </div>
    //   )
    // },
  ]
  const pointModel = {
    nowPage:point.nowPage || 0,
    count:point.totalPage*10 || 0,
    lists:point.lists || [],
    onChange:p => {
      console.log(p)
    }
  }

  return (
    <div>
      <div className={style.detailCase}>
        <h1 className={style.caseTitle}>会员详情</h1>
        <Row>
          <Col span={6}>
            <label className={style.label}>微信昵称：</label>
            <span>{detail.nickname}</span>
          </Col>
          <Col span={6}>
            <label className={style.label}>会员账号：</label>
            <span>{detail.phone}</span>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <label className={style.label}>会员手机号：</label>
            <span>{detail.phone}</span>
          </Col>
          <Col span={6}>
            <label className={style.label}>住金/余额：</label>
            <span>{detail.account}</span>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <label className={style.label}>酒店/集团积分：</label>
            <span>{detail.point || 0}</span>
          </Col>
          <Col span={6}>
            <label className={style.label}>本地积分：</label>
            <span>{detail.hotel_point || 0}</span>
          </Col>
        </Row>
      </div>

      <div className={style.detailCase} >
        <h1 className={style.caseTitle}>会员积分</h1>
        <div className={style.caseInfo}>
          <div className={style.PointDiv} style={{marginRight:40}}>
            酒店/集团积分：{detail.point || 0}
          </div>
          <div className={style.PointDiv}>
            本地积分：{detail.hotel_point || 0}
          </div>
          <Button
            className={style.caseBtn}
            onClick={() => {
              detail.hotel_point ? handle_open('point') : message.warning('本地积分为空，不能核销')
            }}
          >核销积分</Button>
        </div>
      </div>

      {/* <div className={style.detailCase} >
        <h1 className={style.caseTitle}>他的优惠券</h1>
        <div className={style.caseInfo}>
          <span className={style.description}>可用优惠券&nbsp;<span>{detail.coupon ? detail.coupon.length : 0}张</span></span>
          <Button className={style.caseBtn} onClick={() => handle_open('coupon')}>发放优惠券</Button>
          <div className={style.coupons}>{renderCoupons(detail.coupon)}</div>
          <span className={style.description}>已用优惠券&nbsp;<span>{calcUsed(detail.coupon)}张</span></span>
        </div>
      </div> */}

      <div className={style.detailCase} >
        <h1 className={style.caseTitle}>他的订单</h1>
        <div className={style.caseInfo}>
          <DataTable
            columns={orderColumns}
            model={orderModel}
            onChange={p => {
              dispatch ({
                type:"member/getMemberOrder",
                payload:{user_id:router.id,page:p}
              })
            }}
          />
        </div>
      </div>

      <div className={style.detailCase} >
        <h1 className={style.caseTitle}>积分记录</h1>
        <DataTable
            columns={pointColumns}
            model={pointModel}
            onChange={p => {
              dispatch ({
                type:"member/getMemberPoint",
                payload:{user_id:router.id,page:p}
              })
            }}
          />
      </div>

      <Modal
        title="核销积分"
        visible={componentState.pointVisible}
        onCancel={point_cancel}
        onOk={point_ok}
      >
        <div className={style.modal}>
          <Row>
            <label>核销积分数:</label>
            <InputNumber
              min={0}
              max={parseInt(detail.hotel_point || 0)}
              style={{width:200}}
              value={componentState.pointInfo.num}
              onChange={v => {
                componentState.pointInfo.num = v;
                dispatch ({type:"member/success"})
              }}
            />
          </Row>
          <Row>
            <label>核销积分内容:</label>
            <TextArea
              style={{width:365,height:60}}
              value={componentState.pointInfo.intro}
              onChange={e => {
                componentState.pointInfo.intro = e.target.value;
                dispatch ({type:"member/success"})
              }}
            />
          </Row>
        </div>
      </Modal>

      <Modal
        title="发放优惠券"
        visible={componentState.couponVisible}
        onCancel={coupon_cancel}
        onOk={coupon_ok}
      >
        <div className={style.modal}>
          <Row>
            <label>优惠券类型:</label>
            <Select
              min={0}
              style={{width:200}}
              value={componentState.couponInfo.type}
              onChange={v => {
                componentState.couponInfo.type = v;
                dispatch ({type:"member/success"})
              }}
            >{renderListCoupon(listCoupon)}</Select>
          </Row>
          <Row>
            <label>优惠券数量:</label>
            <InputNumber
              style={{width:200}}
              value={componentState.couponInfo.num}
              onChange={e => {
                componentState.couponInfo.num = e;
                dispatch ({type:"member/success"})
              }}
            />
          </Row>
        </div>
      </Modal>
    </div>
  )
}

function mapStateToProps({ app, member, loading }) {
  return { member, loading, router: app.router }
}

export default connect(mapStateToProps)(MemberDetail)
