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
        >Add Item</b-navbar-brand>
      </b-navbar>

      <div style="margin-top:25px;">
        <div>
          <!-- <label>Code :&nbsp;</label> -->
          <v-flex xs5 offset-xs4 style="margin-bottom:-3%;">
            <v-radio-group v-model="radios" row>
              <h3 style="font-size:1.1em; color:grey; font-weight:normal;">Item type : &nbsp; &nbsp;</h3>
              <v-radio label="Item" value="item"></v-radio>
              <v-radio label="Item set" value="item set"></v-radio>
            </v-radio-group>
          </v-flex>

          <v-flex xs5 offset-xs4 style="margin-bottom:-1.7%;">
            <v-text-field label="Code" v-model="code" style="font-size:1.3em;"></v-text-field>
          </v-flex>

          <v-flex xs5 offset-xs4>
            <!-- <v-text-field label="Label" v-model="blood" style="font-size:1.3em;"></v-text-field> -->
            <v-textarea style="font-size:1.3em;" label="Label" v-model="blood" hint="Hint text"></v-textarea>
          </v-flex>
          <v-flex xs5 offset-xs4 style="margin-bottom:-1.7%;">
            <v-checkbox
              class="chBox"
              color="blue"
              v-model="active"
              label="Active"
              style="margin-boot"
            ></v-checkbox>
          </v-flex>

          <v-flex xs5 offset-xs4>
            <b-form-select v-model="select" class="mb-3">
              <template slot="first">
                <option :value="null" disabled>-- Select Item Group --</option>
                <option
                  v-for="(item, index) in items"
                  :key="index"
                  :value="item.value"
                >{{item.option}}</option>
              </template>
            </b-form-select>
          </v-flex>
          <br>

          <v-flex xs5 offset-xs4>
            <h3 style="font-size:1.2em; color:black; font-weight:normal;text-align:left;">Price</h3>
            <hr style="border-style: groove; border-width: 3px;" color="grey">
            <v-text-field
              label="Cost / Thai baht (฿)"
              type="number"
              v-model="cost"
              style="font-size:1.3em;"
            ></v-text-field>
            <v-text-field
              label="Price / Thai baht (฿)"
              type="number"
              v-model="price"
              style="font-size:1.3em;"
            ></v-text-field>
          </v-flex>
          <br>
          <!-- ------------------------------------------------------------------------------------ -->
          <!-- ------------------------------------------------------------------------------------ -->
          <div v-if="radios == 'item'">
            <v-flex xs5 offset-xs4>
              <div v-if="select == '1'">
                <h3
                  style="font-size:1.2em; color:black; font-weight:normal;text-align:left;"
                >Drug description</h3>
                <hr style="border-style: groove; border-width: 3px; " color="grey">

                <b-form-select v-model="selectIn" class="mb-3">
                  <template slot="first">
                    <option :value="null" disabled>Instruction</option>
                    <option
                      v-for="(item, index) in instruction.results"
                      :key="index"
                      :value="item.id"
                    >{{item.code}}</option>
                  </template>
                </b-form-select>

                <v-layout>
                  <v-text-field label="Dose" v-model="dose" style="font-size:1.3em;"></v-text-field>
                  <b-form-select
                    v-model="selectU"
                    class="mb-3"
                    style=" margin-top: 3%; width: 35%;"
                  >
                    <template slot="first">
                      <option :value="null" disabled>Unit</option>
                      <option
                        v-for="(item, index) in unit.results"
                        :key="index"
                        :value="item.id"
                      >{{item.code}}</option>
                    </template>
                  </b-form-select>
                </v-layout>

                <b-form-select v-model="selectF" class="mb-3">
                  <template slot="first">
                    <option :value="null" disabled>Frequency</option>
                    <option
                      v-for="(item, index) in frequency.results"
                      :key="index"
                      :value="item.id"
                    >{{item.code}}</option>
                  </template>
                </b-form-select>

                <b-form-select v-model="selectC" class="mb-3">
                  <template slot="first">
                    <option :value="null" disabled>Caution</option>
                    <option
                      v-for="(item, index) in caution.results"
                      :key="index"
                      :value="item.id"
                    >{{item.code}}</option>
                  </template>
                </b-form-select>

                <v-textarea
                  style="font-size:1.3em;"
                  label="Description"
                  v-model="description"
                  hint="Hint text"
                ></v-textarea>
              </div>

              <div v-if="select == '3'">
                <h3
                  style="font-size:1.2em; color:black; font-weight:normal;text-align:left;"
                >Lab description</h3>
                <hr style="border-style: groove; border-width: 3px; " color="grey">

                <v-text-field label="Label" v-model="unittext" style="font-size:1.3em;"></v-text-field>

                <b-form-select v-model="selectLab" :options="itemLab" class="mb-3">
                  <template slot="first">
                    <option :value="null" disabled>Lab Group</option>
                  </template>
                </b-form-select>

                <v-radio-group v-model="result" row>
                  <h3 style="font-size:1em; color:grey; font-weight:normal;">Result : &nbsp; &nbsp;</h3>
                  <v-radio label="Text" value="text"></v-radio>
                  <v-radio label="Number" value="number"></v-radio>
                </v-radio-group>

                <div v-if="result == 'text'">
                  <v-layout>
                    <v-text-field
                      label="Min"
                      type="number"
                      v-model="min"
                      style="font-size:1.3em; width:38%; margin-right:3%;"
                    ></v-text-field>
                    <v-text-field label="Max" type="number" v-model="max" style="font-size:1.3em; width:40%;"></v-text-field>
                  </v-layout>
                  <v-text-field label="Normal" v-model="normal" style="font-size:1.3em;"></v-text-field>
                  <v-text-field label="Unit" v-model="unit2" style="font-size:1.3em;"></v-text-field>
                </div>
                <div v-if="result == 'number'">
                  <v-layout>
                    <v-text-field
                      label="Min"
                      v-model="min"
                      type="number"
                      style="font-size:1.3em; width:38%; margin-right:3%;"
                    ></v-text-field>
                    <v-text-field label="Max" type="number" v-model="max" style="font-size:1.3em; width:40%;"></v-text-field>
                  </v-layout>
                  <v-text-field label="Normal" v-model="normal" style="font-size:1.3em;"></v-text-field>
                  <v-text-field label="Unit" v-model="unit2" style="font-size:1.3em;"></v-text-field>
                </div>
              </div>
            </v-flex>
          </div>
          <div v-if="radios == 'item set'">
            <h1>item set ...</h1>
            <h2>222</h2>
          </div>

          <router-link to="/admin/item" class="rtl">
            <v-btn small color="green" style="color:white; " v-on:click="addCC()">SAVE</v-btn>
          </router-link>

          <router-link to="/admin/item" class="rtl">
            <v-btn small color="red" style="color:white;">cancel</v-btn>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToolbarAddEdit from "../ToolbarAddEdit.vue";
import { mapActions, mapState } from "vuex";
import axios from "axios";
export default {
  components: {
    ToolbarAddEdit
  },
  computed: {
    ...mapState(["item", "unit", "caution", "frequency", "instruction"])
  },

  data() {
    return {
      code: "",
      blood: "",
      active: true,
      radios: "",
      items: [
        { option: "Drug", value: 1 },
        { option: "Service Charge", value: 5 },
        { option: "Lab", value: 3 }
      ],
      select: null,
      selectIn: null,
      selectU: null,
      selectF: null,
      selectC: null,
      cost: "",
      price: "",
      description: "",
      dose: "",
      unittext: "",
      result: "",
      normal: "",
      unit2: "",
      itemId: "",
      selectLab: null,
      itemLab: [
        { value: 1, text: "เคมีคลินิก (Clinical Chemist" },
        { value: 2, text: "โลหิตวิทยา (Hematolog)" },
        { value: 3, text: "จุลชีววิทยา (Microbiolo)" }
      ],
      min: null,
      max: null,
      idLab: {},
      idLabs: "",
      resultStr:false
    };
  },
  methods: {
    async addCC() {
      var self = this;
      try {
        const response = await axios.post("/api/base/items", {
          code: this.code,
          label: this.blood,
          isItemSet: false,
          itemGroupId: this.select
        });

        this.itemId = response.data;
        console.log(this.itemId);

        // await this.callItem();
        // setTimeout(() => {
        //   this.getid();
        // }, 400);
        this.getid();

        await this.snAdd();
      } catch (err) {
        console.log("Err 1 ==" + err);
        this.snAddErr();
      }

      console.log("add");
    },
    getid() {
      console.log("wait");
      var self = this;

      axios
        .post("/api/base/item-prices", {
          itemId: this.itemId.id,
          cost: this.cost,
          price: this.price
        })
        .then(function(response) {
          console.log(response);
          self.snAdd();
        })
        .catch(function(error) {
          console.log(error);
          self.snAddErr();
        });

      if (this.select == "1") {
        axios
          .post("/api/base/item-drugs", {
            description: this.description,
            dose: this.dose,
            itemId: this.itemId.id,
            itemCautionId: this.selectC,
            itemFrequencyId: this.selectF,
            itemInstructionId: this.selectIn,
            itemUnitId: this.selectU
          })
          .then(function(response) {
            console.log(response);
            self.snAdd();
          })
          .catch(function(error) {
            console.log(error);
            self.snAddErr();
          });
      } else if (this.select == "3") {
        axios
          .post("/api/base/item-labs", {
            itemId: this.itemId.id,
            itemLabGroupId: this.selectLab,
            active: this.active
          })
          .then(function(response) {
            self.idLabs = response.data;
            console.log(self.idLabs);

            self.AddLab();

            self.snAdd();
          })
          .catch(function(error) {
            console.log(error);
            self.snAddErr();
          });
      }
    },
    AddLab() {
      if (this.result == 'text') {
        this.resultStr = true;
      }else if (this.result == 'number') {
        this.resultStr = false;
      }
      console.log(this.resultStr + '**************');
      var self = this;
      axios
        .post("/api/base/item-lab-tests", {
          itemLabId: this.idLabs.id,
          label: this.unittext,
          isResultStr:this.resultStr,
          normal:this.normal,
          min:this.min,
          max:this.max,
          unit:this.unit2,
          active: this.active
        })
        .then(function(response) {
          console.log(response);

          self.snAdd();
        })
        .catch(function(error) {
          console.log(error);
          self.snAddErr();
        });
    },

    ...mapActions([
      "snAdd",
      "snAddErr",
      "callItem",
      "callUnit",
      "callCaution",
      "callFrequency",
      "callInstruction"
    ])
  },
  mounted() {
    this.callUnit();
    this.callCaution();
    this.callFrequency();
    this.callInstruction();
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
.rtl {
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
.toolbar {
  text-transform: uppercase;
  color: white;
  font-weight: bold;
  font-size: 1.1em;
}
.chBox {
  margin-top: 0px;
  padding-top: 0px;
}
</style>
