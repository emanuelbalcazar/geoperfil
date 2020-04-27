<template>
  <div class="flex md10 xs12">
    <va-select
      label="Seleccione las sedes donde se dicta la carrera"
      v-model="selectedCampuses"
      multiple
      searchable
      textBy="name"
      :options="campuseNames"
    />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "newAlert",
  props: {
    alert: Object
  },
  data() {
    return {
      campuses: [],
      selectedCampuses: [],
      campuseNames: []
    };
  },
  created() {
    this.findCampuses();
  },
  watch: {
    selectedCampuses: function(newe, old) {
      console.log(newe);
    }
  },
  methods: {
    findCampuses() {
      const params = {
        page: "all"
      };

      axios.get("/api/campuses", { params }).then(response => {
        this.campuses = response.data;
        this.campuseNames = this.campuses.map(campus => {
          return campus.name;
        });
      });
    }
  }
};
</script>
