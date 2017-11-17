import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Button, Row, Form, Input } from 'antd'
import styles from './index.less'
import left from '../../assets/left.png'
import right from '../../assets/right.png'

let position = {
  x:0,
  max:0
};

const ChooseHotel = ({loading, choose,dispatch}) => {
  let { lists } = choose
  lists = lists || []

  const renderImgs = list => {
    let arr = [];
    list = list || []
    list.map ((i,k) => arr.push (
      <li key={k} className={styles.hotelItem} onClick={()=>{
        dispatch ({type:"choose/toTeam",payload:i.team_id})
      }}>
        <img src={i.imgs ? i.imgs[0] : ''} />
        <span>{i.name}</span>
      </li>
    ))
    position.max = Math.floor(304*list.length/904)*904
    return <ul className={styles.hotels} style={{width:304*list.length,position:'relative',left:-position.x}}>{arr}</ul>;
  }

  const translate = type => {
    console.log (type,position)
    if (type == 'left' && position.x < position.max) {
      console.log ('+')
      position.x += 904;
      dispatch ({type:"choose/success"})
    } else if (type == 'right' && position.x > 0) {
      console.log ('-')
      position.x -= 904;
      dispatch ({type:"choose/success"})
    }
  }

  return (
    <div className={styles.choose_hotel}>
      <div className={styles.main}>
        <h1>选择要进入的酒店</h1>
        <div className={styles.imgs}>{renderImgs(lists)}</div>
        <img src={left} className={styles.left} onClick={()=>translate('left')}/>
        <img src={right} className={styles.right} onClick={()=>translate('right')} />
      </div>
    </div>
  )
}


export default connect(({ loading, choose }) => ({ loading, choose }))(ChooseHotel)
