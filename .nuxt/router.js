import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _0b7cda02 = () => interopDefault(import('../pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _8c0e96b2 = () => interopDefault(import('../pages/admin/homes.vue' /* webpackChunkName: "pages/admin/homes" */))
const _20431fa3 = () => interopDefault(import('../pages/no-access.vue' /* webpackChunkName: "pages/no-access" */))
const _13621405 = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _cda666b2 = () => interopDefault(import('../pages/home/_id.vue' /* webpackChunkName: "pages/home/_id" */))
const _4be4f3f6 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _0b7cda02,
    name: "admin",
    children: [{
      path: "homes",
      component: _8c0e96b2,
      name: "admin-homes"
    }]
  }, {
    path: "/no-access",
    component: _20431fa3,
    name: "no-access"
  }, {
    path: "/search",
    component: _13621405,
    name: "search"
  }, {
    path: "/home/:id?",
    component: _cda666b2,
    name: "home-id"
  }, {
    path: "/",
    component: _4be4f3f6,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
