<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="text.title">
          <div class="mb-3">
            <va-notification color="info">
              <va-badge :color="getLevelColor(log.level)">{{ log.level }}</va-badge><b>En el modulo:</b>&nbsp;
              {{ log.module }}
            </va-notification><b>ID:</b>
            {{log.id}}
            <br /><b>Fecha:</b>
            {{log.timestamp}}
            <br />
            <br />
            {{log.message}}
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
    },
    getLevelColor(level) {
      let colors = {
        error: "danger",
        info: "info",
        warn: "warning",
        debug: "gray"
      };

      return colors[level] || "primary";
    }
  }
};
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
