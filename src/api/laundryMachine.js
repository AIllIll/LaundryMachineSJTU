import request from './request'

export function getLaundryMachineList () {
  return request({
    url: '/getLaundryMachineList',
    method: 'get'
  })
}

export function getBuildingList () {
  return request({
    url: '/getBuildingList',
    method: 'get'
  })
}

export function checkMachine (id) {
  return request({
    url: '/check',
    method: 'get',
    params: id
  })
}
