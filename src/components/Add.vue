<template>
  <div class="hello">
    <v-toolbar>
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat v-on:click="add()">Add</v-btn>
       
      </v-toolbar-items> -->
    </v-toolbar>
    <br>
    <br>

    <v-flex xs5 offset-xs4>
      <v-text-field label="Title" v-model="title" style="font-size:1.3em;"></v-text-field>
    </v-flex>

    <v-flex xs5 offset-xs4>
      <v-textarea style="font-size:1.3em;" label="Detail" v-model="detail" hint="Hint text"></v-textarea>
    </v-flex>
    

    <router-link to="/admin/test2" class="rtl">
      <v-btn small color="green" style="color:white;" v-on:click="add()">SAVE</v-btn>
    </router-link>

    <router-link to="/admin/test2" class="rtl">
      <v-btn small color="red" style="color:white;">cancel</v-btn>
    </router-link>

    
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      news: [],
      title:'',
      detail:''
    };
  },
  methods: {
    add() {
      var self = this;
     const token2 = sessionStorage.getItem("admin");
      const token3 = JSON.parse(token2);
      axios
        .post("https://agile-cliffs-83142.herokuapp.com/api/news", {
          title: this.title,
          detail: this.detail,
          user:token3.id
          
        })
        .then(function(response) {
          console.log(response);
          
        })
        .catch(function(error) {
          console.log(error);
          
        });
      console.log("add");
    }
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
