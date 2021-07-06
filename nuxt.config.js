import colors from 'vuetify/es5/util/colors'

export default {
    head: {
        titleTemplate: '%s - e-commerce',
        title: 'e-commerce',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: ''}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
        ]
    },

    css: [],

    plugins: [],

    components: true,

    buildModules: [
        '@nuxtjs/vuetify',
    ],

    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/firebase',
        '@nuxtjs/universal-storage',
    ],

    firebase: {
        config: {
            apiKey: 'AIzaSyAy1tnZ9Yse6ifdsAfG_nQ1c68I8uKOrPg',
            authDomain: 'test-e-commerce-8918a.firebaseapp.com',
            projectId: 'test-e-commerce-8918a',
            storageBucket: 'test-e-commerce-8918a.appspot.com',
            messagingSenderId: '22567866489',
            appId: '1:22567866489:web:1acc177082a2b493a8c4a8',
            // measurementId: '<measurementId>'
        },
        services: {
            auth: {
                ssr: true
            },
            firestore: true,
            storage: true
        }
    },

    axios: {},

    pwa: {
        manifest: {
            lang: 'en'
        }
    },

    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        theme: {
            dark: false,
            themes: {
                dark: {
                    primary: colors.blue.darken2,
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },

    build: {}
}
