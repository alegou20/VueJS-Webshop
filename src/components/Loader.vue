<template>

    <div v-if="$store.state.loader">
        <swapping-squares-spinner
                :animation-duration="1000"
                :size="65"
                :color="spinnerColor"
        />

    </div>

</template>


<script>
    import
    { SwappingSquaresSpinner  } from 'epic-spinners'

    export default {
        name: 'loader',
        components: {
            SwappingSquaresSpinner,
        },
        data () {
            return {
                spinnerColor: '#ff1d5e'
            }
        }
    };
</script>
<style>

</style>
