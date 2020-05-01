<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="text.title">
          <form data-vv-scope="new-career">
            <!-- query -->
            <div class="flex md6 xs12">
              <va-select
                :label="text.selectQuery"
                v-model="selectedQuery"
                textBy="q"
                :options="queries"
                v-validate="'required'"
                name="query"
              />
              <p
                class="help is-danger"
                v-show="errors.has('new-career.query')"
              >{{ errorsText.query }}</p>
            </div>

            <!-- site -->
            <div class="flex md6 xs12">
              <va-select
                :label="text.selectSite"
                v-model="selectedSite"
                textBy="site"
                :options="sites"
                v-validate="'required'"
                name="website"
              />
              <p
                class="help is-danger"
                v-show="errors.has('new-career.website')"
              >{{ errorsText.site }}</p>
            </div>

            <va-button color="dark" type="button" @click="$router.go(-1)">Volver</va-button>

            <va-button color="success" type="button" @click="save">Guardar</va-button>
          </form>
        </va-card>
        <br />
        <va-card>
          Si la consulta de busqueda que desea no aparece, escriba una nueva:
          <div class="flex md6 sm6 xs12">
            <va-input
              label="Consulta de búsqueda"
              v-model="query.q"
              placeholder="Consulta de búsqueda"
              v-validate="'required'"
              data-vv-scope="query"
              name="q"
            />
            <p class="help is-danger" v-show="errors.has('query.q')">{{ errorsText.query }}</p>
          </div>

          <va-button color="info" @click="saveQuery">Guardar consulta</va-button>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VeeValidate from "vee-validate";

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
      errorsText: {
        query: "Escriba la consulta de búsqueda",
        selectedQuery: "Seleccione una consulta",
        selectedSite: "Seleccione un sitio"
      },
      queries: [],
      sites: [],
      selectedQuery: "",
      selectedSite: "",
      equationStatus: {
        active: true,
        lastExecution: 0,
        start: 1,
        site_id: 0,
        query_id: 0
      },
      query: {
        q: "",
        siteSearchFilter: "i"
      }
    };
  },
  created() {
    this.allQueries();
    this.allSites();
  },
  methods: {
    async allQueries() {
      let response = await axios.get("/api/queries", {
        page: "all"
      });

      this.queries = response.data.data;
    },
    async allSites() {
      let response = await axios.get("/api/sites", {
        page: "all"
      });

      this.sites = response.data.data;
    },
    async save() {
      this.$validator.validateAll("new-career").then(async valid => {
        if (valid) {
          this.equationStatus.site_id = this.selectedSite.id;
          this.equationStatus.query_id = this.selectedQuery.id;

          axios
            .post("/api/equations", this.equationStatus)
            .then(response => {
              if (response.data) {
                this.logSuccess("Ecuación guardado correctamente");
                this.$router.push({ name: "list-equations" });
              }
            })
            .catch(err => {
              this.logError(err.response.data.message);
            });
        }
      });
    },
    async saveQuery() {
      this.$validator.validate("query.q").then(async valid => {
        if (valid) {
          axios
            .post("/api/queries", this.query)
            .then(response => {
              if (response.data) {
                this.logSuccess("Consulta de búsqueda guardada correctamente");
                this.allQueries();
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
.row.row-inside {
  max-width: none;
}
</style>
