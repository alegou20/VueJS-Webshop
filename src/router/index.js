import Vue from 'vue'
import Router from 'vue-router'
import Create from '@/components/Shop/Create.vue'
import Edit from '@/components/Shop/Edit.vue'
import Product from '@/components/Shop/Product.vue'
import Products from '@/components/Shop/Products.vue'
import Cart from '@/components/Shop/Cart.vue'
import Chat from '@/components/chat.vue'
import Login from '@/components/Account/Login.vue'
import Profile from '@/components/Account/Profile.vue'
import ProductForm from '@/components/Shop/ProductForm.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/create',
      name: 'create',
      component: Create
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/edit',
      name: 'edit',
      component: Edit
    },
    {
      path: '/product',
      name: 'product',
      component: Product,
    },
    {
      path: '/',
      name: 'products',
      component: Products,
    },
    {
      path: '/chat',
      name: 'chat',
      component: Chat
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart,
    },
    {
      path: '/productform',
      name: 'productform',
      component: ProductForm
    },
  ]
})


