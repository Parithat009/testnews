<template>
  <div id="app">
    <Toolbar></Toolbar>

    <div class="main">
      <b-navbar
        toggleable="lg"
        type="dark"
        style="background-color:rgb(39, 162, 146); box-shadow: 5px 5px 5px #ccc;"
      >
        <b-navbar-brand
          style="font-size: 1.2em; font-weight:bold; text-shadow: 1.7px 2px 1.7px rgb(86, 125, 121);"
        >Instruction List</b-navbar-brand>
        <v-spacer></v-spacer>

        <v-btn icon color="white" v-on:click="add()" class="item-xs-right">
          <v-icon>add</v-icon>
        </v-btn>
        <b-form-input size="sm" class="binput" type="text" placeholder="Search" v-model="search"/>
      </b-navbar>

      <v-card style="width:100%; box-shadow: 5px 5px 5px #ccc;">
        <v-data-table :headers="headers" :items="instruction.results" :search="search">
          <template v-slot:items="props" v-slot:activator class="float-right">
            <td class="td1" style=" font-size:1.2em; padding:20px;">{{ props.item.code }}</td>

            <td class="td2" style=" font-size:1.2em;padding:20px;">
              {{ props.item.label }}
              <v-bottom-sheet>
                <template v-slot:activator>
                  <v-btn flat icon color="indigo" style="width:auto; height:auto; " class="btnset">
                    <v-icon small color="grey" dark>more_horiz</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-subheader>Open in</v-subheader>
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <v-avatar size="32px" tile>
                        <v-btn
                          fab
                          dark
                          small
                          color="blue"
                          style="width:auto; height:auto;"
                          v-on:click="editCode(props.item)"
                        >
                          <v-icon style="padding:9px;" dark>edit</v-icon>
                        </v-btn>
                      </v-avatar>
                    </v-list-tile-avatar>
                    <v-list-tile-title>Edit</v-list-tile-title>
                  </v-list-tile>
                  <v-list-tile>
                    <v-list-tile-avatar>
                      <v-avatar size="32px" tile>
                        <v-btn
                          style="width:auto; height:auto;"
                          fab
                          dark
                          small
                          color="red"
                          v-on:click="deleteCode(props.item)"
                          @click.stop="dialog = true"
                        >
                          <v-icon style="padding:9px;" dark>delete</v-icon>
                        </v-btn>
                      </v-avatar>
                    </v-list-tile-avatar>
                    <v-list-tile-title>Delete</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-bottom-sheet>
            </td>
            <td style="padding:10px;" class="td3">
              <v-btn
                fab
                dark
                small
                color="blue"
                style="width:auto; height:auto;"
                v-on:click="editCode(props.item)"
              >
                <v-icon style="padding:9px;" dark>edit</v-icon>
              </v-btn>
              <v-btn
                style="width:auto; height:auto;"
                fab
                dark
                small
                color="red"
                v-on:click="deleteCode(props.item)"
                @click.stop="dialog = true"
              >
                <v-icon style="padding:9px;" dark>delete</v-icon>
              </v-btn>
            </td>
          </template>
          <v-alert
            v-slot:no-results
            :value="true"
            color="error"
            icon="warning"
          >Your search for "{{ search }}" found no results.</v-alert>
        </v-data-table>

        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="headline">Confirm</v-card-title>
            <v-card-text>Are you want to delete ?</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                flat
                @click="dialog = false"
                v-on:click="deleteConfirm()"
              >Yes</v-btn>
              <v-btn color="red darken-1" flat @click="dialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card>
      <v-snackbar
        v-model="snackbar"
        :bottom="y === 'bottom'"
        :top="y === 'top'"
        :right="x === 'right'"
        :timeout="timeout"
        :color="snColor"
      >
        {{ snText }}
        <v-btn color="white" flat @click="snStop">ปิด</v-btn>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import Toolbar from "../components/Toolbar.vue";
import { mapState, mapActions } from "vuex";
import axios from "axios";
export default {
  components: {
    Toolbar
  },
  computed: {
    ...mapState(["instruction", "snColor", "snText", "snackbar"])
  },

  data() {
    return {
      person: [
        { code: "1", blood: "o" },
        { code: "12", blood: "a" },
        { code: "13", blood: "b" },
        { code: "14", blood: "c" },
        { code: "15", blood: "d" },
        { code: "19", blood: "d" }
      ],
      dialog: false,
      search: "",
      headers: [
        {
          text: "Code",
          align: "left",
          sortable: false,
          value: "code"
        },

        { text: "Label", sortable: false }
        // { text: "", sortable: false }
      ],
      delete: null,

      y: "bottom",
      x: "right",
      timeout: 0
    };
  },
  methods: {
    deleteCode(i) {
      this.delete = i;
      console.log(this.delete);
    },
    deleteConfirm() {
      var self = this;
      // axios.defaults.baseURL = "http://chaofavc.somprasongd.work:81";
      // axios.defaults.headers.common[
      //   "Authorization"
      // ] = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ3JvdXBzIjpbeyJpZCI6MSwibmFtZSI6InJlZ2lzdGVyIn0seyJpZCI6MiwibmFtZSI6ImRvY3RvciJ9LHsiaWQiOjMsIm5hbWUiOiJsYWIifSx7ImlkIjo0LCJuYW1lIjoicGhhcm1hY3kifSx7ImlkIjo1LCJuYW1lIjoiY2FzaGllciJ9XSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTU0MTkyNDA5fQ.O923cGJ8aiEji_E1SzPz5PjD1PsGNhhDB3JTD2M6TP8`;

      axios
        .delete("/api/base/item-instructions/" + self.delete.id)
        .then(function(response) {
          console.log(response);
          self.callInstruction();
          self.snAdd();
        });
    },

    editCode(i) {
      this.$router.push({ path: "./instruction/edit/" + i.id });
    },
    add() {
      this.$router.push({ path: "./instruction/add" });
    },
    ...mapActions(["callInstruction", "snStop","snAdd"])
  },
  mounted() {
    this.callInstruction();
    this.$nextTick(() => {
      setTimeout(() => {
        this.callInstruction();
      }, 400);
    });
  }
};
</script>

<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
* {
  box-sizing: border-box;
}
.menu {
  width: 17%;
  float: left;
  height: 100vh;
}
.toolbar {
  text-transform: uppercase;
  color: white;
  font-weight: bold;
  font-size: 1.3em;
}

.v-dialog__container {
  display: inline-block;
  vertical-align: middle;
  float: right;
}
@media (min-width: 992px) {
  .main {
    width: 83%;
    float: left;
    padding: 1.5rem;
  }
  .td1 {
    width: 25%;
  }
  .td2 {
    width: 59%;
  }
  .td3 {
    width: 16%;
    visibility: visible !important;
  }
  .btnset {
    visibility: hidden !important;
    display: none;
  }
  .binput {
    width: 40%;
  }

  /* desktop */
}
@media (max-width: 991px) {
  .main {
    width: 100%;
    float: left;
    padding: 1.5rem;
  }
  .td1 {
    width: 30%;
  }
  .td2 {
    width: 60%;
  }
  .td3 {
    visibility: hidden !important;
    display: none;
  }
  .btnset {
    visibility: visible !important;
    float: right;
  }
  .binput {
    width: 55%;
  }

  /* mobile โทสัพ */
}
@media (max-width: 580px) {
  .binput {
    width: 70%;
  }
}
</style>
