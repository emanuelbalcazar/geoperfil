
<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="text.title">
          <div class="flex md10 xs12">
            <va-select
              :label="text.selectLabel"
              v-model="selectedOption"
              textBy="name"
              :options="options"
            />
          </div>

          <div class="flex md10 sm10 xs12">
            <va-input label="Escriba el nuevo dato" v-model="alert.data" placeholder />
          </div>

          <div class="flex md10 sm10 xs12">
            <va-input label="Agregue una descripción (opcional)" v-model="alert.description" />
          </div>

          <br />
          <div class="field is-grouped">
            <div class="control">
              <button @click="exit()" class="button is-danger">Salir</button>
            </div>

            <div class="control">
              <button @click="send()" class="button is-success">Enviar</button>
            </div>
          </div>
        </va-card>
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
        title: "Sugerencias y solicitudes de nueva información",
        selectLabel: "¿Qué desea sugerir?"
      },
      alert: {
        name: "",
        type: "",
        priority: 3,
        description: "",
        status: "pending",
        data: ""
      },
      options: [
        {
          id: 1,
          name: "Sugerir una nueva sede institucional",
          type: "newCampus"
        },
        {
          id: 2,
          name: "Sugerir una nueva institución",
          type: "newInstitution"
        },
        {
          id: 3,
          name: "Sugerir una nueva carrera",
          type: "newCareer"
        }
      ],
      selectedOption: ""
    };
  },
  methods: {
    exit() {
      this.$modal.hide("suggestions");
    },
    open() {
      this.$modal.show("suggestions", { clickToClose: false });
    },
    send() {
        this.alert.name = this.selectedOption.name;
        this.alert.type = this.selectedOption.type;

        alert(JSON.stringify(this.alert));
    }
  }
};
</script>

<style lang="scss">
</style>
