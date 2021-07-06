<template>
    <div class="d-flex align-center">

        <v-btn to="/admin"
               :icon="$vuetify.breakpoint.xsOnly"
               :fab="$vuetify.breakpoint.xsOnly"
               :small="$vuetify.breakpoint.xsOnly"
               :depressed="$vuetify.breakpoint.smAndUp"
               rounded color="primary" class="mr-md-2">

            <v-icon v-text="'mdi-account'" :left="$vuetify.breakpoint.smAndUp"/>

            {{$vuetify.breakpoint.smAndUp ? user.displayName : ''}}

        </v-btn>

        <v-btn icon fab small color="primary" class="mr-md-2" @click="logOut">
            <v-icon v-text="'mdi-logout'"/>
        </v-btn>

    </div>
</template>

<script>
export default {
    name: "User",
    computed:{
        user(){
            return this.$store.state.auth.user
        }
    },
    methods:{
        async logOut(){
            if(confirm('Do you want to sign out of account?')){
                await this.$store.dispatch('auth/LOG_OUT')
            }
        }
    }
}
</script>
