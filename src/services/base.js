// 基础服务，包括登陆和登陆信息查询
import { request } from 'utils'
import { upperModle } from 'util'
import { apiPackage } from 'config'

export async function login(data) {
  return request(`${apiPackage}/Basic/login`, data)
}

// 根据token获取登陆信息
export async function loginInfo() {
  return request(`${apiPackage}/Basic/loginInfo`)
}

// 获取七牛上传token
export async function qiuniuToken() {
  return request(`${apiPackage}/Basic/qiniuToken`)
}

// 根据token获取登陆信息
export async function cusRequest(url, data) {
  return request(`${apiPackage}/${url}`, data)
}

export async function query(router, payload, action) {
  // 根据路由信息组织请求的url /Admin（当前项目所有接口均在该入口下）/:model/:action{:model|:cusModel}/
  // 例如/net/detail/1 通过组织为请求为 /Admin/Net/detailNet/1
  // /product/detail/1/shelf_product 通过组织为请求为 /Admin/ShelfProduct/detailProduct/1
  // 会将model的首字母大写，如果有下划线，会去掉下划线并将下划线后的首字母大写

  const dataModle = upperModle(router.model)
  const manageModle = upperModle(router.cus || router.model)
  const realAction = action || router.action // 如果传入了指定action，会执行指定的action

  let url = `${apiPackage}/${manageModle}/${realAction}${dataModle}`
  if (realAction === 'detail') {
    url = `${url}/${router.id}`
    return request(url)
  }

  if (realAction === 'del') {
    url = `${url}/${payload}`
    return request(url)
  }

  if (realAction === 'edit') {
    if (!payload.id) {
      payload.id = router.id
    }
  }
  return request(url, payload)
}
