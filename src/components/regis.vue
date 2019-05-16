<template>
  <div>
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <br>
    <br>

    <v-flex xs5 offset-xs4>
      <v-text-field label="first name" v-model="first" style="font-size:1.3em;"></v-text-field>
    </v-flex>
    <v-flex xs5 offset-xs4>
      <v-text-field label="last name" v-model="last" style="font-size:1.3em;"></v-text-field>
    </v-flex>
    <v-flex xs5 offset-xs4>
      <v-text-field label="username" v-model="user" style="font-size:1.3em;"></v-text-field>
    </v-flex>
    <v-flex xs5 offset-xs4>
      <v-text-field label="password" type="password" v-model="pass" style="font-size:1.3em;"></v-text-field>
    </v-flex>

    <router-link to="/admin/loginnews" class="rtl">
      <v-btn small color="green" style="color:white;" v-on:click="save()">SAVE</v-btn>
    </router-link>

    <router-link to="/admin/loginnews" class="rtl">
      <v-btn small color="red" style="color:white;">cancel</v-btn>
    </router-link>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      first: null,
      last: null,
      user: null,
      pass: null
    };
  },
  methods: {
    save() {
      var self = this;

      axios
        .post("https://agile-cliffs-83142.herokuapp.com/api/user", {
          first_name: this.first,
          last_name: this.last,
          username: this.user,
          password: this.pass
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>