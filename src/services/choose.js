import { request } from 'utils'

export async function toTeam(id) {
  return request(`/Group/GroupManage/toTeam/${id}`)
}
