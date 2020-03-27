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
            <br />
            <b>ID:</b>
            {{alert.id}}
            <br />
            <b>Fecha:</b>
            {{alert.timestamp}}
            <br />
            <b>Descripción:</b>
            {{alert.description}}
            <br />
            <br />
            <b>Aviso: asegúrese de que el dato sea correcto</b>
            <br />
            <br />
            <div class="md6 sm6 xs12">
              <va-input label="Dato ingresado" v-model="alert.data" />
            </div>
          </div>

          <div class="row">
            <div class="flex">
              <va-button @click="showRejectModal" color="danger">{{ text.reject }}</va-button>
              <va-button @click="showAcceptModal" color="success">{{ text.accept }}</va-button>
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
        reject: "Rechazar",
        priority: {
          "1": "Alta",
          "2": "Media",
          "3": "Baja"
        },
        color: {
          "1": "danger",
          "2": "warning",
          "3": "info"
        },
        modal: {
          reject:
            "La alerta pasará a estar rechazada y el dato no se guardará.",
          newCareer: "Se creará la nueva carrera automaticamente.",
          newCampus: "Se creará la nueva sede institucional automaticamente.",
          newInstitution: "Se creará la nueva institución automaticamente."
        }
      },
      institutions: [],
      selectedInstitution: "",
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
    this.findInstitutions();
  },
  watch: {
    selectedInstitution: function(institution) {
      this.alert.data.institution_id = institution.id;
    }
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
    async findInstitutions() {
      const params = { page: "all" };
      let response = await axios.get("/api/institutions", { params });
      this.institutions = response.data;
    },
    formatDate(value) {
      return moment(value).format("DD-MM-YYYY HH:mm:ss");
    },
    getPriorityText(priority) {
      return this.text.priority[String(priority)];
    },
    getPriorityColor(priority) {
      return this.text.color[String(priority)];
    },
    showAcceptModal() {
      this.modal.message = this.getModalMessage(this.alert.type);
      this.modal.accept.show = true;
    },
    showRejectModal() {
      this.modal.message = this.text.modal.reject;
      this.modal.reject.show = true;
    },
    async accept() {
      let id = this.$route.params.id;
      let response = await axios.get(`/api/alerts/${id}/accept`);

      if (response.data.success) {
        this.logSuccess("La alerta se acepto correctamente");
      } else {
        this.logError("La alerta no pudo ser aceptada");
      }

      this.$router.push({ name: "list-alerts" });
    },
    async reject() {
      let id = this.$route.params.id;
      let response = await axios.get(`/api/alerts/${id}/reject`);

      if (response.data.success) {
        this.logSuccess("La alerta se rechazo correctamente");
      } else {
        this.logError("La alerta no pudo ser rechazada");
      }

      this.$router.push({ name: "list-alerts" });
    },
    getModalMessage(type) {
      return this.text.modal[String(type)];
    }
  }
};
</script>

<style>
.row.row-inside {
  max-width: none;
}
</style>
