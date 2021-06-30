<template>
    <nav class="d-flex">

        <v-btn text rounded :to="item.path"
               active-class="primary" class="mr-2"
               v-for="(item, i) in navMenu" :key="`item-${i}`">

            <v-icon v-text="`mdi-${item.icon}`" :left="$vuetify.breakpoint.smAndUp"/>

            {{$vuetify.breakpoint.smAndUp ? item.title : ''}}

        </v-btn>

    </nav>
</template>

<script>
export default {
    name: "NavMenu",
    computed:{
        navMenu(){
            return this.$store.state.app.nav
        }
    }
}
</script>
