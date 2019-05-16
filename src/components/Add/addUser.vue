<template>
  <div id="app">
    <ToolbarAddEdit></ToolbarAddEdit>

    <div class="main">
      <b-navbar
        toggleable="lg"
        type="dark"
        style="background-color:rgb(39, 162, 146); box-shadow: 5px 5px 5px #ccc;"
      >
        <b-navbar-brand
          style="font-size: 1.2em; font-weight:bold; text-shadow: 1.7px 2px 1.7px rgb(86, 125, 121);"
        >Add User</b-navbar-brand>
      </b-navbar>

      <div style="margin-top:25px;">
        <div>
          <!-- <label>Code :&nbsp;</label> -->
          <v-flex xs5 offset-xs4>
            <v-text-field label="Username" v-model="username" style="font-size:1.2em;"></v-text-field>
          </v-flex>

          <v-flex xs5 offset-xs4>
            <v-text-field label="Name" v-model="name" style="font-size:1.2em;"></v-text-field>
          </v-flex>

          <v-flex xs5 offset-xs4>
            <v-text-field label="Email" v-model="email" style="font-size:1.2em;"></v-text-field>
          </v-flex>

          <v-flex xs5 offset-xs4>
            <v-text-field
              label="Password"
              type="password"
              v-model="password"
              style="font-size:1.2em;"
            ></v-text-field>
          </v-flex>

          <!-- <v-flex xs5 offset-xs4>
            <v-text-field
              label="Confirm Password"
              type="password"
              v-model="confirm_password"
              style="font-size:1.2em;"
            ></v-text-field>
            <span style="color:red;">*sdsd</span>
          </v-flex>-->

          <v-flex xs5 offset-xs4>
            <!-- <p v-for="item in selected" :key="item">{{ item }}</p> -->
            <v-checkbox
              class="chBox"
              color="blue"
              v-model="active"
              label="Active"
              style="margin-boot"
            ></v-checkbox>
            <v-checkbox class="chBox" color="blue" v-model="isAdmin" label="Staff status"></v-checkbox>
          </v-flex>

          <!-- <v-flex xs10 offset-xs1>
            <v-text-field label="Username" v-model="username" style="font-size:1.7em;"></v-text-field>
          </v-flex>-->
          <router-link to="/admin/users" class="rtl">
            <v-btn small color="green" style="color:white;" v-on:click="addUser()">SAVE</v-btn>
          </router-link>

          <router-link to="/admin/users" class="rtl">
            <v-btn small color="red" style="color:white;">cancel</v-btn>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToolbarAddEdit from "../ToolbarAddEdit.vue";
import { mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    ToolbarAddEdit
  },
  data() {
    return {
      username: "",
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      active: true,
      isAdmin: false
    };
  },
  methods: {
    addUser() {
      var self = this;
      // axios.defaults.baseURL = "http://chaofavc.somprasongd.work:81";
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ3JvdXBzIjpbeyJpZCI6MSwibmFtZSI6InJlZ2lzdGVyIn0seyJpZCI6MiwibmFtZSI6ImRvY3RvciJ9LHsiaWQiOjMsIm5hbWUiOiJsYWIifSx7ImlkIjo0LCJuYW1lIjoicGhhcm1hY3kifSx7ImlkIjo1LCJuYW1lIjoiY2FzaGllciJ9XSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTU0MTkyNDA5fQ.O923cGJ8aiEji_E1SzPz5PjD1PsGNhhDB3JTD2M6TP8`;

      axios
        .post("/api/users/admin", {
          username: this.username,
          name: this.name,
          email: this.email,
          password: this.password,
          active: this.active,
          isAdmin: this.isAdmin,
          groups: [1, 2]
        })
        .then(function(response) {
          console.log(response);
          self.snAdd();
        })
        .catch(function(error) {
          console.log(error);
          self.snAddErr();
        });
      console.log("add user ..");
    },
    ...mapActions(["snAdd", "snAddErr"])
  }
};
</script>

<style scoped>
@media (min-width: 992px) {
  .main {
    width: 83%;
    float: left;
    padding: 1.5rem;
  }
  /* desktop */
}
@media (max-width: 991px) {
  .main {
    width: 100%;
    float: left;
    padding: 1.5rem;
  }
  /* mobile โทสัพ */
}

* {
  box-sizing: border-box;
}
.menu {
  width: 17%;
  float: left;
  height: 100vh;
}
.chBox {
  margin-top: 0px;
  padding-top: 0px;
}
.rtl {
  text-decoration: none;
}
</style>
