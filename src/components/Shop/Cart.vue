<template>
    <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-toolbar color="pink" dark>

                    <v-toolbar-title>Cart items</v-toolbar-title>
                    <v-spacer></v-spacer>

                </v-toolbar>
                <v-list two-line>
                    <template v-for=" item in cart">
                        <v-list-tile :key="item.id" avatar ripple >
                            <v-list-tile-content>
                                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                                <v-list-tile-sub-title class="text--primary">{{ item.description }}</v-list-tile-sub-title>
                                <v-list-tile-sub-title> $ {{item.price}} </v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-list-tile-action>
                                <v-icon color="grey lighten-1">restore_from_trash</v-icon>
                            </v-list-tile-action>
                        </v-list-tile>
                    </template>
                </v-list>

            </v-card>
            <v-btn block round color="primary">Pay items in cart</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                cartIds: [],
                cart: []
            };
        },
        mounted() {
            this.cartIds = this.$store.getters.cart
            this.load();
        },
        methods: {
            load () {
                var index, len;

                for (index = 0, len = this.cartIds.length; index < len; ++index) {

                    this.$store.dispatch('getProductFilter', this.cartIds[index])
                        .then(res => {
                            this.cart.push(res.data);
                        }).catch(err => console.log(err));
                }
            },
        },
    }
</script>

