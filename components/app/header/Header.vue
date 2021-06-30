<template>
    <v-app-bar :elevation="16" :max-height="64" :height="64">
        <v-container class="px-0 px-md-3 d-flex align-center justify-space-between">

            <nuxt-link to="/" class="font-weight-bold text-h5">
                e-Commerce
            </nuxt-link>

            <nav-menu/>

            <user v-if="loggedIn"/>

            <login v-else/>

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
    },
    computed:{
        loggedIn(){
            return this.$store.state.auth.user
        }
    }
}
</script>
