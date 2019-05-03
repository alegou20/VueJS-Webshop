<template>
  <v-app id="inspire">
    <v-navigation-drawer
            class="brown darken-3"
            v-model="drawer"
            fixed
            app
            width="130"
    >
      <v-btn class="white--text"
             flat
             v-for="item in navItems"
             :key="item.title"
             :to="item.link">
        <v-icon left dark>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>
    </v-navigation-drawer>
    <v-toolbar color="#1B5E20" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Koala Paradise</v-toolbar-title>
      <v-spacer></v-spacer>

      <div v-if="user">

        <v-btn round color="primary"  @click="onProfile">Profile</v-btn>
        <v-btn round color="primary"  @click="onLogout">Logout</v-btn>

      </div>

      <v-toolbar-items v-show="!user" class="hidden-xs-only">
        <v-btn
                flat
                v-for="item in items"
                :key="item.title"
                :to="item.link">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-md>
        <v-layout>
          <router-view></router-view>
          <!--<chat></chat>-->
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        drawer: false,
        navItems: [
          { icon: 'shopping_basket', title: 'shop', link: '/' },
          { icon: 'shopping_cart', title: 'cart', link: '/cart' },
          { icon: 'shopping_basket', title: 'create', link: '/products/create' },
        ],
        items: [
          { icon: 'lock_open', title: 'Sign in', link: '/login' },
          { icon: 'face', title: 'Sign up', link: '/register' },

        ]
      };
    },
    computed : {
      user(){
        return this.$store.getters.user.email !== null && this.$store.getters.user.email !== undefined
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout').then(() =>  {
          this.$router.push({
            name: 'login'
          });
        });
      },
      onProfile () {

      }
    }
  };
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
