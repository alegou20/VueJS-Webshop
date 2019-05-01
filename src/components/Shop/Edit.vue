<template lang="html">
    <ProductForm :product="product" :onSubmit="submit"></ProductForm>
</template>

<script>
    import ProductForm from '@/components/Shop/ProductForm';
    export default {
        components: {
            ProductForm,
        },
        data() {
            return {
                product: {
                    title: '',
                    description: '',
                    price: 0,
                    quantity: 0,
                    image: '',
                },
            };
        },
        mounted() {
            const { id } = this.$route.params;
            this.load(id);
        },
        methods: {
            load(id) {
                this.$store.dispatch('getProduct', {id})
                    .then(res => {
                        this.product = res.data;
                    }).catch(err => console.log(err));
            },
            submit() {
                this.$store.dispatch('updateProduct', {title: this.product.title, description: this.product.description,
                    price: this.product.price, quantity: this.product.quantity, image: this.product.image}).then(() => {
                    this.$router.push({
                        name: 'Products'
                    });
                });
            },
        },
    };
</script>

<style lang="css">
</style>
