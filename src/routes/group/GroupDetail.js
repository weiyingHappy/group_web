import React from 'react'
import { connect } from 'dva'
import { Button, Input, Upload, Progress  } from 'antd'
import { General } from 'components'
import cs from '../app.less'
import style from './index.less'
import plus from "../../assets/jia.png";
import config from 'config'
const { TextArea } = Input;

let groupDetailState = false     //利用闭包模拟组件内状态库

const { DataTable, SearchBar } = General
function GroupDetail({ dispatch, history, group, router, loading }) {
  let {
    group_contact, group_id, group_img, group_intro, group_name, group_phone,
    group_state
  } = group.detail || {} ;
  if (loading['group/query']) {
    groupDetailState = false  //在请求页面时重置状态
  }
  const renderImg = (img, flag) => {
    let arr = [];
    if (!flag) {
      (img || []).map ((i,k) => arr.push (
        <img src={i} key={k} style={{marginRight:10,width:236,height:180}} />
      ))
    } else {
      (img || []).map ((i,k) => arr.push (
        <span key={k} style={{display:"inline-block",marginRight:10,marginBottom:10,width:236,height:200,position:"relative",color:"#8A6432"}}>
          <img src={i} style={{width:236,height:180}} />
          <Upload {...{
              action: "https://up.qbox.me/",
              listType: "picture",
              data: { token: group.qiniuToken },
              beforeUpload:(file,fileList) => {
                console.log ("fileList",fileList)
              },
              onChange(info) {
                if (info.file.status === "done") {
                  info.fileList.splice (0,info.fileList.length)
                  group_img.splice (k,1,config.qiniuPrefix + info.file.response.hash)
                  dispatch ({
                    type:"group/success",
                    payload:{}
                  })
                }
              }
            }}>
            <span style={{position:"absolute",bottom:0,left:0,cursor:"pointer"}}>更换</span>
          </Upload>
          <span
            style={{position:"absolute",bottom:0,left:44,cursor:"pointer"}}
            onClick={() => {
              group_img.splice (k,1)
              dispatch ({
                type:"group/success",
                payload:{}
              })
            }}
          >删除</span>
        </span>
      ))
      arr.push (
        <Upload {...{
          action: "https://up.qbox.me/",
          listType: "picture",
          data: { token: group.qiniuToken },
          key:"last",
          onChange(info) {
            if (info.file.status === "done") {
              info.fileList.splice (0,info.fileList.length)
              group_img.push (config.qiniuPrefix + info.file.response.hash);
              dispatch ({
                type:"group/success",
                payload:{}
              })
            }
          }
        }}>
          <div className={style.upload_pic_img_text}>
            <img src={plus} alt="" />
            <p>点击添加图片</p>
          </div>
        </Upload>
      )
    }

    return arr;
  }
  return (
    <div>
      <div className={cs.whitebg}>
        <div className={style.caseItem}>
          <h1>酒店集团信息</h1>
          <p className={style.mainInfo}>
            <label>酒店集团名称：</label>
            <span>{group_name}</span>
            <br/>
            <label>酒店集团编号：</label>
            <span>{group_id}</span>
            <br/>
            <lable>联系人：</lable>
            <span>{group_contact}</span>
            <br/>
            <lable>联系人手机号：</lable>
            <span>{group_phone}</span>
          </p>
        </div>

        <div className={style.caseItem}>
          <h1>基本信息
            <Button className={style.basicBtn} onClick={() => {
              if (groupDetailState) {
                dispatch ({
                  type:"group/editGroup",
                  payload:{...group.detail}
                })
              }
              groupDetailState = !groupDetailState;
              dispatch ({
                type:"group/success",
                payload:{}
              })
            }}>{groupDetailState ? '保存' : '编辑'}</Button>
          </h1>
          <div className={style.basicInfo}>
            <label>集团简介:</label>
            <p>{groupDetailState ?
              <TextArea
                className={style.textArea}
                placeholder="请输入集团酒店简介"
                value={group_intro}
                onChange={(e) => {
                  group.detail.group_intro = e.target.value;
                  dispatch ({
                    type:"group/success",
                    payload:{}
                  })
                }}
              /> :
              group_intro}</p>
            <div style={{height:40}}></div>
            <label>集团图片:</label>
            <div>{renderImg(group_img, groupDetailState)}</div>
          </div>

        </div>
      </div>
    </div>
  )
}

function mapStateToProps({ app, group, loading }) {
  return { group, loading, router: app.router }
}

export default connect(mapStateToProps)(GroupDetail)
