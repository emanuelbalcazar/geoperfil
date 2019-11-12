<template>
  <va-card :title="title.table">
    <div class="row align--center">
      <div class="flex xs12 md6">
        <va-input :value="toSearch" :placeholder="title.search" @input="search">
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>

      <div class="flex xs12 md3 offset--md3">
        <va-select
          v-model="perPage"
          :label="title.perPage"
          :options="perPageOptions"
          @select="onPerPageChange"
        />
      </div>
    </div>

    <va-data-table
      :fields="fields"
      :data="items"
      :loading="loading"
      :per-page="parseInt(perPage)"
      :totalPages="totalPages"
      @page-selected="readItems"
      api-mode
    ></va-data-table>
  </va-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: {
        table: "Listado de Ecuaciones",
        perPage: "Por Páginas",
        search: "Buscar"
      },
      perPageOptions: ["5", "10", "15", "20"],
      perPage: 10,
      totalPages: 0,
      items: [],
      loading: false,
      toSearch: null
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "id",
          title: "ID",
          width: "20%"
        },
        {
          name: "q",
          title: "Terminos"
        },
        {
          name: "siteSearch",
          title: "Sitio"
        },
        {
          name: "start",
          title: "Indice"
        },
        {
          name: "lastExecution",
          title: "Ultima Ejecución"
        },
        {
          name: "active",
          title: "Activo"
        }
      ];
    }
  },
  created() {
    this.readItems();
  },
  methods: {
    onPerPageChange(event) {
      console.log("onPerPageChange", event);
    },
    search(toSearch) {
      console.log(toSearch);
    },
    readItems(page = 1) {
      this.loading = true;

      const params = {
        perPage: this.perPage,
        page: page,
        columnValue: this.toSearch
      };

      axios.get("/api/equations", { params }).then(response => {
        this.items = response.data.data;
        this.totalPages = response.data.lastPage;
        this.loading = false;
        this.perPage = response.data.perPage;
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
