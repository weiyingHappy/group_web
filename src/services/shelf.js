import { request } from 'utils'

export async function getAllNetToSelect() {
  return request('Admin/Net/allNets')
}
