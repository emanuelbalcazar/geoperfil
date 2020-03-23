<template>
  <va-card :title="title.table">
    <div class="row align--center">
      <!-- <div class="flex xs12 md6">
        <va-input :value="toSearch" :placeholder="title.search" @input="search">
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>-->
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
      <template slot="priority" slot-scope="props">
        <va-badge
          :color="getPriorityColor(props.rowData.priority)"
        >{{ getPriorityText(props.rowData.priority)}}</va-badge>
      </template>

      <template slot="actions" slot-scope="props">
        <va-button
          flat
          small
          color="info"
          @click="view(props.rowData)"
          class="ma-0"
        >{{ title.view }}</va-button>
      </template>
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
        table: "Listado de alertas sin resolver",
        perPage: "Por Páginas",
        search: "Buscar",
        noData: "No se encontraron alertas sin resolver",
        view: "Detalles",
        accept: "Aceptar",
        reject: "Rechazar",
        priority: "Prioridad"
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
          name: "__slot:priority",
          title: "Prioridad"
        },
        {
          name: "name",
          title: "Nombre",
          callback: this.formatMessage
        },
        {
          name: "data",
          title: "Dato",
          callback: this.formatMessage
        },
        {
          name: "timestamp",
          title: "Fecha",
          callback: this.formatDate
        },
        {
          name: "__slot:actions",
          dataClass: "text-center",
          width: "10%"
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
        columnName: "status",
        columnValue: "pending"
      };

      axios.get("/api/alerts", { params }).then(response => {
        this.items = response.data.data;
        this.totalPages = response.data.lastPage;
        this.loading = false;
        this.perPage = response.data.perPage;
      });
    },
    formatDate(value) {
      return moment(value).format("DD-MM-YYYY HH:mm:ss");
    },
    formatMessage(value = "") {
      return value.substring(0, 100);
    },
    getPriorityText(priority) {
      if (priority == 1) return "Alta";
      if (priority == 2) return "Media";

      return "Baja";
    },
    getPriorityColor(priority) {
      if (priority == 1) return "danger";
      if (priority == 2) return "warning";

      return "info";
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
