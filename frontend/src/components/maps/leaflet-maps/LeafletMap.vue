<template>
  <div class="leaflet-map fill-height"></div>
</template>

<script>
import "leaflet-map";
import * as Leaflet from "leaflet";

const initialPosition = [-43.54854811091286, -1148.818359375];

export default {
  name: "leaflet-map",

  mounted() {
    //    L.Icon.Default.imagePath = 'assets/vendor/leaflet' TODO: make it work with webpack
    Leaflet.Icon.Default.imagePath =
      "https://unpkg.com/leaflet@1.0.3/dist/images";

    let map = Leaflet.map(this.$el).setView(initialPosition, 6);

    map.on("click", function(e) {
      console.log(e.latlng.lat, e.latlng.lng);
    });

    Leaflet.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    Leaflet.marker(initialPosition)
      .addTo(map)
      .bindPopup("<b>Marcador personalizado lince</b><hr>")
      .openPopup();
  }
};
</script>

<style lang="scss">
@import "~leaflet/dist/leaflet.css";
</style>
