<template>
  <va-card :title="title.table">
    <div class="row align--center">
      <div class="flex xs12 md6">
        <va-input :value="toSearch" :placeholder="title.search" @input="search">
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
    </div>

    <va-data-table
      :fields="fields"
      :data="items"
      :loading="loading"
      :per-page="perPage"
      :totalPages="totalPages"
      :no-data-label="title.noData"
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

        <va-button
          flat
          small
          color="danger"
          @click="showRemoveSiteModal(props.rowData)"
          class="ma-0"
        >{{ $t('tables.delete') }}</va-button>
      </template>
    </va-data-table>

    <va-modal
      v-model="modal.showRemoveSite"
      size="large"
      :okText="'Eliminar'"
      :cancelText="'Cancelar'"
      title="¿Desea elimilar el sitio?"
      message="Esta accion eliminará el sitio seleccionado"
      :noOutsideDismiss="true"
      @ok="deleteSite"
    />
  </va-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: {
        table: "Listado de Sitios",
        perPage: "Por Páginas",
        search: "Buscar por texto de sitio",
        noData: "No se encontraron sitios"
      },
      modal: {
        showRemoveSite: false
      },
      perPage: 10,
      totalPages: 0,
      items: [],
      loading: false,
      toSearch: null,
      site: {}
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
          name: "site",
          title: "Sitio"
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
  created() {
    this.readItems();
  },
  methods: {
    search(toSearch) {
      this.toSearch = toSearch;
      this.readItems();
    },
    readItems(page = 1) {
      this.loading = true;

      const params = {
        perPage: this.perPage,
        page: page,
        columnValue: this.toSearch
      };

      axios.get("/api/sites", { params }).then(response => {
        this.items = response.data.data;
        this.totalPages = response.data.lastPage;
        this.loading = false;
        this.perPage = response.data.perPage;
      });
    },
    edit(site) {
      this.$router.push({ name: "edit-site", params: { id: site.id } });
    },
    showRemoveSiteModal(site) {
      this.site = Object.assign({}, site);
      this.modal.showRemoveSite = true;
    },
    deleteSite() {
      axios.delete("/api/sites/" + this.site.id).then(response => {
        if (response.data.code == 500) {
          this.logError(response.data.message);
        } else {
          this.logSuccess(response.data.message);
        }

        this.readItems();
      });
    }
  }
};
</script>

<style lang="scss">
.data-table-server-pagination---avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
