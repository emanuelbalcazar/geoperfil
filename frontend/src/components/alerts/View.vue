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
            <br />
            <b>Fecha:</b>
            {{alert.timestamp}}
            <br />
            <br />
            <b>Descripción:</b>
            {{alert.description}}
            <br />
            <br />
            <div class="md6 sm6 xs12">
              <va-input label="Dato" v-model="alert.data" />
            </div>
          </div>

          <div class="row">
            <div class="flex">
              <va-button @click="showAcceptModal" color="success">{{ text.accept }}</va-button>
              <va-button @click="showRejectModal" color="danger">{{ text.reject }}</va-button>
            </div>
          </div>
        </va-card>

        <va-modal
          v-model="modal.accept.show"
          size="large"
          :okText="'Aceptar'"
          :cancelText="'Cancelar'"
          title="¿Desea aceptar la alerta?"
          :message="modal.message"
          :noOutsideDismiss="true"
          @ok="accept"
        />

        <va-modal
          v-model="modal.reject.show"
          size="large"
          :okText="'Aceptar'"
          :cancelText="'Cancelar'"
          title="¿Desea rechazar la alerta?"
          :message="modal.message"
          :noOutsideDismiss="true"
          @ok="reject"
        />
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
      },
      modal: {
        accept: {
          show: false
        },
        reject: {
          show: false
        },
        message: ""
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
    },
    showAcceptModal() {
      this.modal.message = this.getModalMessage(this.alert.type);
      this.modal.accept.show = true;
    },
    accept() {
      alert("aceptada alerta");
    },
    showRejectModal() {
      this.modal.message = "La alerta pasará a estar rechazada.";
      this.modal.reject.show = true;
    },
    reject() {
      alert("alerta rechazada");
    },
    getModalMessage(type) {
      if (type == "newCareer")
        return "Se creara la nueva carrera automaticamente";

      if (type == "newCampus")
        return "Se creara la nueva sede institucional automaticamente";

      if (type == "newInstitution")
        return "Se creara la nueva institución automaticamente";

      return "No hay información sobre el tipo de sugerencia solicitado";
    }
  }
};
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
