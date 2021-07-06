<template>
    <v-hover v-slot="{ hover }">
        <v-card outlined rounded="lg" :elevation="hover ? 16 : 0"
                class="fill-height d-flex flex-column tr-3s"
                :to="{name: 'products-id', params: {id: data.key}}">

            <v-img :src="data.image" aspect-ratio="1.2" contain class="white"/>

            <div class="pa-4 d-flex flex-column fill-height">

                <small class="text-caption d-block" v-text="data.category.title"/>

                <h3 class="text-h6 font-weight-bold mb-3 d-block" style="line-height: initial" v-text="data.name"/>

                <div class="d-flex justify-space-between align-center mt-auto">
                    <span class="green--text font-weight-bold" v-text="data.price + ' USD'"/>

                    <small class="grey--text font-weight-bold" v-text="data.quantity + ' piece'"/>
                </div>

            </div>

        </v-card>
    </v-hover>
</template>

<script>
export default {
    name: "Item",
    props:{
        data:{
            type: Object,
            required: true
        }
    }
}
</script>
