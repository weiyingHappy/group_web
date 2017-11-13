/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import { loginInfo, login, qiuniuToken, cusRequest } from 'services/base'
import queryString from 'query-string'
import cookie from 'js-cookie'
import { filterData, analyzePath } from 'util'
import { homePath } from 'config'

export default {
  namespace: 'app',

  state: {
    user: {},
    router: {},
    siderFold: false,
    locationPathname: '',
    locationQuery: {},
    historys: [], // 记录历史查看记录，最多5个
  },

  subscriptions: {

    setupHistory({ dispatch, history }) {
      history.listen((location) => {
        const routers = analyzePath(location.pathname)
        dispatch({
          type: 'updateStateHistoty',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
            router: routers,
          },
        })

        dispatch({
          type: `${routers.model}/query`,
        })
      })
    },

    setup({ dispatch }) {
      dispatch({ type: 'query' })
    },

  },

  effects: {
    * query({ payload }, { call, put, select }) {
      const data = yield call(loginInfo, payload)
      const { locationPathname } = yield select(_ => _.app)
      if (filterData(data)) {
        yield put({
          type: 'updateState',
          payload: {
            user: data.results,
          },
        })
        if (location.pathname === '/login') {
          yield put(routerRedux.push({
            pathname: homePath,
          }))
        }
      } else {
        // 获取登陆信息失败，进入登陆页面
        yield put(routerRedux.push({
          pathname: '/login',
          search: queryString.stringify({
            from: locationPathname,
          }),
        }))
      }
    },

    * login({ payload }, { put, call, select }) {
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (filterData(data)) {
        // 登陆成功，设置session-token
        cookie.set('token', data.results.token, { expires: 1, path: '' })
        const { from } = locationQuery
        yield put({ type: 'query' })
        if (!from || from === '/login' || from === '/') {
          yield put(routerRedux.push(homePath))
        } else {
          yield put(routerRedux.push(from))
        }
      }
    },

    * qiuniuToken({ payload }, { call }) {
      const data = yield call(qiuniuToken, payload)
      if (filterData(data)) {
        cookie.set('qiniutoken', data.results.token, { expires: 1, path: '' })
      }
    },

    * request({ uri, data, callback }, { call }) {
      const response = yield call(cusRequest, uri, data)
      if (filterData(response)) {
        callback(response)
      }
    },

  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider(state) {
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    updateStateHistoty(state, { payload }) {
      const _historys = state.historys
      while (_historys.length > 5) {
        _historys.shift()
      }
      _historys.push(payload.locationPathname)
      return {
        ...state,
        ...payload,
        historys: _historys,
      }
    },

  },
}
