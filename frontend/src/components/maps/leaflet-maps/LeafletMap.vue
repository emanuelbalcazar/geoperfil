<template>
  <div class="leaflet-map fill-height"></div>
</template>

<script>
import "leaflet-map";
import * as Leaflet from "leaflet";
import axios from "axios";

const initialPosition = [-43.54854811091286, -1148.818359375];

export default {
  name: "leaflet-map",
  data() {
    return {
      campuses: []
    };
  },
  async mounted() {
    let data = await this.getCampuses();

    Leaflet.Icon.Default.imagePath =
      "https://unpkg.com/leaflet@1.0.3/dist/images";

    let map = Leaflet.map(this.$el).setView(initialPosition, 6);

    Leaflet.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    data.forEach(campus => {
      Leaflet.marker([campus.latitude, campus.longitude], {
        title: campus.name
      })
        .addTo(map)
        .bindPopup(campus.name)
        .openPopup();
    });
  },
  methods: {
    async getCampuses() {
      return await axios.get("/api/campuses").then(response => {
        return response.data.data;
      });
    }
  }
};
</script>

<style lang="scss">
@import "~leaflet/dist/leaflet.css";
</style>
