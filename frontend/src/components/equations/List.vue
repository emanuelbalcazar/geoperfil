<template>
  <va-card :title="title.table">
    <div v-for="header in headers">
      <va-accordion>
        <va-collapse>
          <span slot="header">{{header}}</span>
          <div slot="body">
            <va-data-table
              :fields="fields"
              :data="dataWithHeaders(header)"
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
    </div>
  </va-card>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      title: {
        table: "Listado de Ecuaciones (Agrupadas por consulta)",
        perPage: "Por Páginas",
        search: "Buscar por sitio",
        noData: "No se encontraron ecuaciones."
      },
      perPage: 10,
      totalPages: 0,
      items: [],
      loading: false,
      toSearch: null,
      headers: []
    };
  },
  computed: {
    fields() {
      return [
        {
          name: "id",
          title: "ID"
        },
        /* {
          name: "equation.q",
          title: "Terminos"
        }, */
        {
          name: "site.site",
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
    dataWithHeaders(header) {
        return this.items.filter(eq => {
            return (eq.equation.q === header);
        });
    },
    readItems(page = 1) {
      this.loading = true;

      const params = {
        perPage: this.perPage,
        page: page
      };

      axios.get("/api/equations", { params }).then(response => {
        this.items = response.data.data;
        this.totalPages = response.data.lastPage;
        this.loading = false;
        this.perPage = response.data.perPage;

        let queries = this.items.map(eq => {
          return eq.equation.q;
        });

        this.headers = [...new Set(queries)]; // obtengo las cabeceras de los desplegables
      });
    },
    edit(equation) {
      this.$router.push({ name: "edit-equation", params: { id: equation.id } });
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
