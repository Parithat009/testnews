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
        >Add History</b-navbar-brand>
      </b-navbar>

      <div style="margin-top:25px;">
        <div>
          <!-- <label>Code :&nbsp;</label> -->
          <v-flex xs5 offset-xs4>
            <v-text-field label="Code" v-model="code" style="font-size:1.3em;"></v-text-field>
          </v-flex>

          <v-flex xs5 offset-xs4>
            <v-text-field label="Label" v-model="blood" style="font-size:1.3em;"></v-text-field>
          </v-flex>
          <v-flex xs5 offset-xs4>
            <!-- <p v-for="item in selected" :key="item">{{ item }}</p> -->
            <v-checkbox
              class="chBox"
              color="blue"
              v-model="active"
              label="Active"
              style="margin-boot"
            ></v-checkbox>
          </v-flex>

          <router-link to="/admin/history" class="rtl">
            <v-btn small color="green" style="color:white;" v-on:click="addHT()">SAVE</v-btn>
          </router-link>

          <router-link to="/admin/history" class="rtl">
            <v-btn small color="red" style="color:white;">cancel</v-btn>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToolbarAddEdit from "../ToolbarAddEdit.vue";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  components: {
    ToolbarAddEdit
  },
  data() {
    return {
      code: "",
      blood: "",
      selected: [],
      active: true
    };
  },
  methods: {
    addHT() {
      var self = this;
     
      axios
        .post("/api/base/base-hts", {
          code: this.code,
          label: this.blood,
          active: this.active
        })
        .then(function(response) {
          console.log(response);
          self.snAdd();
        })
        .catch(function(error) {
          console.log(error);
          self.snAddErr();
        });
      console.log("add");
    },
    ...mapActions(["snAdd", "snAddErr"])
  }
};
</script>

<style scoped>
.rtl {
  text-decoration: none;
}
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
</style>
