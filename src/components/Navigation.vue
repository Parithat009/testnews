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
          <v-list-tile v-for="item in items" :key="item.title" v-on:click="goto(item.path)">
            <v-list-tile-action>
              <!-- <v-icon>{{ item.icon }}</v-icon> -->
              <v-list-tile-content>
                <v-list-tile-title style="font-size:1.1rem; font-weight:bold;">{{ item.title }}</v-list-tile-title>
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
          <v-list-tile v-for="(item2,index) in items2" :key="index" v-on:click="goto(item2.path)">
            <v-list-tile-action>
              <!-- <v-icon>{{ item.icon }}</v-icon> -->
              <v-list-tile-content>
                <v-list-tile-title style="font-size:1.1rem; font-weight:bold;">{{ item2.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile-action>
          </v-list-tile>
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
      this.$router.push({ path: "./" + i });
    }
  }
};
</script>

<style scoped>
.menu {
  width: 17%;
  float: left;
  height: 120vh;
}
</style>

