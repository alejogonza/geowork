<template>
  <div class=" flex-center">
    <h3 style="text-align:center;">Your account</h3>

    <div class="items-start q-gutter-md flex flex-center">
      <q-card class="my-card">
        <q-card-section class="q-pa-xs-md  ">
          <q-input
            v-model="username"
            label="Username"
            @focus="usernameClear"
            reactive-rules
            @blur="
              validateUser();
              editEnabled();
            "
            stack-label
            :rules="[
              val => (val && val.length > 7) || 'Please type min 8 characters'
            ]"
          />
          <br />
          <q-input
            v-model="email"
            label="Email"
            stack-label
            lazy-rules
            @blur="
              validateEmail();
              editEnabled();
            "
            @focus="emailClear"
            :rules="[
              val =>
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(val) ||
                'Please type a valid email address'
            ]"
          />
          <br />
          <q-input
            v-model="password"
            label="Password"
            stack-label
            label-slot
            :type="isPwd ? 'password' : 'text'"
            lazy-rules
            @focus="passClear"
            @blur="editEnabled"
            :rules="[
              val => (val && val.length > 7) || 'Please type min 8 characters'
            ]"
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <br />
          <div class="flex flex-center">
            <q-btn
              class="flex flex-center"
              color="primary"
              label="Edit profile"
              v-show="!editDisable"
              @click="onSubmit"
            />
          </div>
          <div class="flex flex-center">
            <q-btn
              class="flex flex-center"
              color="primary"
              label="Edit profile"
              v-show="editDisable"
              disabled
            />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isPwd: true,
      username: "",
      email: "",
      password: "",
      UserUsername: "",
      UserEmail: "",
      UserPassword: "",
      editDisable: true
    };
  },
  async beforeCreate() {
    try {
      this.$q.loading.show();
      const response = await this.$axios.get("auth/me", {
        headers: {
          token: window.localStorage.getItem("token")
        }
      });

      this.username = this.UserUsername = response.data.user.username;
      this.email = this.UserEmail = response.data.user.email;
      this.password = this.UserPassword = "yoursecretpassword";
      this.$q.loading.hide();
    } catch (error) {
      this.$q.loading.hide();
      if (error.response.data.auth == false) {
        window.localStorage.clear();
        this.$router.push("/");
      }
    }
  },
  methods: {
    editEnabled() {
      if (
        (this.username != this.UserUsername &&
          this.username != "" &&
          this.username.length > 7 &&
          this.validateUser()) ||
        (this.email != this.UserEmail &&
          this.email != "" &&
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(this.email) &&
          this.validateEmail()) ||
        (this.password != this.UserPassword &&
          this.password != "" &&
          this.password.length > 7)
      ) {
        this.editDisable = false;
      }
    },
    passClear() {
      this.password = "";
    },
    emailClear() {
      this.email = "";
    },
    usernameClear() {
      this.username = "";
    },
    async onSubmit() {
      try {
        let response = {};
        if (this.username != this.UserUsername) {
          response.username = this.username;
        }
        if (this.email != this.UserEmail) {
          response.email = this.email;
        }

        if (this.password != this.UserPassword) {
          response.password = this.password;
        }

        if (
          this.username != this.UserUsername ||
          this.email != this.UserEmail ||
          this.password != this.UserPassword
        ) {
          const edit = await this.$axios.patch("/me", response, {
            headers: {
              token: window.localStorage.getItem("token")
            }
          });

          this.$q.notify({
            message: "Profile updated successfully",
            color: "green",
            position: "top"
          });

          this.username = this.UserUsername = edit.data.user.username;
          this.email = this.UserEmail = edit.data.user.email;
          this.password = this.UserPassword = "yoursecretpassword";
        }
      } catch (error) {
        if (error.response.data.auth == false) {
          window.localStorage.clear();
          this.$router.push("/");
        }
      }
    },
    async validateUser() {
      if (this.username != null && this.username.length > 7) {
        try {
          const response = await this.$axios.post("username-validate", {
            username: this.username
          });
          this.userValid = true;
          return true;
        } catch (error) {
          this.username = "";
          console.error(error.response.data);
          this.$q.notify({
            group: false,
            message: error.response.data.message,
            color: "red",
            position: "top"
          });
          this.editDisable = true;
          return false;
        }
      }
    },
    async validateEmail() {
      if (this.email != null && this.email.length > 7) {
        try {
          const response = await this.$axios.post("email-validate", {
            email: this.email
          });
          this.userValid = true;
          return true;
        } catch (error) {
          this.email = "";
          console.error(error.response.data);
          this.$q.notify({
            group: false,
            message: error.response.data.message,
            color: "red",
            position: "top"
          });
          this.editDisable = true;
          return false;
        }
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.my-card
  width: 60%
  max-width: 350px
</style>
