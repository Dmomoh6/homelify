import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _759f4104 = () => interopDefault(import('../pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _5db92d23 = () => interopDefault(import('../pages/admin/homes.vue' /* webpackChunkName: "pages/admin/homes" */))
const _217f871f = () => interopDefault(import('../pages/no-access.vue' /* webpackChunkName: "pages/no-access" */))
const _dfc183ee = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _4970f4aa = () => interopDefault(import('../pages/home/_id.vue' /* webpackChunkName: "pages/home/_id" */))
const _d87de8fe = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _759f4104,
    name: "admin",
    children: [{
      path: "homes",
      component: _5db92d23,
      name: "admin-homes"
    }]
  }, {
    path: "/no-access",
    component: _217f871f,
    name: "no-access"
  }, {
    path: "/search",
    component: _dfc183ee,
    name: "search"
  }, {
    path: "/home/:id?",
    component: _4970f4aa,
    name: "home-id"
  }, {
    path: "/",
    component: _d87de8fe,
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
