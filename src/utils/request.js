import axios from 'axios'
import cookie from 'js-cookie'
import { log, apiPrefix } from './util'

const fetch = (options) => {
  let { method, data, url } = options

  const token = cookie.get('token')

  const axo = axios.create({
    timeout: 20000,
    headers: { 'session-token': token },
  })

  switch (method.toLowerCase()) {
    case 'get':
      return axo.get(url)
    case 'post':
      return axo.post(url, data)
    default:
      return axo(options)
  }
}

export default function request(uri, params) {
  let _method = 'get'
  if (params && params != null) {
    _method = 'post'
  }
  const options = {
    url: `${apiPrefix()}api/${uri}`,
    method: _method,
    data: params,
  }
  log('request:', options)
  return fetch(options).then((response) => {
    log('response', options.url, response)
    const { data } = response
    return Promise.resolve({ ...data })
  }).catch((error) => {
    const { response } = error
    log('response exception', error)
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = '网络异常'
    }
    return Promise.reject({ success: false, statusCode, message: msg })
  })
}
