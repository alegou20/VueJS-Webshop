<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
          <v-flex xs12 sm6>
          <v-text-field
                  single-line
                  outline
                  v-model="email"
                  disabled
          ></v-text-field>
              <v-text-field
                      single-line
                      outline
                      label="Type in your old password"
                      v-model="oldPassword"

              ></v-text-field>

              <v-text-field
                      single-line
                      outline
                      label="Type in your new password"
                      v-model="password"

              ></v-text-field>

              <v-btn block round color="primary"  @click="update">Update</v-btn>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

  export default {
    data() {
      return {
          email: '',
          oldPassword: '',
          password: '',
      };
    },

      mounted() {
          this.email = this.$store.getters.user.email
      },
      methods: {
          update() {
              alert('update')
          }
      },
  };
</script>

<style scoped>

</style>
