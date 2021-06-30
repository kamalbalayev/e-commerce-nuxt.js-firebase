<template>
    <v-main>
        <v-container>
            <v-row no-gutters justify="center" class="py-16">

                <v-col cols="12" sm="6" md="4">

                    <v-card elevation="16" rounded="lg" class="pa-3 pa-md-10">

                        <h2 class="text-h4 font-weight-bold text-center mb-8">Registration</h2>

                        <v-text-field v-model="form.displayName"
                                      label="User name"
                                      placeholder="Adam Smith"
                                      outlined
                                      prepend-inner-icon="mdi-account"
                                      :error-messages="displayNameErrors"/>

                        <v-text-field v-model="form.email"
                                      label="Email"
                                      placeholder="info@example.com"
                                      outlined type="email"
                                      prepend-inner-icon="mdi-at"
                                      :error-messages="emailErrors"/>

                        <v-text-field v-model="form.password"
                                      label="Password"
                                      placeholder="********"
                                      outlined type="password"
                                      prepend-inner-icon="mdi-account-key"
                                      :error-messages="passwordErrors"/>

                        <v-btn depressed block color="primary" @click="registration">
                            Create Account
                            <v-icon v-text="'mdi-send'" right/>
                        </v-btn>

                    </v-card>

                </v-col>

            </v-row>
        </v-container>
    </v-main>
</template>

<script>

import {validationMixin} from 'vuelidate'
import {required, minLength, email} from 'vuelidate/lib/validators'

export default {
    name: "index",
    mixins: [validationMixin],
    data() {
        return {
            form: {
                email: null,
                password: null,
            }
        }
    },

    validations: {
        form: {
            displayName: {
                required,
                minLength: minLength(6),
            },
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(8),
            },
        }
    },

    computed: {

        displayNameErrors() {
            const errors = [];
            if (!this.$v.form.displayName.$dirty) return errors;
            !this.$v.form.displayName.required && errors.push('User name is required');
            !this.$v.form.displayName.minLength && errors.push('Cannot be less than 8 characters');
            return errors
        },

        emailErrors() {
            const errors = [];
            if (!this.$v.form.email.$dirty) return errors;
            !this.$v.form.email.required && errors.push('Email is required');
            !this.$v.form.email.email && errors.push('Format is not correct');
            return errors
        },

        passwordErrors() {
            const errors = [];
            if (!this.$v.form.password.$dirty) return errors;
            !this.$v.form.password.required && errors.push('Password is required');
            !this.$v.form.password.minLength && errors.push('Cannot be less than 8 characters');
            return errors
        }
    },

    methods: {
        async registration() {
            try {

                this.$v.form.$touch()

                if (!this.$v.form.$anyError) {
                    await this.$store.dispatch('auth/REGISTRATION', this.form)
                }

            } catch (e) {
                alert(e)
            }
        },
    }
}
</script>
