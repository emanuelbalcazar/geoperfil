<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="text.title">
          <form @submit.prevent="update">
            <div class>
              <div class="flex md6 sm6 xs12">
                <va-input
                  label="Nombre"
                  v-model="institution.name"
                  v-validate="'required'"
                  name="name"
                />
                <p
                  class="help is-danger"
                  style="color:red"
                  v-show="errors.has('name')"
                >{{ errorsText.name }}</p>
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

            <va-button color="info" type="button" @click="showAddCampusModal">Agregar sede</va-button>
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

        <!-- Add campus modal -->
        <va-modal
          v-model="modal.showAddCampusModal"
          size="large"
          :okText="'Agregar'"
          :cancelText="'Cancelar'"
          title="Agregando una nueva sede"
          :noOutsideDismiss="true"
          @ok="addCampus"
        >
          <div class="flex xs12">
            <va-select
              searchable
              :label="text.selectCampus"
              v-model="selectedCampus"
              textBy="name"
              :options="campuses"
              :noOptionsText="text.noOptionsText"
              v-validate="'required'"
              name="hasCampus"
            />

            <p
              class="help is-danger"
              style="color:red"
              v-show="errors.has('hasCampus')"
            >{{ errorsText.hasCampus }}</p>
          </div>
        </va-modal>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VeeValidate from "vee-validate";

export default {
  name: "edit-institution",
  components: {},
  data() {
    return {
      text: {
        title: "Editando una institución",
        table: "Sedes de la institución",
        noData: "No se encontraron sedes",
        selectCampus: "Seleccione la sede",
        noOptionsText: "No se encontraron sedes"
      },
      errorsText: {
        hasCampus: "Seleccione una sede",
        name: "El nombre es requerido"
      },
      modal: {
        showAddCampusModal: false
      },
      selectedCampus: "",
      institution: {
        acronym: "",
        name: "",
        site: "",
        campuses: []
      },
      campuses: []
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
    async findById(id) {
      axios
        .get("/api/institutions/" + id)
        .then(response => {
          if (!response.data) {
            this.logError("No existe la institucion con id: " + id);
            this.$router.push({ name: "list-institutions" });
            return;
          }

          this.institution = response.data;
          this.findAllCampus();
        })
        .catch(err => {
          this.logError(err.response.data.message);
          this.$router.push({ name: "list-institutions" });
        });
    },
    async findAllCampus() {
      const params = { page: "all" };

      let response = await axios.get("/api/campuses", params);
      let options = response.data || [];

      this.campuses = options.filter(
        x => !this.institution.campuses.filter(y => y.id === x.id).length
      );
    },
    update(event) {
      this.$validator.validate("name").then(async valid => {
        if (valid) {
          delete this.institution.campuses;

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
      });
    },
    showAddCampusModal() {
      this.modal.showAddCampusModal = true;
    },
    addCampus() {
      this.$validator.validate("hasCampus").then(async valid => {
        if (valid) {
          this.selectedCampus.institution_id = this.institution.id;

          let response = await axios.put(
            "/api/campuses/" + this.selectedCampus.id,
            this.selectedCampus
          );

          this.logSuccess("Sede agregada correctamente");

          this.institution.campuses.push(this.selectedCampus);
          this.findById(this.$route.params.id);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.row.row-inside {
  max-width: none;
}

.va-modal {
  width: 500px;
}
</style>
