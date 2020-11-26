<template>
  <div class=" flex-center">
    <h5 style="text-align:center;" color="red">🔥 Hello {{admin}} 👑</h5>

    <div class="items-start q-gutter-md flex flex-center">
      <q-card class="my-card">
        <q-card-section class="q-pa-xs-md">
     <div style="text-align: center;">
      <h3>Actives jobs: <br> {{jobs}}</h3>
      <h3>Register users: <br>{{users}}</h3>
     </div>
        </q-card-section>
      </q-card>

        <q-card class="my-card" style="min-height: 376px; max-width: 348.81px;">
        <q-card-section class="q-pa-xs-md">
     <div style="text-align: center; ">
     <h4>Create new jobs</h4>
     <p>enter the number of jobs you want to create, these will be created randomly</p>
      <q-input
            v-model.number="createJobs"
            label="New jobs"
            reactive-rules
            type="number"
            stack-label
          />
          <br>
                    <div class="flex flex-center">
            <q-btn
              class="flex flex-center"
              color="primary"
              label="create jobs"
              v-show="createJobs != null && createJobs.length != 0"
              @click="onSubmit"
            />
          </div>
          <div class="flex flex-center">
            <q-btn
              class="flex flex-center"
              color="primary"
              label="create jobs"
              v-show="createJobs == null || createJobs.length == 0"
              disabled
            />
          </div>
     </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
data(){
return{
  admin: null,
  jobs: null,
  users: null,
  createJobs: null,
}
},
  async mounted() {
    try {
      this.$q.loading.show();
      const response = await this.$axios.get("info", {
        headers: {
          token: window.localStorage.getItem("token")
        }
      });
this.admin = response.data.admin;
this.jobs = response.data.jobs;
this.users = response.data.users;
      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
      if (error.response.data.auth == false) {
        this.$router.push("/jobs");
      }
    }
  },
methods: {

  async pushNotification(){
            try {
      const response = await this.$axios.get("send-notifications", {
        headers: {
          token: window.localStorage.getItem("token")
        }
      });
        if(response.data.message == "No users with notifications available"){
   this.$q.notify({
            message: response.data.message,
            color: "yellow-9",
            position: "top"
          });
        }else{
  this.$q.notify({
            message: response.data.message,
            color: "green",
            position: "top"
          });
        }

    } catch (error) {
      if (error.response.data.auth == false) {
        this.$router.push("/jobs");
      }
    }
  },
  async onSubmit(){
        try {
      const response = await this.$axios.post("create-job", {jobs: this.createJobs}, {
        headers: {
          token: window.localStorage.getItem("token")
        }
      });
           this.$q.notify({
            message: `${this.createJobs} jobs have been created successfully`,
            color: "green",
            position: "top"
          });
 await this.pushNotification();
    } catch (error) {
      if (error.response.data.auth == false) {
        this.$router.push("/jobs");
      }
    }
  },
}
}
</script>

<style>

</style>