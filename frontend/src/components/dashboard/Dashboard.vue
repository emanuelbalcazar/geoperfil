<template>
  <va-card>
    <div class="dashboard">Bienvenido a GeoPerfil Profesional</div>
    <br />
    <div class="flex md8 sm10 xs8">
      <va-input label="Ingrese su tarjeta de credito para poder darle un mejor servicio" />
    </div>
  </va-card>
</template>

<script>
export default {
  name: "dashboard",
  components: {},

  methods: {}
};
</script>

<style lang="scss">
.row-equal .flex {
  .va-card {
    height: 100%;
  }
}
.dashboard {
  .va-card {
    margin-bottom: 0 !important;
  }
}
</style>
