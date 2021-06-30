<template>
    <v-main>
        <v-container class="py-4 py-md-10" v-if="product">

            <v-card elevation="16" rounded="lg" class="pa-3 pa-md-6">
                <v-row class="my-0">

                    <v-col cols="12" sm="6" class="py-0">
                        <v-card outlined class="pa-3">
                            <v-img :src="product.image" :aspect-ratio="1" contain/>
                        </v-card>
                    </v-col>

                    <v-col cols="12" sm="6" class="py-0">

                        <h1 v-text="product.name" class="my-3"/>

                        <v-divider/>

                        <div class="d-flex justify-space-between align-center py-3">
                            <div>
                                <span class="mr-3" v-text="product.category.title"/>
                                |
                                <span class="mx-3" v-text="'Quantity: ' + product.quantity + ' piece'"/>
                            </div>

                            <span class="text-h6 font-weight-bold green--text" v-text="product.price + ' USD'"/>
                        </div>

                        <v-divider class="mb-6"/>

                        <p class="mb-3" v-text="product.description"/>

                        <div v-html="product.content"></div>

                    </v-col>



                </v-row>
            </v-card>

        </v-container>

        <latest-list v-if="product" :id="product.id"/>

    </v-main>
</template>

<script>

import LatestList from "~/components/pages/products/LatestList";

export default {
    name: "index",

    components: {
        LatestList
    },

    data(){
        return{
            product: null
        }
    },

    async fetch() {
        await this.getData()
    },

    methods: {
        async getData() {
            try {
                await this.$fire.firestore.collection('products').doc(this.$route.params.id).get()
                    .then((res) => {
                        this.product = res.data()
                    })
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
