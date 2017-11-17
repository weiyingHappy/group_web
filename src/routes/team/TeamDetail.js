import React from 'react'
import { connect } from 'dva'
import { Popconfirm, Button, Row, Col } from 'antd'
import { General } from 'components'
import cs from '../app.less'
import style from './index.less'

const { DataTable, SearchBar } = General
function TeamDetail({ dispatch, history, team, router }) {
  let { detail } = team;
  detail = detail || {};

  const renderImgs = list => {
    let arr = [];
    (list || []).map ((i,k) => arr.push (
      <img key={k} src={i} style={{width:236,height:180,marginRight:15,marginBottom:15}} />
    ))
    return arr;
  }
  return (
    <div>
      <div className={cs.whitebg}>
        <div className={style.detailCase}>
          <h1 className={style.title}>酒店详情</h1>
          <Row>
            <Col span={8}>
              <label className={style.label}>酒店名称：</label>
              <span>{detail.name}</span>
            </Col>
            <Col span={8}>
              <label className={style.label}>酒店电话：</label>
              <span>{detail.telphone}</span>
            </Col>
            <Col span={8}>
              <label className={style.label}>酒店地址：</label>
              <span>{detail.address}</span>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <label className={style.label}>酒店邮箱：</label>
              <span>{detail.email}</span>
            </Col>
            <Col span={8}>
              <label className={style.label}>酒店政策：</label>
              <span>{detail.policy}</span>
            </Col>
          </Row>
        </div>

        <div className={style.detailCase}>
          <h1 className={style.title}>酒店信息</h1>
          <div className={style.picText}>
            <label>酒店介绍：</label>
            <p>{detail.intro}</p>
            <label>酒店图片：</label>
            <p>{renderImgs(detail.imgs)}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

function mapStateToProps({ app, team }) {
  return { team, router: app.router }
}

export default connect(mapStateToProps)(TeamDetail)
