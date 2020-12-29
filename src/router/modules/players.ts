import { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

export const playerRoutes:RouteConfig = {
  path: '/players',
  component: Layout,
  meta: {
    title: 'playerMgt', // i18n信息需要额外处理
    icon: 'peoples'
  },
  children: [
    {
      path: 'playersList',
      component: () => import(/* webpackChunkName: "playersList" */ '@/views/player/list.vue'),
      meta: {
        title: 'playerList',
        // roles: ['admin'], // or you can only set roles in sub nav
        icon: 'players'
      }
    },
    {
      path: 'create',
      component: () => import('@/views/player/create.vue'),
      name: 'CreatePlayer',
      meta: {
        title: 'createPlayer',
        icon: 'edit'
      }
    },
    {
      path: 'edit/:id(\\d+)',
      component: () => import('@/views/player/edit.vue'),
      // name: 'CreatePlayer',
      meta: {
        title: 'editPlayer',
        hidden: true, // 不需要导航菜单
        noCache: true, // tags页签
        activeMenu: '/players/list' // 左侧导航菜单相关激活url
        // icon: 'edit'
      }
    }
  ]
}
