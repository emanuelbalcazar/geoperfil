<template>
  <div class="container">
    <template>
      <div class="form-elements">
        <div class="row">
          <div class="flex xs12">
            <va-card :title="text.title">asdasds</va-card>
          </div>
        </div>
      </div>
    </template>

    <br />
    <div class="field is-grouped">
      <div class="control">
        <button @click="exit()" class="button is-danger">Salir</button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "suggestions",
  data() {
    return {
      text: {
        title: "Sugerencias y solicitudes de nueva información"
      }
    };
  },
  methods: {
    exit() {
      this.$modal.hide("suggestions");
    },
    open() {
      this.$modal.show("suggestions", { clickToClose: false });
    }
  }
};
</script>

<style lang="scss">
</style>
