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
        >Edit Frequency</b-navbar-brand>
      </b-navbar>

      <div v-for="(item , index) in frequency.results" :key="index" style="margin-top:25px;">
        <div v-if="item.id == $route.params.id">
          <!-- <label>Code :&nbsp;</label> -->
          <v-flex xs5 offset-xs4>
            <v-text-field label="Code" v-model="item.code" style="font-size:1.3em;"></v-text-field>
          </v-flex>

          <v-flex xs5 offset-xs4>
            <v-text-field label="Label" v-model="item.label" style="font-size:1.3em;"></v-text-field>
          </v-flex>

          <v-flex xs5 offset-xs4>
            <!-- <p v-for="item in selected" :key="item">{{ item }}</p> -->
            <v-checkbox
              class="chBox"
              color="blue"
              v-model="item.active"
              label="Active"
              style="margin-boot"
            ></v-checkbox>
          </v-flex>

          <router-link to="/admin/frequency" class="rtl">
            <v-btn small color="green" style="color:white;" v-on:click="editCC(item)">SAVE</v-btn>
          </router-link>

          <router-link to="/admin/frequency" class="rtl">
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
import { mapState, mapActions } from "vuex";
export default {
  components: {
    ToolbarAddEdit
  },
  data() {
    return {
      person: [
        { code: "1", blood: "o" },
        { code: "12", blood: "a" },
        { code: "13", blood: "b" },
        { code: "14", blood: "c" },
        { code: "15", blood: "d" }
      ],
      selected: []
    };
  },
  computed: {
    ...mapState(["frequency"])
  },
  methods: {
    ...mapActions(["callFrequency","snAdd","snAddErr"]),

    editCC(item) {
      var self = this;
     
      axios
        .put("/api/base/item-frequencies/" + self.$route.params.id, {
          code: item.code,
          label: item.label,
          active:item.active
        })
        .then(function(response) {
          console.log(response);
          self.callFrequency();
          self.snAdd();
        })
        .catch(function(error) {
          console.log(error);
          self.snAddErr();
        });

     
    }
  },
  mounted() {
    this.callFrequency();
  }
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}
.menu {
  width: 17%;
  float: left;
  height: 100vh;
}
.rtl{
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
.chBox {
  margin-top: 0px;
  padding-top: 0px;
}
</style>
