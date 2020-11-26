<template>
  <div>
    <div
      class="q-pa-md row items-start q-gutter-md flex flex-center"
      v-show="jobs"
    >
      <q-card
        class="my-card"
        flat
        bordered
        v-for="(value, index) in jobs"
        :key="index"
      >
        <div>
          <l-map
            v-if="showMap"
            :zoom="zoom"
            :center="center"
            style="height: 200px; width: 100%"
            :options="options"
          >
            <l-tile-layer :url="url" />

            <l-feature-group>
              <l-marker :lat-lng="jobCoords[index]">
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
            <l-polyline :lat-lngs="travel[index]" />
          </l-map>
        </div>
        <q-card-section>
          <div class="text-overline text-orange-9">{{ value.pay }}</div>
          <div class="text-h5 q-mt-sm q-mb-xs">{{ value.title }}</div>
          <div class="text-caption text-grey">
            {{ value.description }}
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div class="absolute-center" style="text-align: center" v-show="errorJobs">
      <img
        class=""
        src="https://www.iconpacks.net/icons/2/free-sad-face-icon-2691-thumb.png"
        style="width: 200px"
      />
      <h3 style="margin: 10px">Sorry, no jobs found</h3>
    </div>
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

  created() {
    if (this.$q.platform.is.cordova) {
      var onSuccess = function(position) {};

      function onError(error) {
        navigator.geolocation.getCurrentPosition(this.onSucccess, this.onError);
      }

      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.onSucccess, this.onError);
    } else {
      this.$q.notify({
        message: "Geolocation not available",
        color: "red",
        position: "top"
      });
    }
  },
  data() {
    return {
      zoom: 6,
      center: null,
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      jobs: null,
      errorJobs: false,
      jobCoords: [],
      showMap: false,
      userCoords: null,
      options: { zoomControl: false },
      travel: []
    };
  },

  methods: {
    async onSucccess(position) {
      this.$q.loading.show();
      try {
        const response = await this.$axios.get("/jobs", {
          headers: {
            token: window.localStorage.getItem("token")
          }
        });
        if (!response.data.jobs) {
          this.errorJobs = true;
          this.$q.loading.hide();
        } else {
          this.jobs = response.data.jobs;
        }
        this.$q.loading.hide();
      } catch (error) {
        this.$q.loading.hide();
        this.errorJobs = true;
        if (error.response.data.auth == false) {
          window.localStorage.clear();
          this.$router.push("/");
        }
      }

      if (this.jobs != null) {
        for (var i = 0; i < this.jobs.length; i++) {
          this.travel.push([
            [position.coords.latitude, position.coords.longitude],
            [this.jobs[i].coords.lat, this.jobs[i].coords.lng]
          ]);
          this.jobCoords.push(
            latLng([this.jobs[i].coords.lat, this.jobs[i].coords.lng])
          );
        }
        this.showMap = true;
        this.userCoords = latLng(
          position.coords.latitude,
          position.coords.longitude
        );
        this.center = latLng(
          position.coords.latitude,
          position.coords.longitude
        );
      }
    },
    onError() {
      this.errorJobs = true;
      this.$q.notify({
        message: "We need permissions to see your location",
        color: "red",
        position: "top"
      });
    }
  }
};
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
