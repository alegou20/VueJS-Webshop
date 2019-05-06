<template lang="html">
    <v-layout row wrap>
        <v-flex xs3 v-for="product in products" :key="product.id">
            <v-card>
                <v-img :src="product.image" height="300px">
                </v-img>
                <v-card-title primary-title>
                    <div>
                        <h3 class="headline mb-0">{{product.title}}</h3>
                        <div>{{product.description}}</div>
                        <h4>${{product.price}}</h4>
                        <small>{{product.quantity}} in stock</small>
                    </div>
                </v-card-title>

                <v-card-actions>
                    <v-btn :to="{name:'product',params:{id: product.id }}" color="info">View</v-btn>
                    <v-btn color="orange" @click="addToCart(product.id)">Add to cart</v-btn>
                </v-card-actions>

            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

    export default {
        data() {
            return {
                products: [],
            };
        },
        mounted() {
            this.$store.dispatch('getProducts')
                .then(res => {
                    this.products = res.data;
                }).catch(err => console.log(err));
        },
        methods: {
            addToCart(id) {
                this.$store.commit('setCartItem', id);
            },
        },
    };
</script>

<style lang="css">
</style>
