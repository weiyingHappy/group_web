import modelExtend from 'dva-model-extend'
import { query } from 'services/base'
import { log, filterData, analyzePath } from 'util'
import { routerRedux } from 'dva/router'
import { leaveClean, lazy } from 'config'

const model = {
  reducers: {
    success(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}

const commonModel = modelExtend(model, {

  state: {
    lists: null,
    detail: null,
    nowPage: 1,
    count: 0,
    search: {},
    modelspace: null,
  },

  subscriptions: {
    setup({ dispatch }) {
      dispatch({
        type: 'query',
      })
    },
  },

  effects: {
    // 通用查询，主要是查询list和detail
    * query({ payload, source }, { call, put, select }) {
      const { router, historys } = yield select(_ => _.app)

      const lastHref = analyzePath(historys[historys.length - 2] || '/')
      log('lastHref', lastHref)
      if (leaveClean === true) {
        // 离开清空模式，离开当前模块，需要清空model信息
        if (lastHref.model !== router.model) {
          log(`leaveClean模式下离开了模块${lastHref.model},清空其信息`)
          yield put({
            type: `${lastHref.model}/resetState`,
          })
        }
      }

      if (router.action !== 'list' && router.action !== 'detail') {
        log('非标准的路由，不做操作', router)
        return
      }

      const currentModel = yield select(_ => _[router.model])

      if (lazy === true) {
        // 懒加载模式下只要有数据就不加载,只接受来自分页的请求
        if (source !== 'page') {
          if (router.action === 'list' && currentModel.lists !== null) {
            log('lazy模式下list不重新请求数据')
            return
          }
          if (router.action === 'detail' && currentModel.detail !== null && (currentModel.detail.id == router.id || currentModel.detail.order_no == router.id)) {
            log('lazy模式下detail不重新请求数据')
            return
          }
        }
      }

      let newPayload = { ...payload }
      if (currentModel) {
        newPayload = { ...currentModel.search, ...payload }
      }
      if (!newPayload.page) {
        newPayload.page = currentModel ? currentModel.nowPage : 1
      }
      // 对请求结果进行对应的处理，list的请求和detail的请求分开处理
      const data = yield call(query, router, newPayload)
      if (filterData(data)) {
        const toSetState = { modelspace: router.model }
        if (router.action === 'list') {
          toSetState.lists = data.results.lists
          toSetState.nowPage = data.results.nowPage
          toSetState.count = data.results.count
        } else {
          toSetState.detail = data.results
        }
        yield put({
          type: 'success',
          payload: { ...toSetState },
        })
      }
    },


    // 通用编辑，主要用于增删改数据
    // 参数action包括 add,edit,del
    // 参数didAction,运行完后执行的动作,为一个对象{type:x,cb},通过type区分动作
    * edit({ payload, action, didAction }, { call, put, select }) {
      const { router } = yield select(_ => _.app)
      const data = yield call(query, router, payload, action)
      if (filterData(data, true)) {
        if (didAction) {
          // 运行完后执行的动作
          // 0执行传入的回掉cb
          // 1执行query方法，通常为刷新列表或详情数据
          // 2跳转到列表页面
          switch (didAction.type) {
            case 0:
              didAction.cb()
              break
            case 2:
              yield put(routerRedux.push(`/${router.model}/list/1${router.cus ? `/${router.cus}` : ''}`))
              break
            case 1:
            default:
              yield put({ type: 'query' })
          }
        }
      }
    },

  },

  reducers: {
    changeSearch(state, { payload }) {
      return {
        ...state,
        search: { ...state.search, ...payload },
      }
    },

    clearSearch(state) {
      return { ...state, search: {} }
    },

    resetState(state) {
      return {
        ...state,
        lists: null,
        detail: null,
        nowPage: 1,
        count: 0,
        search: {},
      }
    },

  },

})

module.exports = {
  model,
  commonModel,
}
