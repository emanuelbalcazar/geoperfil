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
      <template slot="actions" slot-scope="props"></template>
    </va-data-table>
  </va-card>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  data() {
    return {
      title: {
        table: "Listado de Logs",
        perPage: "Por Páginas",
        search: "Buscar por nivel de logs",
        noData: "No se encontraron logs"
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
          name: "level",
          title: "Nivel"
        },
        {
          name: "message",
          title: "Mensaje"
        },
        {
          name: "timestamp",
          title: "Fecha",
          callback: this.formatDate
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

      axios.get("/api/logs", { params }).then(response => {
        this.items = response.data.data;
        this.totalPages = response.data.lastPage;
        this.loading = false;
        this.perPage = response.data.perPage;
      });
    },
    formatDate(value) {
      return moment(value).format("DD-MM-YYYY HH:mm:ss");
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
