<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <!-- card -->
        <va-card :title="text.title">
          <form @submit.prevent="save">
            <div class="row">
              <div class="flex md6 sm6 xs12">
                <va-input v-model="site.site" placeholder="Coloque la URL del sitio" />
              </div>
            </div>

            <div class="row">
              <div class="flex md6 sm6 xs12">
                <va-input v-model="site.description" placeholder="Descripción del sitio" />
              </div>
            </div>

            <va-button color="success" type="submit">Guardar</va-button>
          </form>
        </va-card>
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "new-site",
  components: {},
  data() {
    return {
      text: {
        title: "Creando un sitio",
        table: "Selectores",
        noData: "No se encontraron selectores."
      },
      site: { selectors: [] },
      selector: { selector: "", description: "" },
      modal: {
        showEditSelector: false,
        showDeleteSelector: false,
        showAddSelector: false,
        size: "medium",
        noOutsideDismiss: true
      }
    };
  },
  created() {},
  computed: {},
  methods: {
    save(event) {
      axios
        .post("/api/sites", {
          site: this.site.site,
          description: this.site.description || ""
        })
        .then(response => {
          if (response.data) {
            this.logSuccess("Sitio guardado correctamente");
            this.$router.push({ name: "list-sites" });
          }
        })
        .catch(err => {
          this.logError(err);
          this.$router.push({ name: "list-sites" });
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
