import fetch from '@/utils/fetch'
export const getstrategies = (data) => {  // 获取策略列表
  return fetch({
    url: '/strategies',
    method: 'get',
    data
  })
}
export const getCalls = (data) => { // 获取录音列表
  return fetch({
    url: '/calls',
    method: 'get',
    data
  })
}
export const getdayListens = (data) => {  // 获取日听列表
  return fetch({
    url: '/qc/statistics/dayListen',
    method: 'get',
    data
  })
}
