import modelExtend from 'dva-model-extend'
import { commonModel } from './common'
import { qiuniuToken, query } from 'services/base'
import { message } from 'antd'

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
          payload:{qiniuToken:data.results.token}
        })
      }
    },
    *editGroup ({payload},{call,put}) {
      let router = {model:"group",cus:"groupManage",action:"edit"};
      const data = yield call (query,router,payload);
      if (data.code && data.code == 200) {
        message.success ("保存成功！");
      } else {
        message.warning (data.msg)
      }
    }
  }
})
