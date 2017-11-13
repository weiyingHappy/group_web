import { getAllNetToSelect } from 'services/shelf'
import modelExtend from 'dva-model-extend'
import { filterData } from 'util'
import { commonModel } from './common'

export default modelExtend(commonModel, {
  namespace: 'shelf',

  state: {
    model2: 'shelf',
  },

  effects: {
    * getAllNetToSelect({ payload }, { call }) {
      const data = yield call(getAllNetToSelect)
      if (filterData(data)) {
        payload.cb(data)
      }
    },
  },
})
