<template>
  <div class="grid row">
    <div class="flex xs12 md12">
      <va-card title="Alertas y sugerencias" style="overflow-x: auto;">
        <div>
          <div class="row">
            <div class="flex xs12">
              <alert-detail :alert="alert" />
              <br />

              <!-- TABS -->
              <va-tabs grow v-model="tabValue">
                <va-tab v-for="title in tabTitles" :key="title">{{title}}</va-tab>
              </va-tabs>
              <br />

              <!-- ALERT DETAILS -->
              <div v-if="tabValue == 0">
                <new-institution v-if="alert.type == 'newInstitution'" :alert="alert" />
              </div>
            </div>
          </div>
        </div>
      </va-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";

import AlertDetail from "./partials/Details";
import NewInstitution from "./partials/NewInstitution";

export default {
  name: "view-alert",
  components: {
    AlertDetail,
    NewInstitution
  },
  data() {
    return {
      tabTitles: ["Resolver", "Prueba"],
      tabValue: 0,
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
  watch: {},
  computed: {
    computedStyle() {
      return {
        backgroundColor: this.$themes.primary
      };
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
          this.alert.id = Number(this.alert.id);
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
      let response = await axios.post("/api/alerts/accept", this.alert);

      if (response.data.success) {
        this.logSuccess("La alerta se acepto correctamente");
      } else {
        this.logError("La alerta no pudo ser aceptada");
      }

      this.$router.push({ name: "list-alerts" });
    },
    async reject() {
      let id = this.$route.params.id;
      let response = await axios.get("/api/alerts/reject", this.alert);

      if (response.data.success) {
        this.logSuccess("La alerta se rechazo correctamente");
      } else {
        this.logError("La alerta no pudo ser rechazada");
      }

      this.$router.push({ name: "list-alerts" });
    },
    getModalMessage(type) {
      return this.text.modal[String(type)];
    },
    addTab() {
      this.tabTitles.push("Nueva");
      this.tabValue++;
    }
  }
};
</script>

<style lang="scss">
.grid {
  &__container {
    min-height: 3rem;
    color: $white;
    border-radius: 0.5rem;
  }
}
</style>
