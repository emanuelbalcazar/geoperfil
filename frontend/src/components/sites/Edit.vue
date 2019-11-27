<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <!-- card -->
        <va-card :title="text.title">
          <form @submit.prevent="update">
            <div class="row">
              <div class="flex md6 sm6 xs12">
                <va-input v-model="site.site" placeholder="Escriba el sitio" />
              </div>
            </div>

            <div class="row">
              <div class="flex md6 sm6 xs12">
                <va-input v-model="site.description" placeholder="Descripción del sitio" />
              </div>
            </div>

            <va-button color="success" type="submit">Actualizar</va-button>
          </form>
        </va-card>

        <!-- selectors -->
        <va-card :title="text.table">
          <va-data-table
            :fields="fields"
            :data="site.selectors"
            :no-data-label="text.noData"
            no-pagination
          >
            <template slot="actions" slot-scope="props">
              <va-button flat small color @click="editSelector(props.rowData)" class="ma-0">Editar</va-button>

              <va-button
                flat
                small
                color="danger"
                @click="removeSelector(props.rowData)"
                class="ma-0"
              >Borrar</va-button>
            </template>
          </va-data-table>
        </va-card>

        <!-- modal edit selector -->
        <va-modal
          v-model="modal.showEditSelector"
          size="large"
          :okText="'Actualizar'"
          :cancelText="'Cancelar'"
          title="Editando selector"
          :noOutsideDismiss="true"
          @ok="updateSelector"
        >
          <div class="flex xs12">
            <va-input label="Selector" v-model="selector.selector" placeholder="Selector" />
          </div>

          <div class="flex xs12">
            <va-input label="Descripción" v-model="selector.description" placeholder="Descripción" />
          </div>
        </va-modal>

        <!-- ¿delete selector? -->
        <va-modal
          v-model="modal.showDeleteSelector"
          size="large"
          :okText="'Eliminar'"
          :cancelText="'Cancelar'"
          title="¿Desea elimilar el selector?"
          message="Esta accion eliminara el selector seleccionado"
          :noOutsideDismiss="true"
          @ok="deleteSelector"
        />
      </div>
    </div>
  </div>
</template>


<script>
import axios from "axios";

export default {
  name: "edit-site",
  components: {},
  data() {
    return {
      text: {
        title: "Editando el sitio",
        table: "Selectores",
        noData: "No se encontraron selectores."
      },
      site: { selectors: [] },
      selector: {},
      modal: {
        showEditSelector: false,
        showDeleteSelector: false,
        size: "medium",
        noOutsideDismiss: true
      }
    };
  },
  created() {
    this.findById(this.$route.params.id);
  },
  computed: {
    fields() {
      return [
        {
          name: "selector",
          title: "Selector"
        },
        {
          name: "description",
          title: "Descripción"
        },
        {
          name: "__slot:actions",
          dataClass: "text-right"
        }
      ];
    }
  },
  methods: {
    editSelector(selector) {
      this.selector = Object.assign({}, selector);
      this.modal.showEditSelector = true;
    },
    updateSelector() {
      axios
        .put("/api/selectors/" + this.selector.id, this.selector)
        .then(response => {
          this.logSuccess("Selector actualizado correctamente");
          this.findById(this.$route.params.id);
        });
    },
    removeSelector(selector) {
      this.selector = Object.assign({}, selector);
      this.modal.showDeleteSelector = true;
    },
    deleteSelector() {
      axios.delete("/api/selectors/" + this.selector.id).then(response => {
        console.log(response.data);
        this.logSuccess("Selector eliminado correctamente");
        this.findById(this.$route.params.id);
      });
    },
    findById(id) {
      axios
        .get("/api/sites/" + id)
        .then(response => {
          if (!response.data) {
            this.logError("No existe el sitio con id: " + id);
            this.$router.push({ name: "list-sites" });
            return;
          }

          this.site = response.data;
        })
        .catch(err => {
          this.logError(err);
          this.$router.push({ name: "list-sites" });
        });
    },
    update(event) {
      axios
        .put("/api/sites/" + this.site.id, {
          site: this.site.site,
          description: this.site.description || ""
        })
        .then(response => {
          if (response.data) {
            this.logSuccess("Sitio actualizado correctamente");
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
