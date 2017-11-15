import { request } from 'utils'

export async function getMemberList() {
  return request('/Group/GroupMember/listMember')
}
