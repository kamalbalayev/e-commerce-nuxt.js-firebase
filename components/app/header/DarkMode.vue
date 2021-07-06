<template>
    <v-tooltip bottom>

        <template #activator="{ on, attrs }">
            <v-btn icon fab small
                   v-bind="attrs" v-on="on"
                   :title="darkMode ? 'Light Mode' : 'Night Mode'"
                   @click="setDarkMode">

                <v-icon v-text="`mdi-${darkMode ? 'white-balance-sunny' : 'weather-night'}`"/>

            </v-btn>
        </template>

        {{ darkMode ? 'Light Mode' : 'Night Mode' }}

    </v-tooltip>
</template>

<script>
export default {
    name: "DarkMode",
    computed: {
        darkMode() {
            return this.$vuetify.theme.dark
        }
    },

    created() {
        this.getDarkMode()
    },

    methods: {

        getDarkMode() {
            this.$vuetify.theme.dark = !!this.$storage.getCookie('darkMode')
        },

        setDarkMode() {
            this.$storage.setCookie('darkMode', !this.darkMode, {maxAge: 3600 * 24 * 365})
            this.$vuetify.theme.dark = !this.darkMode
        },
    }

}
</script>
