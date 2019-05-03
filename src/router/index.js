import Vue from 'vue'
import Router from 'vue-router'
import routes from '@/router/routes'
import store from '@/store/index'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history',
})

router.beforeEach((to, from, next) => {

  let token = localStorage.token

  const publicPages = ['/login', '/register'];
  const authRequired = !publicPages.includes(to.path);


  //If there is no token and if the path is not /login or /register. You need to login before you can continue.
  if (authRequired && !token) {
      return next('/login');
    }

  //If there is a token, check if its valid. If it is: continue to the site you want to go, else, if its invalid: you need to login.
  else if (token) {
    store
        .dispatch("CHECK_AUTH")
        .then(res => {
          if(!res){
            next('/login');
          }
          next()
        })
  }
  next()
})

export default router

