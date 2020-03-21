<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="text.title">
          <div class>
            <div class="flex md6 sm6 xs12">
              <va-input label="ID" v-model="log.id" :disabled="true" />
            </div>

            <div class="flex md6 sm6 xs12">
              <va-input label="Nivel" v-model="log.level" :disabled="true" />
            </div>

            <div class="flex md6 sm6 xs12">
              <va-input label="Modulo" v-model="log.module" :disabled="true" />
            </div>

            <div class="flex md6 sm6 xs12">
              <label>Mensaje</label>
              <textarea label="Mensaje" v-model="log.message" :disabled="true" rows="15" cols="55" />
            </div>

            <div class="flex md6 sm6 xs12">
              <va-input label="Fecha" v-model="log.timestamp" :disabled="true" />
            </div>
          </div>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

export default {
  name: "view-log",
  components: {},
  data() {
    return {
      text: {
        title: "Registro de log"
      },
      log: {
        id: 0,
        level: "",
        module: "",
        message: "",
        timestamp: ""
      }
    };
  },
  created() {
    this.findById(this.$route.params.id);
  },
  methods: {
    findById(id) {
      axios
        .get("/api/logs/" + id)
        .then(response => {
          if (!response.data) {
            this.logError("No existe el registro de log con id: " + id);
            this.$router.push({ name: "list-logs" });
            return;
          }

          this.log = response.data;
          this.log.timestamp = this.formatDate(this.log.timestamp);
        })
        .catch(err => {
          this.logError(err);
          this.$router.push({ name: "list-logs" });
        });
    },
    formatDate(value) {
      return moment(value).format("DD-MM-YYYY HH:mm:ss");
    }
  }
};
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
