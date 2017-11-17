import { request } from 'utils'

export async function getMemberList() {
  return request('/Group/GroupMember/listMember')
}

export async function getMemberOrder(data) {
  return request('/Group/GroupMember/memberOrder', data)
}

export async function getMemberPoint(data) {
  return request('/Group/GroupMember/pointLog', data)
}

export async function pointExchange(data) {
  return request('/Group/GroupMember/pointExchange', data)
}

export async function sendCoupon(data) {
  return request('/Group/GroupMember/sendCoupon', data)
}

export async function listCoupon() {
  return request('/Group/GroupMember/listCoupon')
}

export async function getMemberOrderDetail(order_no) {
  return request(`/Group/GroupMember/detailMemberOrder/${order_no}`)
}
