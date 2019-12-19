<template>
  <form @submit.prevent="onsubmit" class="login">
    <div class="row mb-2">
      <va-input
        v-model="email"
        type="email"
        :label="$t('auth.email')"
        :error="!!emailErrors.length"
        :error-messages="emailErrors"
      />
    </div>
    <div class="row justify--center">
      <va-button type="submit" class="my-0">{{ $t('auth.reset_password') }}</va-button>
    </div>
  </form>
</template>

<script>
let axios = require("axios");

export default {
  name: 'recover-password',
  data () {
    return {
      email: '',
      emailErrors: [],
    }
  },
  methods: {
    async onsubmit () {
      this.emailErrors = this.email ? [] : ["Email es requerido"];
     
      let response = await axios
        .post("/api/auth/recover", {
          email: this.email
        })
        .catch(error => {
          this.logError("Usuario o contraseña invalidos", {
            text: "¿No esta registrado?",
            href: "signup"
          });
        });

      // this.$cookies.set("token", response.data.access_token.token);
      // this.$cookies.set("userId", response.data.user.id);
      this.$cookies.set("email", response.data.user.email);
    },
  },
}

</script>

<style lang="scss">
</style>
