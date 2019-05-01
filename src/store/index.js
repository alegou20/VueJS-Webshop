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
        errors: null,
        user: {},
        isAuthenticated: !!localStorage.token
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
          console.log(payload.data)
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
          if (localStorage.token) {
            ApiService.setHeader();
            const token = jwt_decode(localStorage.token)
            const loggedUser = {
              id: token.id,
              email: token.email
            }

            context.commit("SET_AUTH", loggedUser);
          } else {
            context.commit("PURGE_AUTH");
          }
        },
        logout() {
          alert('lohout method')
          this.commit("PURGE_AUTH", null)
          delete localStorage.token
        },
        getProducts() {
          return ProductService.get();
        },

        getProduct(context, payload) {
          return ApiService.get(`${'item'}/${payload.id}`);
        },

        deleteProduct(context, payload) {
          ApiService.delete(`${'item'}/${payload.id}`);
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

          ApiService.put('item', {
            title: payload.title,
            description: payload.description,
            price: payload.price,
            quantity: payload.quantity,
            image: payload.image,

          }).catch((e) => {
            console.error(e)
          })
        },
        ValidJwtCode(){
          const token = jwt_decode(localStorage.token)
          if(token.exp < Date.now() / 1000){
            alert('token is expired best')
            return true
          }

          return false
        },
        UPDATE_USER(context, payload) {
          const { email, username, password, image, bio } = payload;
          const user = {
            email,
            username,
            bio,
            image
          };
          if (password) {
            user.password = password;
          }

          return ApiService.put("user", user).then(({ data }) => {
            context.commit("SET_AUTH", data.user);
            return data;
          });
        }
      },
      mutations: {
        SET_ERROR(state, error) {
          state.errors = error;
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
        }
      },
    }
)
