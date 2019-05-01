<template>
    <v-container fluid fill-height>
        <v-layout align-center justify-center>
            <v-card width="600" height="330">

                        <v-toolbar dark color="primary">
                            <v-toolbar-title >Login form</v-toolbar-title>
                        </v-toolbar>

                        <v-card-text>
                    <v-form>

                        <v-text-field name="email" label="Mail" id="email" v-model="email" type="email" required></v-text-field>
                        <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required></v-text-field>

                        <!--<loader></loader>-->
                        <div class="text-xs-center">
                            <v-btn round color="primary"  @click="onSignin">Sign in</v-btn>
                        </div>


                    <div v-if="auth">

                                <v-text-field name="authCode" label="Verification code" id="authCode" v-model="authCode" type="authCode" required></v-text-field>
                                <v-btn round color="primary"  @click="validateCode">Confirm</v-btn>

                    </div>
                    </v-form>
                        </v-card-text>

            </v-card>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                email: null,
                password: null,
                auth: '',
                authCode: '',
            };
        },
        methods: {
            onSignin() {
                this.$store
                    .dispatch("LOGIN", {email: this.email, password: this.password})
                    .then(res => {
                        this.auth = res.data;
                    });
            },
            validateCode () {
                this.$store.dispatch("VERIFYCODE", {email: this.email, authCode: this.authCode}).then(res => {
                    if(res.data != null){
                        this.$store.dispatch("DETAILMETHOD", {data: res.data})
                        this.$router.push({
                            name: 'products'
                        });
                    }
                }).catch(err => console.log(err));
            },
        },
    };
</script>
