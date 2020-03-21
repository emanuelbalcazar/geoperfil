<template>
  <va-card :title="title.table">
    <va-data-table
      :fields="fields"
      :data="items"
      :no-data-label="title.noData"
      :loading="loading"
      :per-page="parseInt(perPage)"
      :totalPages="totalPages"
      @page-selected="readItems"
      api-mode
    >
      <template slot="actions" slot-scope="props">
        <va-button flat small color @click="toEdit(props.rowData)" class="ma-0">Ver editor</va-button>
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
        table: "Listado de Articulos",
        perPage: "Por Páginas",
        search: "Buscar por sitio",
        noData: "No se encontraron articulos."
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
          title: "ID"
        },
        {
          name: "title",
          title: "Titulo"
        },
        {
          name: "snippet",
          title: "Resumen"
        },
        {
          name: "link",
          title: "URL"
        },
        {
          name: "__slot:actions",
          dataClass: "text-center"
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
        page: page
      };

      axios.get("/api/articles", { params }).then(response => {
        this.items = response.data.data;
        this.totalPages = response.data.lastPage;
        this.loading = false;
        this.perPage = response.data.perPage;
      });
    },
    toEdit(article) {
      this.$router.push({ name: "medium-editor", params: { id: article.id } });
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
