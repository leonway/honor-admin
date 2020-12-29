import request from '@/utils/request'
// import { Player } from './types'

// export const defaultPlayerData: Player = {
//   accountname: '',
//   nickname: '',
//   avatar: '',
//   bravepoints: 0,
//   exp: 0,
//   id: -1,
//   level: 0,
//   rank: 0,
//   wanttoplay: [],
//   winningstreak: 0
// }

export const getBanpick = (params:any) =>
  request({
    url: '/banpick',
    method: 'get',
    params
  })

// export const getPlayer = (id:number) => request({
//   url: '/players/' + id.toString(),
//   method: 'get'
// })

export const getBanpickDetail = (id:string) => request(`/banpick/${id}`)
