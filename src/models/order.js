import modelExtend from 'dva-model-extend'
import { commonModel } from './common'

export default modelExtend(commonModel, {
  namespace: 'order',

  state: {
    model2: 'order',
  },
})
