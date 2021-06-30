<template>
    <v-main>
        <v-container class="mt-3 mt-md-10">

            <v-tabs centered center-active>

                <v-tab to="/admin" exact>
                    <v-icon v-text="'mdi-account-circle-outline'" left/>
                    Admin
                </v-tab>

                <v-tab to="/admin/products" exact>
                    <v-icon v-text="'mdi-format-list-bulleted-type'" left/>
                    Products
                </v-tab>

            </v-tabs>

            <v-card outlined class="pa-6 pa-md-16">
                <nuxt-child/>
            </v-card>

        </v-container>
    </v-main>
</template>

<script>

import {getUserFromCookie} from "../helpers";

export default {
    name: "admin",
    async fetch(app) {
        if(app.req){
            const cookie = app.req.headers.cookie
            let user = getUserFromCookie(cookie);

            if (!user) {
                app.redirect('/auth/sign-in')
            } else {
                if(!app.store.state.auth.user){
                    await app.store.dispatch('auth/GET_USER')
                }
            }
        }
    }
}
</script>
