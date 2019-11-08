<template>
  <div class="leaflet-map fill-height"></div>
</template>

<script>
import "leaflet-map";
import * as Leaflet from "leaflet";

export default {
  name: "leaflet-map",

  mounted() {
    //    L.Icon.Default.imagePath = 'assets/vendor/leaflet' TODO: make it work with webpack
    Leaflet.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.0.3/dist/images";

    let map = Leaflet.map(this.$el).setView([-43.54854811091286, -1148.818359375], 6);

    map.on("click", function(e) {
        console.log(e.latlng.lat, e.latlng.lng);
    });

    Leaflet.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    Leaflet.marker([-43.54854811091286, -1148.818359375])
      .addTo(map)
      .bindPopup("Marcador personalizado lince")
      .openPopup();
  }
};
</script>

<style lang="scss">
@import "~leaflet/dist/leaflet.css";
</style>
