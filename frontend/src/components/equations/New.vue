<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="text.title">
          <!-- query -->
          <div class="flex md6 xs12">
            <va-select
              :label="text.selectQuery"
              v-model="selectedQuery"
              textBy="q"
              :options="queries"
            />
          </div>

          <!-- site -->
          <div class="flex md6 xs12">
            <va-select
              :label="text.selectSite"
              v-model="selectedSite"
              textBy="site"
              :options="sites"
            />
          </div>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "new-equation",
  components: {},
  data() {
    return {
      text: {
        title: "Crear ecuación de busqueda",
        selectQuery: "Seleccione la consulta de búsqueda",
        selectSite: "Seleccione el sitio web"
      },
      queries: [],
      sites: [],
      selectedQuery: "",
      selectedSite: ""
    };
  },
  created() {
    this.allQueries();
    this.allSites();
  },
  methods: {
    async allQueries() {
      let response = await axios.get("/api/queries", {
        page: 1,
        perPage: 20
      });

      this.queries = response.data.data;
    },
    async allSites() {
      let response = await axios.get("/api/sites", {
        page: 1,
        perPage: 20
      });

      this.sites = response.data.data;
    }
  }
};
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
