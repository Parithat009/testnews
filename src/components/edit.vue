<template>
  <div class="hello">
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <br>
    <br>

    <div v-for="(item, index) in news" :key="index">
      <div v-if="item.id == $route.params.id">
        <v-flex xs5 offset-xs4>
          <v-text-field label="Title" v-model="item.title" style="font-size:1.3em;"></v-text-field>
        </v-flex>

        <v-flex xs5 offset-xs4>
          <v-textarea style="font-size:1.3em;" label="Detail" v-model="item.detail" hint="Hint text"></v-textarea>
        </v-flex>

        <router-link to="/admin/test3" class="rtl">
          <v-btn small color="green" style="color:white;" v-on:click="edit(item)">SAVE</v-btn>
        </router-link>

        <router-link to="/admin/test3" class="rtl">
          <v-btn small color="red" style="color:white;">cancel</v-btn>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      news: []
    };
  },
  methods: {
    callapi() {
      var self = this;
      axios.defaults.baseURL = "https://agile-cliffs-83142.herokuapp.com/api";
      axios
        .get("/news")
        .then(function(res) {
          self.news = res.data;
          console.log(self.news);
        })
        .catch(function(error) {
          console.log("Error:", error);
        });
    },

    edit(item) {
      var self = this;
      axios.defaults.baseURL = "https://agile-cliffs-83142.herokuapp.com/api";
      axios
        .put("/news/" + self.$route.params.id, {
          title: item.title,
          detail: item.detail,
          
        })
        .then(function(response) {
          console.log(response);
        //   self.callapi();
          
        })
        .catch(function(error) {
          console.log(error);
          
        });
    }
  },
  mounted() {
    this.callapi();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.cardtext {
  font-size: 15px;
}
</style>
