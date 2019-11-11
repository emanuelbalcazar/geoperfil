<template>
  <form @submit.prevent="onsubmit">
    <va-input
      v-model="email"
      type="email"
      :label="$t('auth.email')"
      :error="!!emailErrors.length"
      :error-messages="emailErrors"
    />

    <va-input
      v-model="password"
      type="password"
      :label="$t('auth.password')"
      :error="!!passwordErrors.length"
      :error-messages="passwordErrors"
    />

    <div class="auth-layout__options d-flex align--center justify--space-between">
      <router-link
        class="ml-1 link"
        :to="{name: 'recover-password'}"
      >{{$t('auth.recover_password')}}</router-link>
    </div>

    <div class="d-flex justify--center mt-3">
      <va-button type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
    </div>
  </form>
</template>

<script>
let axios = require("axios");

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
      emailErrors: [],
      passwordErrors: []
    };
  },
  computed: {
    formReady() {
      return !this.emailErrors.length && !this.passwordErrors.length;
    }
  },
  methods: {
    async onsubmit() {
      this.emailErrors = this.email ? [] : ["Email es requerido"];
      this.passwordErrors = this.password ? [] : ["Contraseña es requerida"];

      if (!this.formReady) {
        return;
      }

      let response = await axios
        .post("/api/auth/login", {
          email: this.email,
          password: this.password
        })
        .catch(error => {
          this.logError("Usuario o contraseña invalidos", {
            text: "¿No esta registrado?",
            href: "signup"
          });
        });

      localStorage.setItem("token", response.data.access_token.token);
      localStorage.setItem("userId", response.data.user.id);
      localStorage.setItem("email", response.data.user.email);

      this.$router.push("dashboard");
      this.logSuccess("Bienvenido a Geoperfil");
    }
  }
};
</script>

<style lang="scss">
</style>
