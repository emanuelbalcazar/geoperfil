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
        search: "Buscar por sitio",
        noData: "No se encontraron ecuaciones."
      },
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
        columnValue: this.toSearch,
        columnName: "siteSearch"
      };

      axios.get("/api/equations", { params }).then(response => {
        this.items = response.data.data;
        this.totalPages = response.data.lastPage;
        this.loading = false;
        this.perPage = response.data.perPage;
      });
    },
    edit(equation) {
      this.$router.push({ name: "edit-equation", params: {id: equation.id} });
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
