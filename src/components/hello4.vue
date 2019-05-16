<template>
  <div class="hello">
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-on:click="add()">Add</v-btn>
        <!-- <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>-->
      </v-toolbar-items>
    </v-toolbar>
    <br>
    <br>

    <v-card
      style="margin-bottom:10px;"
      class="mx-auto"
      color="#26c6da"
      dark
      max-width="600"
      v-for="(item, index) in news"
      :key="index"
    >
      <v-card-title>
        <span class="title font-weight-bold">{{item.title}}</span>
      </v-card-title>

      <v-card-text class="cardtext">{{item.detail}}</v-card-text>

      <v-btn
        fab
        dark
        small
        color="blue"
        style="width:auto; height:auto;"
        v-on:click="edit(item.id)"
      >
        <v-icon style="padding:9px;" dark>edit</v-icon>
      </v-btn>
      <v-btn fab dark small color="red" style="width:auto; height:auto;" v-on:click="del(item.id)">
        <v-icon style="padding:9px;" dark>delete</v-icon>
      </v-btn>
    </v-card>

    <!-- <v-btn color="green darken-1" flat v-on:click="callapi()">Click</v-btn> -->

    <!-- <v-btn small color="green" style="color:white;" v-on:click="event()">Click</v-btn> -->
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
      const token2 = sessionStorage.getItem("admin");
      const token3 = JSON.parse(token2);
      axios.defaults.baseURL = "https://agile-cliffs-83142.herokuapp.com/api";
      axios
        .get("/user/"+token3.id+"/news")
        .then(function(res) {
          self.news = res.data;
          console.log(self.news);
        })
        .catch(function(error) {
          console.log("Error:", error);
        });
    },
    add() {
      this.$router.push({ path: "./addnews" });
    },
    edit(id) {
      this.$router.push({ path: "./editnews/" + id });
    },
    del(id) {
      var self = this;
      axios.delete("/news/" + id).then(function(response) {
        console.log(response);
        self.callapi();
      });
    }
  },
  mounted() {
    this.callapi();

    setTimeout(() => {
      this.callapi();
    }, 500);
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
