<template>
    <v-main>

        <products-section/>

    </v-main>
</template>

<script>

export default {
    components: {
        ProductsSection: ()=> import('~/components/pages/products/List'),
    }
}
</script>
