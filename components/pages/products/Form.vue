<template>
    <v-row>

        <v-col cols="12" md="3" class="py-0">
            <file-upload :image="form.image" @image="form.image = $event"/>
        </v-col>

        <v-col cols="12" md="9" class="py-0">

            <v-row class="my-0">

                <v-col cols="12" md="3" class="py-0">
                    <v-text-field v-model="form.name"
                                  label="Name"
                                  outlined
                                  :error-messages="nameErrors"/>
                </v-col>

                <v-col cols="12" md="3" class="py-0">
                    <v-select v-model="form.category"
                              label="Category"
                              :items="categories" item-value="id" item-text="title"
                              return-object outlined
                              :error-messages="categoryErrors"/>
                </v-col>

                <v-col cols="12" md="3" class="py-0">
                    <v-text-field v-model="form.price"
                                  label="Price"
                                  outlined suffix="USD"
                                  :error-messages="priceErrors"/>
                </v-col>

                <v-col cols="12" md="3" class="py-0">
                    <v-text-field v-model="form.quantity"
                                  label="Quantity"
                                  outlined suffix="Piece"
                                  :error-messages="quantityErrors"/>
                </v-col>
            </v-row>

            <v-textarea v-model="form.description"
                        label="Description" counter
                        return-object outlined cols="30" rows="3"
                        :error-messages="descriptionErrors"/>

            <v-textarea v-model="form.content"
                        label="Text" counter
                        return-object outlined cols="30" rows="10"
                        :error-messages="contentErrors"/>

            <div class="py-0 d-flex justify-space-between">
                <v-checkbox v-model="form.top" label="Top product" class="ma-0 pa-0"/>

                <div class="d-flex">

                    <v-btn depressed color="red" dark @click="remove" class="mr-4" v-if="$route.params.id">
                        Delete
                        <v-icon v-text="'mdi-delete'" right/>
                    </v-btn>

                    <v-btn depressed color="primary" @click="save">
                        Save
                        <v-icon v-text="'mdi-send'" right/>
                    </v-btn>
                </div>
            </div>

        </v-col>
    </v-row>
</template>

<script>

import {validationMixin} from 'vuelidate'
import {required, minLength, minValue} from 'vuelidate/lib/validators'
import FileUpload from "../../common/FileUpload";

export default {
    name: "index",
    mixins: [validationMixin],

    components:{
        FileUpload
    },

    data() {
        return {
            form: {
                name: null,
                description: null,
                content: null,
                category: null,
                quantity: null,
                image: null,
                top: null,
                created_at: new Date().toLocaleString(),
            },
            categories: [],
        }
    },

    validations: {
        form: {
            name: {
                required,
                minLength: minLength(3),
            },
            description: {
                required,
                minLength: minLength(60),
            },
            content: {
                required,
                minLength: minLength(300),
            },
            category: {
                required,
            },
            quantity: {
                required,
                minLength: minLength(0),
                minValue: minValue(0),
            },
            price: {
                required,
                minLength: minLength(1),
                minValue: minValue(0.1),
            },
        }
    },

    async fetch() {
        await this.getData()
    },

    computed: {

        nameErrors() {
            const errors = [];
            if (!this.$v.form.name.$dirty) return errors;
            !this.$v.form.name.required && errors.push('Name is required');
            !this.$v.form.name.minLength && errors.push('Cannot be less than 3 characters');
            return errors
        },

        descriptionErrors() {
            const errors = [];
            if (!this.$v.form.description.$dirty) return errors;
            !this.$v.form.description.required && errors.push('Description is required');
            !this.$v.form.description.minLength && errors.push('Cannot be less than 60 characters');
            return errors
        },
        contentErrors() {
            const errors = [];
            if (!this.$v.form.content.$dirty) return errors;
            !this.$v.form.content.required && errors.push('Content is required');
            !this.$v.form.content.minLength && errors.push('Cannot be less than 300 characters');
            return errors
        },
        categoryErrors() {
            const errors = [];
            if (!this.$v.form.category.$dirty) return errors;
            !this.$v.form.category.required && errors.push('Category is required');
            return errors
        },
        priceErrors() {
            const errors = [];
            if (!this.$v.form.price.$dirty) return errors;
            !this.$v.form.price.required && errors.push('Price is required');
            !this.$v.form.price.minLength && errors.push('Cannot be less than 1 characters');
            !this.$v.form.price.minValue && errors.push('Cannot be less than 0');
            return errors
        },
        quantityErrors() {
            const errors = [];
            if (!this.$v.form.quantity.$dirty) return errors;
            !this.$v.form.quantity.required && errors.push('Quantity is required');
            !this.$v.form.quantity.minLength && errors.push('Cannot be less than 0 characters');
            !this.$v.form.quantity.minValue && errors.push('Cannot be less than 0.1');
            return errors
        },
    },

    methods: {

        async getData() {
            try {
                await this.$fire.firestore.collection('product-categories').get().then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.categories.push(doc.data())
                    });
                })
            } catch (e) {
                console.log(e)
            }

            if (this.$route.params.id) {
                try {
                    await this.$fire.firestore.collection('products').doc(this.$route.params.id).get()
                        .then((res) => {
                            this.form = res.data()
                        })
                } catch (e) {
                    console.log(e)
                }
            }

        },

        async save() {
            try {

                this.$v.form.$touch()

                if (!this.$v.form.$anyError) {

                    try {

                        if (this.$route.params.id) {
                            await this.$fire.firestore.collection('products')
                                .doc(this.$route.params.id)
                                .update(this.form).then(()=>{
                                    alert('Success.')
                                    this.$router.go(-1)
                                })
                        } else {
                            const productRef = this.$fire.firestore.collection('products').doc()
                            await productRef.set({...this.form, id: Date.now()}).then(() => {
                                alert('Success.')
                                this.$router.go(-1)
                            })
                        }

                    } catch (e) {
                        alert(e)
                    }

                }

            } catch (e) {
                alert(e)
            }
        },

        async remove(){
            if(confirm('Delete this product')){
                await this.$fire.firestore.collection('products')
                    .doc(this.$route.params.id)
                    .delete().then(()=>{
                        alert('Deleted!')
                        this.$router.go(-1)
                    })
            }
        },
    }
}
</script>
