import jwtDecode from "jwt-decode";

export const state = () => ({
    user: null
})

export const mutations = {
    SET_USER(state, payload) {
        if (payload && payload.user) {
            state.user = payload.user

            if (payload.redirect) {
                this.$router.push('/admin')
            }
        } else {
            state.user = null
        }
    }
}

export const actions = {

    async GET_USER({commit}, redirect) {
        try {

            const currentUser = this.$fire.auth.currentUser

            if (currentUser) {

                const user = {
                    uid: currentUser.uid,
                    displayName: currentUser.displayName,
                    email: currentUser.email,
                    emailVerified: currentUser.emailVerified,
                    photoURL: currentUser.photoURL,
                    phoneNumber: currentUser.phoneNumber
                }
                commit('SET_USER', {user, redirect})

            } else {

                const accessTokenCookie = this.$storage.getCookie('access_token')
                if(accessTokenCookie){
                    const decodedToken = jwtDecode(accessTokenCookie)

                    if(decodedToken){
                        const user = {
                            uid: decodedToken.user_id,
                            displayName: decodedToken.name,
                            email: decodedToken.email,
                            emailVerified: decodedToken.email_verified,
                            photoURL: null,
                            phoneNumber: null
                        }

                        commit('SET_USER', {user, redirect})
                    }
                }
            }
        } catch (e) {
            console.log(e)
        }
    },

    async SIGN_IN({dispatch}, form) {
        await this.$fire.auth.signInWithEmailAndPassword(form.email, form.password).then((res) => {
            dispatch('GET_USER', true)
        })
    },

    async LOG_OUT({commit}) {
        await this.$fire.auth.signOut().then(() => {
            commit('SET_USER', null)
            this.$storage.removeCookie('access_token')
            this.$router.push('/auth/sign-in')

        })
    },

    async REGISTRATION({dispatch}, form) {
        await this.$fire.auth.createUserWithEmailAndPassword(form.email, form.password).then((res) => {

            this.$fire.auth.currentUser.updateProfile({
                displayName: form.displayName,
            })

            dispatch('GET_USER', true)
        })
    },

    async SET_ACCESS_TOKEN({dispatch}) {
        await this.$fire.auth.onAuthStateChanged(user => {
            if (user) {
                this.$fire.auth.currentUser.getIdToken(true).then(token => {
                    this.$storage.setCookie('access_token', token, {maxAge: 2592000})

                    dispatch('GET_USER')
                })
            } else {
                this.$storage.removeCookie('access_token')
            }
        })
    }

}
