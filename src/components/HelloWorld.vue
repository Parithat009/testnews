<template>
  <div class="hello">
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat>Link One</v-btn>
        <!-- <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>-->
      </v-toolbar-items>
    </v-toolbar>
    <br>
    <br>

    <v-card style="margin-bottom:10px;" class="mx-auto" color="#26c6da" dark max-width="600" v-for="(item, index) in news" :key="index">
      <v-card-title>
        <span class="title font-weight-bold">{{item.title}}</span>
      </v-card-title>

      <v-card-text class="cardtext">{{item.detail}}</v-card-text>
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
      var self =this;
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
    }
  },
  mounted(){
    this.callapi();
    this.$nextTick(() => {
      setTimeout(() => {
        this.callapi();
      }, 400);
    });
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
.cardtext{
  font-size: 15px;
}
</style>
