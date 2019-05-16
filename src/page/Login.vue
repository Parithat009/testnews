<template>
  <div class="containerApp">
    <div class="loginContent">
      <b-form-group id="exampleInputGroup1" label-for="exampleInput1" class="loginForm">
        <div class="loginForm-logo">
          <img src="../image/icon.png">
          <label style="text-shadow: 0.1em 0.1em 0.2em black;">chaofa vet clinic</label>
        </div>

        <div class="loginForm-input">
          <div class="inputField ico-accountCircle">
            <label class="float-left">
              <v-icon>person</v-icon>Username
            </label>
            <b-form-input
              id="exampleInput1"
              type="email"
              placeholder="Username  "
              class="input1"
              style="box-shadow: 0.1em 0.1em 0.2em black;"
              v-model="username"
            />
          </div>
          <div class="inputField ico-keyLock">
            <label class="float-left">
              <v-icon>lock</v-icon>Password
            </label>
            <b-form-input
              id="exampleInput1"
              type="password"
              placeholder="Password  "
              class="input1"
              style="box-shadow: 0.1em 0.1em 0.2em black;"
              v-model="password"
            />
          </div>
        </div>
        <v-btn
          color="rgba(0,0,0,.3)"
          style="color:white; "
          class="loginbtn"
          type="submit"
          v-on:click="getLogin()"
        >Login</v-btn>
      </b-form-group>

      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :top="y === 'top'"
        :right="x === 'right'"
        :timeout="timeout"
        color="red"
      >
        Invalid username or password.
        <v-btn color="white" flat @click="snackbar = false">ปิด</v-btn>
      </v-snackbar>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  // computed: {
  //   ...mapState(["username", "password"])
  // },
  data() {
    return {
      username: "",
      password: "",
      todos: [],
      snackbar:false,
      y: "bottom",
      x: "right",
      timeout: 0
    };
  },
  methods: {
    ...mapActions(["login"]),

    async getLogin() {
      // this.todos.push({ username: this.username, password: this.password });
      // sessionStorage.setItem("user", JSON.stringify(this.todos));

      let data = { username: this.username, password: this.password };
      this.$store.commit("getLogin", data);
      var route = null;

      try {
        await this.login();
        route = "users";
      } catch (e) {
        console.log("asd" + e);
        route = "login";
        this.snackbar = true;
      }

      console.log("logined");
      this.$router.push({ path: "./" + route });
    }
  }
};
</script>

<style scoped>
.loginContent {
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background-color: #27a292;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100vh;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  width: 100vw;
}
.loginForm {
  width: 300px;
}
.loginForm-logo label {
  font-size: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.1875rem;
  text-transform: uppercase;
}
img {
  height: 4rem;
  width: 4rem;
}
.loginContent .inputField > label {
  color: rgba(0, 0, 0, 0.5);
  margin-left: 15px;
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: -1px;
}
.loginForm-input {
  margin: 1.5625rem 0;
}
.loginContent .inputField {
  margin-bottom: 10px;
}
.inputField {
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
}
.input1 {
  border: 1px solid #376f8a;
  border-radius: 6.25rem;
  height: 40px;
  -webkit-box-shadow: 0 0 0 2px transparent;
  box-shadow: 0 0 0 2px transparent;
  width: 300px;
}
.loginbtn {
  border-radius: 6.25rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  -webkit-box-shadow: 0 3px rgba(0, 0, 0, 0.5);
  box-shadow: 0 3px rgba(0, 0, 0, 0.5);
  height: 45px;
  margin-bottom: 1.25rem;
  overflow: hidden;
  padding: 0.5rem;
  text-transform: uppercase;
  width: 100%;
  margin: 0px;
  font-size: 1.2rem;
}
</style>