import { useUserStore } from "@/stores/user"
import { createRouter, createWebHistory } from "vue-router"
import routes from "./routes"

export default function () {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior (to, from, savedPosition) {
      return savedPosition || { left: 0, top: 0 }
    }
  })

  // Auth middleware:
  router.beforeEach((to, from, next) => {
    const { isAuthenticated } = useUserStore()

    // if user try to go back to Login page after authenticated, send them back to home:
    if (["signin", "register"].includes(to.name as string) && isAuthenticated) {
      next("/dashboard")
    }

    const nearestWithTitle = to.matched.slice().reverse().find(r => r.meta && r.meta.title)
    const previousNearestWithMeta = from.matched.slice().reverse().find(r => r.meta && r.meta.metaTags)

    // If a route with a title was found, set the document (page) title to that value.
    if (nearestWithTitle) {
      document.title = nearestWithTitle.meta.title
    } else if (previousNearestWithMeta) {
      document.title = previousNearestWithMeta.meta.title
    }

    if (to.meta.login === false) {
      next()
    } else {
      if (!isAuthenticated) {
        next(`/sign-in?redirect=${to.path}`)
      }

      if (to.meta.roles && to.meta.roles.length > 0) {
        const user = useUserStore().userInfo
        const userRoles = user.roles
        const hasRole = to.meta.roles.some(role => userRoles.includes(role))
        if (hasRole) {
          next()
        } else {
          next({ name: "unauthorized" })
        }
      } else {
        next()
      }
    }
  })

  return router
}
