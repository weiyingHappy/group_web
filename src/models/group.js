import modelExtend from 'dva-model-extend'
import { commonModel } from './common'
import { qiuniuToken } from 'services/base'

export default modelExtend(commonModel, {
  namespace: 'group',

  subscriptions: {
    start ({ dispatch }) {
      dispatch({
        type: 'getQiniuToken',
      })
    },
  },

  effects: {
    *getQiniuToken ({},{call, put}) {
      const data = yield call (qiuniuToken);
      if (data.code && data.code == 200) {
        yield put ({
          type:"success",
          payload:{qiuniuToken:data.results}
        })
      }
    }
  }
})
