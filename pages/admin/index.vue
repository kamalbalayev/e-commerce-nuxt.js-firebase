<template>
    <div class="text-center" v-if="user">
        <h2 class="text-h4 mb-6">Hi {{ user.displayName || 'Admin' }}!</h2>
        <p>Welcome To Admin</p>
    </div>
</template>

<script>

export default {
    name: "index",
    computed:{
        user(){
            return this.$store.state.auth.user
        }
    },
}
</script>
