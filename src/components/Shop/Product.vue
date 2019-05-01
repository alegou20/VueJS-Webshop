<template lang="html">
    <v-layout row wrap>
        <v-flex xs6>
            <v-card>
                <v-img :src="product.image" height="500px">
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
                    <v-btn :to="{name: 'Edit', params: {id: product.id}}" color="primary">Edit</v-btn>
                    <v-btn @click="deleteProduct()" color="error">Delete</v-btn>
                </v-card-actions>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
    export default {
        data() {
            return {
                product: {
                    id: -1
                },
            };
        },
        mounted() {
            const { id } = this.$route.params;
            this.load(id);
        },
        methods: {
            load (id) {
                this.$store.dispatch('getProduct', {id})
                    .then(res => {
                        this.product = res.data;
                    }).catch(err => console.log(err));

            },
            deleteProduct() {
                const { id } = this.$route.params;
                this.$store.dispatch('deleteProduct', {id})
            },
        },

    };
</script>

<style lang="css">
</style>
