<template>
    <v-carousel cycle height="auto" hide-delimiter-background hide-delimiters show-arrows-on-hover dark>
        <v-carousel-item v-for="(product, i) in products" :key="i">
            <nuxt-link :to="{name: 'products-id', params: {id: product.key}}">
                <v-responsive :class="colors[i]" :aspect-ratio="4" min-height="300">
                    <v-container class="white--text fill-height d-flex aling-center">
                        <v-row align="center">

                            <v-col cols="12" sm="4" order-md="1">
                                <v-card class="pa-3" elevation="16" rounded="lg" color="white">
                                    <v-img :src="product.image" aspect-ratio="1" contain/>
                                </v-card>
                            </v-col>

                            <v-col cols="12" sm="8" class="mb-3 mb-md-0">
                                <h2 class="text-h4 mb-3" v-text="product.name"/>
                                <p class="text-body-2" v-text="product.description"/>
                                <v-btn rounded color="white" light>
                                    View Details
                                    <v-icon v-text="'mdi-arrow-right'" right/>
                                </v-btn>
                            </v-col>

                        </v-row>
                    </v-container>
                </v-responsive>
            </nuxt-link>
        </v-carousel-item>
    </v-carousel>
</template>

<script>
export default {
    name: "Carousel",
    data () {
        return {
            colors: [
                'indigo',
                'warning',
                'pink darken-2',
                'red lighten-1',
                'deep-purple accent-4',
            ],
            products: [],
        }
    },

    async fetch() {
        await this.getData()
    },

    methods: {
        async getData() {
            try {
                await this.$fire.firestore.collection('products')
                    .where("top", "==", true)
                    .limit(5)
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
