import modelExtend from 'dva-model-extend'
import { commonModel } from './common'
import { query } from 'services/base'
import { toTeam } from 'services/choose'
import cookie from 'js-cookie'

export default modelExtend(commonModel, {
  namespace: 'choose',

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen (location => {
        if (location.pathname.indexOf('choose_hotel') > -1)
          dispatch({
            type: 'getListTeam',
          })
      })
    },
  },

  effects:{
    *getListTeam ({},{call,put,select,take}) {
      let router = {
        model:"team",
        cus:"groupManage",
        action:"list",
      }
      let payload = {
        page:1,group_id:cookie.get('group_id')
      }
      console.log ("choose_hotel")
      let page = 0,totalPage=1;
      while (page < totalPage) {
        console.log ("getListTeam")
        const data = yield call (query, router, payload)
        if (data.code && data.code == 200) {
          let lists = (yield select (_=>_.choose.lists)) || [];
          lists = lists.concat (data.results.lists);
          totalPage = data.results.totalPage;
          page++;
          payload.page++;
          yield put ({
            type:"success",
            payload:{lists}
          })
        }
      }
    },
    *toTeam ({payload},{call, put}) {
      const data = yield call (toTeam,payload);
      if (data.code && data.code == 200) {
        cookie.set ('token',data.results.token, { expires: 1, path: '' })
        location.href = '/hoteladmin/#/panel_home'
      }
    }
  }
})
