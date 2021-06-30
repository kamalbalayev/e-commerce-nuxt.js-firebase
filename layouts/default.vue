<template>
    <v-app dark>

        <app-header/>

        <nuxt/>

    </v-app>
</template>

<script>
import AppHeader from '~/components/app/header/Header';

export default {
    components: {
        AppHeader,
    },
    async fetch(){
        await this.$store.dispatch('auth/GET_USER')
    },
    beforeCreate() {
        this.$store.dispatch('auth/SET_ACCESS_TOKEN')
    },
}
</script>

<style lang="scss">
* {
    text-decoration: none !important;
}
</style>
