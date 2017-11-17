import modelExtend from 'dva-model-extend'
import { commonModel } from './common'
import { getMemberList, getMemberOrder, getMemberPoint,
          pointExchange, sendCoupon, listCoupon, getMemberOrderDetail } from 'services/member'

export default modelExtend(commonModel, {
  namespace: 'member',

  subscriptions: {
    setup({ dispatch,history }) {
      history.listen (location => {
        let pathname = location.pathname.split('/');
        console.log ('pathname',pathname)
        if (pathname.indexOf ('list') > -1 && pathname.indexOf ('member') > -1) {
          dispatch ({type:"getMemberList"})
        }
        if (pathname.indexOf('detail') > -1 && pathname.indexOf ('member') > -1) {
          dispatch ({type:"query"})
          dispatch ({type:"getDetailList"})
        }
        if (pathname.indexOf('member_detail') > -1) {
          dispatch ({type:'getMemberOrderDetail',payload:pathname[pathname.length-1]})
        }
      })
    },
  },

  effects: {
    *getMemberList ({}, {call, put}) {
      console.log('getMemberList')
      const data = yield call (getMemberList);
      if (data.code && data.code == 200) {
        let arr = [];
        (data.results || []).map ((i,k) => {
          let str = '住那儿网';
          str += i.group_id ? `-${i.group_name}` : '';
          str += i.team_id ? `-${i.team_name}` : '';
          if (arr.indexOf(str) == -1)
            arr.push (str)
        })
        let tempLists = data.results ? JSON.parse(JSON.stringify(data.results)) : [];
        console.log ('success')
        yield put ({
          type:"success",
          payload:{lists:data.results || [],nowPage:1,count:data.results.length || 0,sourceArr:arr,tempLists}
        })
      }
    },
    *getMemberOrder ({payload},{call, put}) {
      const data = yield call (getMemberOrder,payload);
      if (data.code && data.code == 200) {
        yield put ({
          type:'success',
          payload:{order:data.results}
        })
      }
    },
    *getMemberPoint ({payload},{call, put}) {
      const data = yield call (getMemberPoint,payload);
      if (data.code && data.code == 200) {
        yield put ({
          type:'success',
          payload:{point:data.results}
        })
      }
    },
    *getMemberOrderDetail ({payload},{call, put}) {
      const data = yield call (getMemberOrderDetail,payload);
      if (data.code && data.code == 200) {
        yield put ({
          type:'success',
          payload:{orderDetail:data.results}
        })
      }
    },
    *listCoupon ({payload},{call, put}) {
      const data = yield call (listCoupon,payload);
      if (data.code && data.code == 200) {
        yield put ({
          type:'success',
          payload:{listCoupon:data.results}
        })
      }
    },
    *getDetailList ({}, {call, put, select}) {
      let router = yield select (_=>_.app.router);
      let payload = {user_id:router.id,page: 1};
      yield put ({type:"getMemberOrder",payload});
      yield put ({type:"getMemberPoint",payload});
      yield put ({type:"listCoupon"});
    },
    *pointExchange ({payload}, {call,put}) {
      let data = yield call (pointExchange,payload)
      if (data.code && data.code == 200) {
        yield put ({type:'query'})
      }
    },
    *sendCoupon ({payload}, {call,put}) {
      let data = yield call (sendCoupon,payload)
      if (data.code && data.code == 200) {
        yield put ({type:'query'})
      }
    },
  }
})
