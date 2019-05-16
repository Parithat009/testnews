<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Kanit:400,500,600&subset=latin-ext,thai,vietnamese");
#app {
  font-family: "Kanit", sans-serif;
  text-align: center;
  color: #000000;
  background-color: white;
}
body {
  margin-top: 0px;
  margin-right: 0px;
  margin-bottom: 0px;
  margin-left: 0px;
}
</style>
