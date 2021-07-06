<template>
    <v-app-bar :elevation="16" :max-height="64" :height="64">
        <v-container class="px-0 px-md-3 d-flex align-center justify-space-between">

            <nuxt-link to="/" class="font-weight-bold text-h6 text-md-h5" :class="{'white--text': $vuetify.theme.dark}">
                e-Commerce
            </nuxt-link>

            <nav-menu/>

            <div class="d-flex">

                <user v-if="loggedIn"/>

                <login v-else/>

                <dark-mode/>

            </div>

        </v-container>
    </v-app-bar>
</template>

<script>
export default {
    name: "Header",

    components:{
        User: ()=> import('~/components/app/header/auth/User'),
        Login: ()=> import('~/components/app/header/auth/Login'),
        NavMenu: ()=> import('~/components/app/nav/NavMenu'),
        DarkMode: ()=> import('~/components/app/header/DarkMode')
    },

    computed:{
        loggedIn(){
            return this.$store.state.auth.user
        },
    },
}
</script>
