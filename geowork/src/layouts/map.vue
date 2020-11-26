<template>
  <div class="q-pa-md row items-start q-gutter-md flex flex-center">
    <q-card class="my-card" flat bordered>
      <div>
        <l-map
          v-if="showMap"
          :zoom="zoom"
          :center="center"
          style="height: 500px; width: 100%"
          :options="options"
        >
          <l-tile-layer :url="url" />

          <l-feature-group>
            <l-marker :lat-lng="jobCoords">
              <l-tooltip :options="{ permanent: true, interactive: true }">
                <div>
                  This job
                </div>
              </l-tooltip>
            </l-marker>

            <l-marker :lat-lng="userCoords">
              <l-tooltip :options="{ permanent: true, interactive: true }">
                <div>
                  You
                </div>
              </l-tooltip>
            </l-marker>
          </l-feature-group>
          <l-polyline :lat-lngs="travel" />
        </l-map>
      </div>
    </q-card>
  </div>
</template>

<script>
import { latLng, Icon } from "leaflet";
import {
  LMap,
  LTileLayer,
  LMarker,
  LTooltip,
  LPolyline,
  LFeatureGroup
} from "vue2-leaflet";

import "leaflet/dist/leaflet.css";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

export default {
  name: "map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LPolyline,
    LFeatureGroup
  },
  data() {
    return {
      zoom: 7,
      center: null,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      jobCoords: null,
      showMap: false,
      userCoords: null,
      expanded: false,
      options: { zoomControl: false },
      travel: null
    };
  },
  methods: {},
  beforeMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.onSucccess, this.onError);
    } else {
    }
  },
  methods: {
    onSucccess(position) {
      const jobsim = this.getRandomLatLng();
      this.showMap = true;
      this.userCoords = latLng(
        position.coords.latitude,
        position.coords.longitude
      );
      this.center = latLng(position.coords.latitude, position.coords.longitude);
      this.travel = [
        [position.coords.latitude, position.coords.longitude],
        jobsim
      ];
      this.jobCoords = latLng(jobsim);
    },
    onError() {
      console.log(
        "an error occurred or there are no permissions to view the location"
      );
    },
    getRandomLatLng() {
      return [4.9 + -2.1 * Math.random(), -75.45 + -1.2 * Math.random()];
    }
  }
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
