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
                }
            }
        },
        methods: {
            submit () {
                console.log(this.product)
                this.$store.dispatch('createProduct', {title: this.product.title, description: this.product.description,
                    price: this.product.price, quantity: this.product.price, image: this.product.image})
            },
        }
    };
</script>

<style lang="css">
</style>

