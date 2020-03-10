<template>
  <div class="dashboard">
    Bienvenido a
    <modal name="hello-world">hello, world!</modal>
  </div>
</template>

<script>
export default {
  name: "dashboard",
  components: {},
  methods: {
    show() {
          this.$modal.show("hello-world", { foo: "bar" });

    },
    hide() {
      this.$modal.hide("hello-world");
    }
  },
  created() {
    this.$modal.show("hello-world", { foo: "bar" });
  }
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
