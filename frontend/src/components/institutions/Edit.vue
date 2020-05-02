<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="text.title">
          <form @submit.prevent="update">
            <div class>
              <div class="flex md6 sm6 xs12">
                <va-input label="Nombre" v-model="institution.name" />
              </div>

              <div class="flex md6 sm6 xs12">
                <va-input label="Acronimo" v-model="institution.acronym" />
              </div>

              <div class="flex md6 sm6 xs12">
                <va-input label="Sitio web" v-model="institution.site" />
              </div>
            </div>

            <va-button color="dark" type="button" @click="$router.go(-1)">Volver</va-button>

            <va-button color="success" type="submit">Actualizar</va-button>
          </form>
        </va-card>
        <br />

        <va-card :title="text.table">
          <va-accordion>
            <va-collapse>
              <span slot="header">Sedes de {{institution.name}}</span>
              <div slot="body">
                <va-data-table
                  :fields="fields"
                  :data="institution.campuses"
                  :no-data-label="text.noData"
                  :loading="loading"
                  :per-page="parseInt(perPage)"
                  :totalPages="totalPages"
                  @page-selected="readItems"
                  api-mode
                >
                  <template slot="actions" slot-scope="props">
                    <va-button
                      flat
                      small
                      color
                      @click="edit(props.rowData)"
                      class="ma-0"
                    >{{ $t('tables.edit') }}</va-button>
                  </template>
                </va-data-table>
              </div>
            </va-collapse>
          </va-accordion>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "edit-institution",
  components: {},
  data() {
    return {
      text: {
        title: "Editando una institución",
        table: "Sedes de la institución",
        noData: "No se encontraron sedes"
      },
      institution: {
        acronym: "",
        name: "",
        site: "",
        campuses: []
      }
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "id",
          title: "ID"
        },
        {
          name: "name",
          title: "Nombre"
        },
        {
          name: "address",
          title: "Dirección"
        }
      ];
    }
  },
  created() {
    this.findById(this.$route.params.id);
  },
  methods: {
    findById(id) {
      axios
        .get("/api/institutions/" + id)
        .then(response => {
          if (!response.data) {
            this.logError("No existe la institucion con id: " + id);
            this.$router.push({ name: "list-institutions" });
            return;
          }

          this.institution = response.data;
        })
        .catch(err => {
          this.logError(err.response.data.message);
          this.$router.push({ name: "list-institutions" });
        });
    },
    update(event) {
      axios
        .put("/api/institutions/" + this.institution.id, this.institution)
        .then(response => {
          if (response.data) {
            this.logSuccess("Institución actualizada correctamente");
            this.$router.push({ name: "list-institutions" });
          }
        })
        .catch(err => {
          this.logError(err.response.data.message);
          this.$router.push({ name: "list-institutions" });
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
