<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="text.title">
          <form @submit.prevent="update">
            <div class="row">
              <div class="flex md6 sm6 xs12">
                <va-input v-model="selector" placeholder="Escriba el selector" />
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

export default {
  name: "edit-selector",
  components: {},
  data() {
    return {
      text: {
        title: "Editando el selector"
      },
      id: 0,
      selector: ""
    };
  },
  created() {
    this.findById(this.$route.params.id);
  },
  methods: {
    findById(id) {
      axios
        .get("/api/selectors/" + id)
        .then(response => {
          if (!response.data) {
            this.logError("No existe el selector con id: " + id);
            this.$router.push({ name: "list-selectors" });
            return;
          }

          this.id = response.data.id;
          this.selector = response.data.selector;
        })
        .catch(err => {
          this.logError(err);
          this.$router.push({ name: "list-selectors" });
        });
    },
    update(event) {
      axios
        .put("/api/selectors/" + this.id, { selector: this.selector })
        .then(response => {
          if (response.data) {
            this.logSuccess("Selector Actualizado Correctamente");
            this.$router.push({ name: "list-selectors" });
          }
        })
        .catch(err => {
          this.logError(err);
          this.$router.push({ name: "list-selectors" });
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
