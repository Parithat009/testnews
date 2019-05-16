<template>
  <div>
    <div class="header">
      <v-toolbar style="background-color: #27a292;">
        <v-btn icon @click.stop="drawer=!drawer">
          <v-icon style="color:white;">menu</v-icon>
        </v-btn>
        <img src="../image/icon.png" style="height:2.5rem;width:2.5rem;">

        <v-toolbar-title class="toolbar">chaofa vet clinic : Setting App</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-title class="toolbar2">{{username}}</v-toolbar-title>
        <v-btn icon @click.stop="dialog = true">
          <label style="font-size: 0.7em; color:white;">
            <v-icon style="color:white;">exit_to_app</v-icon>
            <br>log out
          </label>
        </v-btn>
      </v-toolbar>

      <!-- ส่วนตัวเลือกด้านข้าง -->
      <v-navigation-drawer
        v-model="drawer"
        :mini-variant="mini"
        absolute
        dark
        temporary
        style="background-color:rgb(86, 125, 121);"
      >
        <v-list class="pa-1">
          <v-list-tile v-if="mini" @click.stop="mini = !mini">
            <v-list-tile-action>
              <v-icon>chevron_right</v-icon>
            </v-list-tile-action>
          </v-list-tile>

          <v-list-tile avatar tag="div">
            <v-list-tile-avatar>
              <img src="../image/icon.png">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title>CHAOFA VET CLINIC</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-btn icon @click.stop="mini = !mini">
                <v-icon>chevron_left</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-list class="pt-0" dense>
          <v-divider light></v-divider>

          <v-list-group no-action sub-group value="true">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Admin</v-list-tile-title>
              </v-list-tile>
            </template>

            <v-list-tile v-for="item in items" :key="item.title" v-on:click="goto(item.path)">
              <v-list-tile-action>
                <!-- <v-icon>{{ item.icon }}</v-icon> -->
                <v-list-tile-content>
                  <v-list-tile-title style="font-size:1.1rem;">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>

          <v-list-group no-action sub-group value="true">
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-title>Item</v-list-tile-title>
              </v-list-tile>
            </template>
            <v-list-tile v-for="item in items2" :key="item.title" v-on:click="goto(item.path)">
              <v-list-tile-action>
                <!-- <v-icon>{{ item.icon }}</v-icon> -->
                <v-list-tile-content>
                  <v-list-tile-title style="font-size:1.1rem;">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile-action>
            </v-list-tile>
          </v-list-group>
        </v-list>
      </v-navigation-drawer>
    </div>

    <div class="header2">
      <v-toolbar style="background-color: #27a292;">
        <img src="../image/icon.png" style="height:2.5rem;width:2.5rem;">

        <v-toolbar-title class="toolbar">chaofa vet clinic : Setting App</v-toolbar-title>

        <v-spacer></v-spacer>
        <v-toolbar-title class="toolbar2">{{username}}</v-toolbar-title>
        <v-btn icon @click.stop="dialog = true">
          <label style="font-size: 0.7em; color:white;">
            <v-icon style="color:white;">exit_to_app</v-icon>
            <br>log out
          </label>
        </v-btn>
      </v-toolbar>
      <Navigation class="n"></Navigation>
    </div>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>
        <v-card-text>Are you want to logout ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="dialog = false" v-on:click="logout()">Yes</v-btn>
          <v-btn color="red darken-1" flat @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import Navigation from "./Navigation.vue";
import axios from "axios";
import { mapState } from "vuex";
export default {
  components: {
    Navigation
  },
  computed: {
    ...mapState(["username"])
  },
  data() {
    return {
      items: [
        { title: "Users", path: "users" },
        { title: "Chief Complaints", path: "chiefComplaints" },
        { title: "Differential Diagnosiss", path: "differential" },
        { title: "History Rankings", path: "history" },
        { title: "Physical Examinations", path: "physical" }
      ],
      items2: [
        { title: "Item", path: "item" },
        { title: "Caution", path: "caution" },
        { title: "Frequency", path: "frequency" },
        { title: "Instruction", path: "instruction" },
        { title: "Unit", path: "unit" }
      ],
      drawer: null,
      mini: false,
      right: null,
      dialog: false
    };
  },
  methods: {
    logout() {
      console.log("log out.");
      sessionStorage.removeItem("admin");
      
      delete axios.defaults.headers.common["Authorization"];

      this.$router.push({ path: "./login" });
    },
    goto(i) {
      console.log(i);
      this.$router.push({ path: "./" + i });
    }
  }
};
</script>

<style scoped>
@media (min-width: 992px) {
  .header2 {
    visibility: visible !important;
  }
  .header {
    visibility: hidden !important;
    display: none;
  }
  .n {
    width: 17%;
  }
  /* desktop */
}
@media (max-width: 991px) {
  .header {
    visibility: visible !important;
  }

  .header2 {
    visibility: hidden !important;
    display: none;
  }

  /* mobile  */
}

.toolbar {
  text-transform: uppercase;
  color: white;
  font-weight: bold;
  font-size: 1.3em;
  text-shadow: 0.1em 0.1em 0.2em black;
}
.toolbar2 {
  color: white;
  font-weight: bold;
  font-size: 1em;
  text-shadow: 0.1em 0.1em 0.2em black;
  margin-right: 1.5%;
}
</style>
