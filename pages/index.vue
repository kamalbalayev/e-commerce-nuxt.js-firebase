<template>
    <v-main>

        <top-products-carousel/>

        <products-section/>

    </v-main>
</template>

<script>

export default {
  components: {
      TopProductsCarousel: ()=> import('~/components/pages/main/Carousel'),
      ProductsSection: ()=> import('~/components/pages/main/Products'),
  }
}
</script>
