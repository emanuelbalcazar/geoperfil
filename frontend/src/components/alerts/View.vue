<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="text.title">
          <div class="mb-3">
            <va-notification color="info">
              <va-badge
                :color="getPriorityColor(alert.priority)"
              >{{ getPriorityText(alert.priority) }}</va-badge>&nbsp;
              <b>{{ alert.name }}</b>
            </va-notification>
            <b>ID:</b>
            {{alert.id}}
            <br />
            <b>Fecha:</b>
            {{alert.timestamp}}
            <br />
            <b>Descripción:</b>
            {{alert.description}}
            <br />
            <b>Dato:</b>
            {{alert.data}}
            <br />
          </div>

          <div class="row">
            <div class="flex">
              <va-button color="success">{{ text.accept }}</va-button>
              <va-button color="danger">{{ text.reject }}</va-button>
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
  name: "view-alert",
  components: {},
  data() {
    return {
      text: {
        title: "Detalle de alerta",
        accept: "Aceptar",
        reject: "Rechazar"
      },
      alert: {
        id: 0,
        name: "",
        type: "",
        priority: "",
        description: "",
        status: "",
        data: "",
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
        .get("/api/alerts/" + id)
        .then(response => {
          if (!response.data) {
            this.logError("No existe una alerta con id: " + id);
            this.$router.push({ name: "list-alerts" });
            return;
          }

          this.alert = response.data;
          this.alert.timestamp = this.formatDate(this.alert.timestamp);
        })
        .catch(err => {
          this.logError(err);
          this.$router.push({ name: "list-alerts" });
        });
    },
    formatDate(value) {
      return moment(value).format("DD-MM-YYYY HH:mm:ss");
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

<style>
.row.row-inside {
  max-width: none;
}
</style>
