<template>
    <v-container>

        <div class="d-flex justify-space-between mb-6">
            <h2 class="font-weight-bold ma-0">Products</h2>

            <v-btn depressed color="primary" :to="'/admin/products/add'" exact>
                Add products
            </v-btn>
        </div>

        <v-data-table :headers="table.headers"
                      :items="data"
                      :options.sync="table.options"
                      :footer-props="table.footerProps"
                      :items-per-page="table.options.itemsPerPage"
                      :server-items-length="table.options.serverItemsLength"
                      :height="table.options.height"
                      mobile-breakpoint="0"
                      fixed-header>

            <template #item.created_at="{ item }">
                {{ item.created_at }}
            </template>

            <template #item.top="{ item }">
                <v-icon v-text="'mdi-check-circle'" small :color="item.top ? 'green' : 'grey'"/>
            </template>

            <template #item.category="{ item }">
                {{ item.category.title }}
            </template>

            <template #item.price="{ item }">
                {{ item.price }} USD
            </template>

            <template #item.action="{ item }">
                <v-tooltip top>
                    <template #activator="{ on }">
                        <v-btn icon color="info" v-on="on"
                               :to="{
                                   name: 'admin-products-id',
                                   params: {
                                        id: item.key
                                   }
                               }" exact>
                            <v-icon small v-text="'mdi-pencil-outline'"/>
                        </v-btn>
                    </template>
                    Edit Product
                </v-tooltip>
            </template>

        </v-data-table>
    </v-container>
</template>

<script>

export default {
    name: "blog-data-table",

    data() {
        return {
            data: [],
            table: {
                headers: [
                    {text: '#', value: 'id', sortable: false, width: 20},
                    {text: 'Name', value: 'name', sortable: false},
                    {text: 'Price', value: 'price', sortable: false},
                    {text: 'Category', value: 'category', sortable: false},
                    {text: 'Top Product', value: 'top', sortable: false},
                    {text: 'Creaated Ad', value: 'created_at', sortable: false},
                    {text: null, value: 'action', sortable: false, width: 20},
                ],
                options: {
                    itemsPerPage: 15,
                    page: 1,
                    serverItemsLength: this.data?.length,
                    height: null
                },
                headerProps: {
                    sortable: false
                },
                footerProps: {
                    itemsPerPageOptions: [
                        15,
                        25,
                        50,
                        100,
                    ],
                    itemsPerPageText: '',
                },
            },
        }
    },

    async fetch() {
        await this.getData()
    },

    watch: {
        'table.options.itemsPerPage'() {
            if (this.data) {
                this.getData()
            }
        },
    },

    methods: {
        async getData() {
            try {
                await this.$fire.firestore.collection('products')
                    .orderBy("id")
                    .limit(this.table.options.itemsPerPage)
                    .get()
                    .then((querySnapshot) => {

                        this.data = []

                        querySnapshot.forEach((doc) => {
                            this.data.push({key: doc.id, ...doc.data()})
                        });
                    })
            } catch (e) {
                console.log(e)
            }
        }
    }
}
</script>
