<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-red-8 text-white">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-space />
        <q-tabs shrink>
          <q-tab name="tab1" icon="logout" @click="logout" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-true
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header class="text-grey-8">
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";

let linksData = [
  {
    title: "Account",
    caption: "View and edit your account",
    icon: "person",
    link: "profile"
  },
  {
    title: "Jobs",
    caption: "View all jobs",
    icon: "work",
    link: "jobs"
  }
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    };
  },
  mounted() {
    const isAdmin = window.localStorage.getItem("role");
    if (isAdmin == "admin" && !this.essentialLinks[2]) {
      this.essentialLinks.push([
        {
          title: "Admin",
          caption: "Create new jobs (admin only)",
          icon: "admin_panel_settings",
          link: "admin"
        }
      ]);
    }
  },
  methods: {
    logout() {
      window.localStorage.clear();
      this.$router.push("/");
    }
  }
};
</script>
