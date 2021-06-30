<template>
    <div class="d-flex">

        <v-btn to="/auth/sign-in"
               :icon="$vuetify.breakpoint.xsOnly"
               :fab="$vuetify.breakpoint.xsOnly"
               :small="$vuetify.breakpoint.xsOnly"
               :depressed="$vuetify.breakpoint.smAndUp"
               color="primary" rounded class="mr-2">

            <v-icon v-text="'mdi-account'" :left="$vuetify.breakpoint.smAndUp"/>

            {{$vuetify.breakpoint.smAndUp ? 'Sign in' : ''}}

        </v-btn>

        <v-btn to="/auth/registration"
               :icon="$vuetify.breakpoint.xsOnly"
               :fab="$vuetify.breakpoint.xsOnly"
               :small="$vuetify.breakpoint.xsOnly"
               :outlined="$vuetify.breakpoint.smAndUp"
                color="primary" rounded>

            <v-icon v-text="'mdi-account-plus'" :left="$vuetify.breakpoint.smAndUp"/>

            {{$vuetify.breakpoint.smAndUp ? 'Registration' : ''}}

        </v-btn>

    </div>
</template>

<script>
export default {
    name: "login"
}
</script>
