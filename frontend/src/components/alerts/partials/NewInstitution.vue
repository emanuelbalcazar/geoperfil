<template>
  <form>
    <div class="row">
      <div class="flex xs6">
        <va-input
          label="Nombre de la institución"
          v-model="institution.name"
          placeholder="Institución sugerida"
        />

        <va-input
          label="Acronimo (Opcional)"
          v-model="institution.acronym"
          placeholder="Acronimo de la institución"
        />

        <va-input
          label="Sitio Web (Opcional)"
          v-model="institution.site"
          placeholder="Sitio web de la institución"
        />
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "newInstitution",
  props: {
    alert: Object
  },
  data() {
    return {
      institution: { name: this.alert.data }
    };
  },
  created() {
    //this.institution = this.alert.data;
  },
  methods: {
    findCampuses() {}
  }
};
</script>
