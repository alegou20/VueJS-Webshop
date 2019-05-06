import Vue from 'vue'
import Vuex from 'vuex'
import ApiService from "@/common/api.service";
import jwt_decode from 'jwt-decode'
import {
  ProductService,
} from "@/common/api.service";

Vue.use(Vuex)

export default new Vuex.Store(
    {
      state: {
        user: {},
        loader: false,
        isAuthenticated: !!localStorage.token,
        cart: []
      },

      actions: {
        LOGIN(context, credentials) {
          return ApiService.post("auth/login", {
            email: credentials.email,
            password: credentials.password
          })
              .catch((e) => {
                console.error(e)
              })
        },
        DETAILMETHOD(context, payload) {
          localStorage.token = payload.data

          const token = jwt_decode(payload.data)
          const loggedUser = {
            id: token.id,
            email: token.email
          }

          context.commit("SET_AUTH", loggedUser);
        },
        VERIFYCODE(context, payload) {
          return ApiService.post("auth/login/authCode", {
            email: payload.email,
            authCode: payload.authCode
          });
        },
        REGISTER(context, credentials) {
          return new Promise((resolve, reject) => {
            ApiService.post("users", { user: credentials })
                .then(({ data }) => {
                  context.commit("SET_AUTH", data.user);
                  resolve(data);
                })
                .catch(({ response }) => {
                  context.commit("SET_ERROR", response.data.errors);
                  reject(response);
                });
          });
        },
        CHECK_AUTH(context) {

            const tokenExp = jwt_decode(localStorage.token)

            if(tokenExp.exp < Date.now() / 1000){
              alert('token has expired')
              context.commit("PURGE_AUTH", null);
              return false
            }
              ApiService.setHeader();
              const token = jwt_decode(localStorage.token)
              const loggedUser = {
                id: token.id,
                email: token.email
              }

              context.commit("SET_AUTH", loggedUser);
              return true
        },
        logout() {

          this.commit("PURGE_AUTH", null)
          delete localStorage.token
        },
        getProducts() {
          return ProductService.get();
        },

        getProduct(context, payload) {

          return ApiService.get('item', payload.id);
        },

        getProductFilter(context, payload) {
          return ApiService.get('item', payload);
        },

        deleteProduct(context, payload) {
          return ApiService.delete(`${'item'}/${payload.id}`);
        },

        createProduct (context, payload) {
          ApiService.post('item', {
            title: payload.title,
            description: payload.description,
            price: payload.price,
            quantity: payload.quantity,
            image: payload.image,

          }).catch((e) => {
            console.error(e)
          })
        },

        updateProduct (context, payload) {
          return ApiService.put('item', {
            title: payload.title,
            description: payload.description,
            price: payload.price,
            quantity: payload.quantity,
            image: payload.image,

          }).catch((e) => {
            console.error(e)
          })
        },

      },
      mutations: {
        LOADER(state, payload){
          state.loader=payload;
        },
        setCartItem(state, cart) {
          state.cart.push(cart)
        },
        SET_AUTH(state, user) {
          state.isAuthenticated = true;
          state.user = user;
          state.errors = {};
        },
        PURGE_AUTH(state) {
          state.isAuthenticated = false;
          state.user = {};
          state.errors = {};
          delete localStorage.token
        }
      },
      getters: {
        user(state){
          return state.user
        },
        isAuthenticated(state) {
          return state.isAuthenticated;
        },
        cart(state){
          return state.cart
        },
      },
    }
)
