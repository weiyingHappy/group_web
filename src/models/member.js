import modelExtend from 'dva-model-extend'
import { commonModel } from './common'
import { getMemberList } from 'services/member'

export default modelExtend(commonModel, {
  namespace: 'member',

  subscriptions: {
    setup({ dispatch,history }) {
      let pathname = history.location.pathname;
      if (pathname.indexOf('list') > -1) {
        dispatch ({type:"getMemberList"})
      }
    },
  },

  effects: {
    *getMemberList ({}, {call, put}) {
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
        let tempLists = data.results ? JSON.parse(JSON.stringify(data.results)) : []
        yield put ({
          type:"success",
          payload:{lists:data.results || [],nowPage:1,count:data.results.length || 0,sourceArr:arr,tempLists}
        })
      }
    }
  }
})
