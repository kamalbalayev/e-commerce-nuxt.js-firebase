<template>
    <v-container tag="section" v-if="products.length > 0">

        <h2 class="text-h4 font-weight-bold my-6 text-center">All Products</h2>

        <v-row>

            <v-col cols="12" sm="6" md="4" lg="3" v-for="(item, i) in products" :key="`product-${i}`">
                <product-item :data="item"/>
            </v-col>

        </v-row>

    </v-container>
</template>

<script>
export default {
    name: "Products",
    data() {
        return {
            products: [],
        }
    },
    components: {
        ProductItem: () => import('~/components/pages/products/Item')
    },
    async fetch() {
        await this.getData()
    },
    methods: {
        async getData() {
            try {

                await this.$fire.firestore.collection('products')
                    .orderBy("id", "desc")
                    .get()
                    .then((querySnapshot) => {
                        querySnapshot.forEach((doc) => {
                            this.products.push({key: doc.id, ...doc.data()})
                        });
                    })
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
