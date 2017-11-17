import React from 'react'
import { connect } from 'dva'
import { Popconfirm, Button, Row, Col, Input, Select, DatePicker, Modal, InputNumber, message } from 'antd'
import { General } from 'components'
import cs from '../app.less'
import moment from 'moment'
import style from './index.less'
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
function MemberList({ dispatch, history, member, router }) {
  let { search, tempLists } = member
  const handle_open = (type,max,id) => {
    if (type) {
      type += 'Visible';
      componentState[type] = true;
      componentState.pointInfo = {num:'',intro:'',max,id};
      dispatch ({type:"member/success"})
    }
  }

  const point_cancel = () => {
    componentState.pointVisible = false;
    dispatch ({type:"member/success"})
  }
  const point_ok = () => {
    componentState.pointVisible = false;
    let {num,intro,id} = componentState.pointInfo;
    if (!num) message.warning ("核销积分不能为空");
    if (!intro) message.warning ("核销内容不能为空");
    if (num && intro) {
      componentState.pointInfo = {num:'',intro:''};
      dispatch ({
        type:"member/pointExchange",
        payload:{
          user_id:id,
          point:num,
          note:intro
        }})
    }
  }
  const columns = [
    {
      title: '会员昵称',
      dataIndex: 'nickname',
    },
    {
      title: '会员手机号码',
      dataIndex: 'phone',
    },
    {
      title: '会员等级',
      dataIndex: 'level',
      render:text => text == '0' ? '普通' : 'VIP'
    },
    {
      title: '会员来源',
      render:(text, record) => {
        let str = '住那儿网';
        str += record.group_id ? `-${record.group_name}` : '';
        str += record.team_id ? `-${record.team_name}` : '';
        return str;
      }
    },
    {
      title: '会员创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '会员积分',
      render: (text,record) => (
        <span>
          <span style={{marginRight:10}}>平台{record.point}</span>
          <span>本地{record.hotel_point}</span>
        </span>
      )
    },
    {
      title: '操作',
      render(record) {
        return (
          <div className={cs.tableAction}>
            <span onClick={() => { history.push(`/${router.model}/detail/${record.id}/groupMember`) }}>查看详情</span>
            {(+record.hotel_point) ? <span onClick={() => handle_open('point',record.point,record.id)}>核销积分</span> : ''}
          </div>
        )
      },
    },
  ]

  const renderMemberSource = list => {
    let arr = [];
    (list || []).map ((i,k) => {arr.push(<Option value={i} key={i}>{i}</Option>)})
    return arr
  }

  const filterList = (search,list) => {
    return list.filter (i => {
      let flag = true;
      if (search.nickname)
        search.name == i.nickname ? null : flag = false;
      if (search.membersource) {
        let str = '住那儿网';
        str += i.group_id ? `-${i.group_name}` : '';
        str += i.team_id ? `-${i.team_name}` : '';
        search.membersource == str ? null : flag = false;
      }
      if (search.memberlevel)
        search.memberlevel == i.level ? null : flag = false;
      if (search.phone)
        search.phone == i.phone ? null : flag = false;
      if (search.time)
        moment(i.create_time,'YYYY-MM-DD HH:mm:ss').isBetween(search.time[0],search.time[1]) ? null : flag = false;

      return flag;
    })
  }

  const handle_clear = () => {
    search = {}
    let lists = filterList (search,tempLists);
    dispatch ({
      type:"member/success",
      payload:{search,lists,count:lists.length,nowPage:1}
    })
  }

  const handle_search = () => {
    let lists = filterList (search,tempLists);
    dispatch ({
      type:"member/success",
      payload:{lists,count:lists.length,nowPage:1}
    })
  }

  return (
    <div>
      <div className={style.searchCase}>
        <Row>
          <Col span={8}>
            <label className={style.label}>用户昵称：</label>
            <Input
              className={style.formItem}
              placeholder="请输入用户昵称"
              value={search.nickname}
              onChange={e => {
                search.nickname = e.target.value;
                dispatch ({
                  type:"member/success",
                  payload:{}
                })
              }}
            />
          </Col>
          <Col span={8}>
            <label className={style.label}>会员来源：</label>
            <Select
              className={style.formItem}
              value={search.membersource}
              onChange={v => {
                search.membersource = v;
                dispatch ({
                  type:"member/success",
                  payload:{}
                })
              }}
            >{renderMemberSource (member.sourceArr)}</Select>
          </Col>
          <Col span={8}>
            <label className={style.label}>会员等级：</label>
            <Select
              className={style.formItem}
              value={search.memberlevel}
              onChange={v => {
                search.memberlevel = v;
                dispatch ({
                  type:"member/success",
                  payload:{}
                })
              }}
            >
              <Option value="0">普通</Option>
              <Option value="1">VIP</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <label className={style.label}>用户手机号：</label>
            <Input
              className={style.formItem}
              placeholder="请输入用户手机号"
              value={search.phone}
              onChange={e => {
                search.phone = e.target.value;
                dispatch ({
                  type:"member/success",
                  payload:{}
                })
              }}
            />
          </Col>
          <Col span={8}>
            <label className={style.label}>创建时间：</label>
            <RangePicker
              className={style.formItem}
              format='YYYY-MM-DD'
              value={search.time}
              onChange={(date,str) => {
                search.time = date;
                dispatch ({
                  type:"member/success"
                })
              }}
            />
          </Col>
          <Col span={8} style={{textIndent:142}}>
            <Button className={style.clearBtn} onClick={handle_clear}>清除</Button>
            <Button className={style.searchBtn} onClick={handle_search}>查询</Button>
          </Col>
        </Row>
      </div>

      <div className={style.searchCountCase} >
        共搜索到<span className={style.searchCount}>{member.count}</span>条信息
      </div>

      <div className={cs.whitebg}>
        <DataTable
          columns={columns}
          model={member}
          onChange={p => {
            dispatch ({
              type:"member/success",
              payload:{
                nowPage:p,
              }
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
              max={parseInt(componentState.pointInfo.max || 0)}
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
    </div>

  )
}

function mapStateToProps({ app, member }) {
  return { member, router: app.router }
}

export default connect(mapStateToProps)(MemberList)
