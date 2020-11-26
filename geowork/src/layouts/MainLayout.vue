<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",

  created() {
    if (this.$q.platform.is.cordova) {
      window.localStorage.setItem("GPSpermission", false);
      document.addEventListener("deviceready", onDeviceReady, false);

      function onDeviceReady() {
        var onSuccess = function(position) {
          window.localStorage.setItem("GPSpermission", true);
        };

        function onError(error) {}

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
      }

      this.$getNotifications()
        .then(response => {
          console.log("getnotifications", response);
        })
        .catch(e => {
          console.log("getnotifications error", e);
        });

      this.$getTokenNotifications().then(token => {
        window.localStorage.setItem("FCMtoken", token);
      });
    }
  },
  beforeMount() {
    if (this.$q.platform.is.desktop) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(this.onSucccess, this.onError);
      } else {

      }
    }
  },
  methods: {
    onSucccess(position) {
      window.localStorage.setItem("GPSpermission", true);
    },
    onError() {
      console.log(
        "an error occurred or there are no permissions to view the location"
      );
    }
  }
};
</script>
