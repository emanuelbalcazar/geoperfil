<template>
  <div>
    <b>Tipo de alerta:&nbsp;</b>
    {{ alert.name }}
    <br />
    <b>ID:&nbsp;</b>
    {{alert.id}}
    <br />
    <b>Prioridad:&nbsp;</b>
    {{alert.priority}}
    <br />
    <b>Fecha:&nbsp;</b>
    {{alert.timestamp}}
    <br />
    <b>Descripción:&nbsp;</b>
    {{alert.description}}
    <br />
    <b>Dato sugerido:&nbsp;</b>
    {{alert.data}}
  </div>
</template>

<script>
export default {
  name: "view-alert",
  props: {
    alert: Object
  },
  data() {
    return {
      priority: {
        "1": "Alta",
        "2": "Media",
        "3": "Baja"
      }
    };
  },
  methods: {
    getPriorityText(priority) {
      return this.text.priority[String(priority)];
    }
  }
};
</script>
