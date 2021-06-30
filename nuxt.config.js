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
            apiKey: process.env.FIRE_API_KEY,
            authDomain: process.env.FIRE_AUTH_DOMAIN,
            projectId: process.env.FIRE_PROJECT_ID,
            storageBucket: process.env.FIRE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIRE_MESSAGING_SENDER_ID,
            appId: process.env.FIRE_APP_ID,
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
