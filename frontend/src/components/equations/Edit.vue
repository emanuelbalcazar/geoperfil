<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="text.title">
          <form @submit.prevent="update">
            <div class>
              <div class="flex md6 sm6 xs12">
                <va-input label="Consulta" v-model="equation.equation.q" :disabled="true" />
              </div>

              <div class="flex md6 sm6 xs12">
                <va-input label="Sitio" v-model="equation.site.site" :disabled="true" />
              </div>

              <div class="flex md6 sm6 xs12">
                <va-input label="Inicio" v-model="equation.start" />
              </div>

              <div class="flex md6 sm6 xs12">
                <va-input
                  label="Ultimo mes de ejecución"
                  v-model="equation.lastExecution"
                  :disabled="true"
                />
              </div>

              <va-toggle v-model="equation.active" label="¿Activo?" small />
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

export default {
  name: "edit-equation",
  components: {},
  data() {
    return {
      text: {
        title: "Ecuación de busqueda"
      },
      equation: {
        active: false,
        equation: {},
        equation_id: 0,
        id: 0,
        lastExecution: 0,
        site: {},
        site_id: 0,
        start: 1
      }
    };
  },
  created() {
    this.findById(this.$route.params.id);
  },
  methods: {
    findById(id) {
      axios
        .get("/api/equations/" + id)
        .then(response => {
          if (!response.data) {
            this.logError("No existe la ecuación con id: " + id);
            this.$router.push({ name: "list-equations" });
            return;
          }

          this.equation = response.data;
        })
        .catch(err => {
          this.logError(err);
          this.$router.push({ name: "list-equations" });
        });
    },
    update(event) {
      axios
        .put("/api/equations/" + this.equation.id, { active: this.equation.active })
        .then(response => {
          if (response.data) {
            this.logSuccess("Ecuación actualizada correctamente");
            this.$router.push({ name: "list-equations" });
          }
        })
        .catch(err => {
          this.logError(err);
          this.$router.push({ name: "list-equations" });
        });
    }
  }
};
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
