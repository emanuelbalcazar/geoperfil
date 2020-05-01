<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <!-- card -->
        <va-card :title="text.title">
          <form @submit.prevent="update">
            <div class="row">
              <div class="flex md6 sm6 xs12">
                <va-input
                  label="Nombre"
                  v-model="career.name"
                  placeholder="Nombre de la carrera"
                  v-validate="'required'"
                  name="name"
                />
                <p class="help is-danger" v-show="errors.has('name')">{{ errorsText.name }}</p>
              </div>
            </div>

            <div class="row">
              <div class="flex md6 sm6 xs12">
                <va-input
                  type="number"
                  min="1"
                  max="20"
                  label="Duración"
                  v-model="career.duration"
                  placeholder="Duración en años"
                  v-validate="'required'"
                  name="duration"
                />
                <p class="help is-danger" v-show="errors.has('duration')">{{ errorsText.duration }}</p>
              </div>
            </div>

            <va-button color="success" type="submit">Actualizar</va-button>
          </form>
        </va-card>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";
import VeeValidate from "vee-validate";

export default {
  name: "edit-career",
  components: {},
  data() {
    return {
      text: {
        title: "Editando una carrera"
      },
      errorsText: {
        duration: "La duración es requerida",
        name: "El nombre es requerido"
      },
      career: {
        name: "",
        duration: 1
      }
    };
  },
  created() {
    this.findById(this.$route.params.id);
  },
  methods: {
    findById(id) {
      axios
        .get("/api/careers/" + id)
        .then(response => {
          if (!response.data) {
            this.logError("No existe la carrera con id: " + id);
            this.$router.push({ name: "list-sites" });
            return;
          }

          this.career = response.data;
        })
        .catch(err => {
          this.logError(err);
          this.$router.push({ name: "list-sites" });
        });
    },
    update(event) {
      this.$validator.validate().then(async valid => {
        if (valid) {
          axios
            .put("/api/careers/" + this.career.id)
            .then(response => {
              if (response.data) {
                this.logSuccess("Carrera actualizada correctamente");
                this.$router.push({ name: "list-careers" });
              }
            })
            .catch(err => {
              this.logError(err.response.data.message);
            });
        }
      });
    }
  }
};
</script>

<style>
</style>
