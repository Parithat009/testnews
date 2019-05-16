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
          style="font-size: 1.2em; font-weight:bold;text-shadow: 1.7px 2px 1.7px rgb(86, 125, 121);"
        >Edit User</b-navbar-brand>
      </b-navbar>

      <div v-for="(item , index) in us.results" :key="index" style="margin-top:25px;">
        <div v-if="item.id == $route.params.id">
          <!-- <label>Code :&nbsp;</label> -->
          <v-flex xs5 offset-xs4>
            <v-text-field label="Code" v-model="item.username" disabled="" style="font-size:1.3em;"></v-text-field>
          </v-flex>

          <v-flex xs5 offset-xs4>
            <v-text-field label="Blood" v-model="item.name" style="font-size:1.3em;"></v-text-field>
          </v-flex>

          <v-flex xs5 offset-xs4>
            <!-- <p v-for="item in selected" :key="item">{{ item }}</p> -->
            
            <v-checkbox class="chBox" color="blue" v-model="item.isAdmin" label="Staff status" ></v-checkbox>
          </v-flex>

          <router-link to="/admin/users" class="rtl">
            <v-btn small color="green" style="color:white;" v-on:click="editUser(item)">SAVE</v-btn>
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
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    ToolbarAddEdit
  },
  computed: {
    ...mapState(["us"])
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
      selected:[]
    };
  },
  methods: {
    ...mapActions(["callUser","snAdd","snAddErr"]),

    editUser(item) {
      var self = this;
      // axios.defaults.baseURL = "http://chaofavc.somprasongd.work:81";
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ3JvdXBzIjpbeyJpZCI6MSwibmFtZSI6InJlZ2lzdGVyIn0seyJpZCI6MiwibmFtZSI6ImRvY3RvciJ9LHsiaWQiOjMsIm5hbWUiOiJsYWIifSx7ImlkIjo0LCJuYW1lIjoicGhhcm1hY3kifSx7ImlkIjo1LCJuYW1lIjoiY2FzaGllciJ9XSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTU0MTkyNDA5fQ.O923cGJ8aiEji_E1SzPz5PjD1PsGNhhDB3JTD2M6TP8`;

      axios
        .put("/api/users/admin/" + self.$route.params.id, {
          // username: item.username,
          name: item.name,
          email: 'email2@sd.com',
          password: 'password',
          active: true,
          isAdmin: item.isAdmin,
          groups: [1, 2]
        })
        .then(function(response) {
          console.log(response);
          self.callUser();
          self.snAdd();
        })
        .catch(function(error) {
          console.log(error);
          self.snAddErr();
        });

     
    }
  },
  mounted() {
    this.callUser();
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
.chBox{
  margin-top:0px;
  padding-top:0px;
  
}
.rtl{
  text-decoration: none;

}
</style>
