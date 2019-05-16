<template>
  <div class="menu">
    <v-navigation-drawer dark permanent style="background-color:rgb(86, 125, 121);  width: 100%;">
      <v-list>
        <v-list-group no-action sub-group value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Admin</v-list-tile-title>
            </v-list-tile>
          </template>
          <router-link
            :to="'/admin/' + item.path"
            v-for="item in items"
            :key="item.title"
            style="color:white; "
            class="rtl"
          >
            <v-list-tile>
              <v-list-tile-action>
                <!-- <v-icon>{{ item.icon }}</v-icon> -->
                <v-list-tile-content>
                  <v-list-tile-title style="font-size:1.1rem; font-weight:bold;">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile-action>
            </v-list-tile>
          </router-link>
        </v-list-group>

        <v-list-group no-action sub-group value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Item</v-list-tile-title>
            </v-list-tile>
          </template>
          <router-link
            :to="'/admin/' + item.path"
            v-for="item in items2"
            :key="item.title"
            style="color:white; "
            class="rtl"
          >
            <v-list-tile>
              <v-list-tile-action>
                <!-- <v-icon>{{ item.icon }}</v-icon> -->
                <v-list-tile-content>
                  <v-list-tile-title style="font-size:1.1rem; font-weight:bold;">{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile-action>
            </v-list-tile>
          </router-link>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
export default {
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
      ]
    };
  },
  methods: {
    goto(i) {
      console.log(i);
      this.$router.push({ path: "./admin/" + i });
    }
  }
};
</script>

<style scoped>
.rtl {
  text-decoration: none;
}
.menu {
  width: 17%;
  float: left;
  height: 150vh;
}
</style>

