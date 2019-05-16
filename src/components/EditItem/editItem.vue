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
        >Edit Item</b-navbar-brand>
      </b-navbar>

      <div v-for="(item , index) in item.results" :key="index" style="margin-top:25px;">
        <div v-if="item.id == $route.params.id">
          <!-- <label>Code :&nbsp;</label> -->
          <v-flex xs5 offset-xs4 style="margin-bottom:-3%;">
            <v-radio-group v-model="radios" row>
              <h3 style="font-size:1.1em; color:grey; font-weight:normal;">Item type : &nbsp; &nbsp;</h3>
              <v-radio label="Item" value="item"></v-radio>
              <v-radio label="Item set" value="item set"></v-radio>
            </v-radio-group>
          </v-flex>

          <v-flex xs5 offset-xs4 style="margin-bottom:-1.7%;">
            <v-text-field label="Code" v-model="item.code" style="font-size:1.3em;"></v-text-field>
          </v-flex>

          <v-flex xs5 offset-xs4>
            <!-- <v-text-field label="Label" v-model="blood" style="font-size:1.3em;"></v-text-field> -->
            <v-textarea
              style="font-size:1.3em;"
              label="Label"
              v-model="item.label"
              hint="Hint text"
            ></v-textarea>
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
            <b-form-select v-model="item.itemGroup.id" class="mb-3">
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

          <div v-for="(pr, index) in itemprice.results" :key="index">
            <div v-if="pr.itemId == item.id">
              <v-flex xs5 offset-xs4>
                <h3 style="font-size:1.2em; color:black; font-weight:normal;text-align:left;">Price</h3>
                <hr style="border-style: groove; border-width: 3px;" color="grey">
                <v-text-field
                  label="Cost / Thai baht (฿)"
                  type="number"
                  v-model="pr.cost"
                  style="font-size:1.3em;"
                ></v-text-field>
                <v-text-field
                  label="Price / Thai baht (฿)"
                  type="number"
                  v-model="pr.price"
                  style="font-size:1.3em;"
                ></v-text-field>
              </v-flex>
            </div>
          </div>
          <br>
          <!-- ------------------------------------------------------------------------------------ -->
          <!-- ------------------------------------------------------------------------------------ -->
          <div v-if="radios == 'item'">
            <v-flex xs5 offset-xs4>
              <div v-if="item.itemGroup.id == '1'">
                <h3
                  style="font-size:1.2em; color:black; font-weight:normal;text-align:left;"
                >Drug description</h3>
                <hr style="border-style: groove; border-width: 3px; " color="grey">

                <div v-for="(dr, index) in itemdrug.results" :key="index">
                  <div v-if="dr.item.id == item.id">
                    <b-form-select v-model="dr.itemInstruction.id" class="mb-3">
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
                      <v-text-field label="Dose" v-model="dr.dose" style="font-size:1.3em;"></v-text-field>
                      <b-form-select
                        v-model="dr.itemUnit.id"
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

                    <b-form-select v-model="dr.itemFrequency.id" class="mb-3">
                      <template slot="first">
                        <option :value="null" disabled>Frequency</option>
                        <option
                          v-for="(item, index) in frequency.results"
                          :key="index"
                          :value="item.id"
                        >{{item.code}}</option>
                      </template>
                    </b-form-select>

                    <b-form-select v-model="dr.itemCaution.id" class="mb-3">
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
                      v-model="dr.description"
                      hint="Hint text"
                    ></v-textarea>
                  </div>
                </div>
              </div>
              <!-- -------------------------------------------------------------------------------------------- -->
              <div v-if="item.itemGroup.id == '3'">
                <h3
                  style="font-size:1.2em; color:black; font-weight:normal;text-align:left;"
                >Lab description</h3>
                <hr style="border-style: groove; border-width: 3px; " color="grey">

                <div v-for="(lb, index) in itemlab.results" :key="index">
                  <div v-if="lb.item.id == item.id">
                    <div v-for="(lt, index) in labtest.results" :key="index">
                      <div v-if="lt.itemLab.item.id == item.id">
                        <v-text-field label="Label" v-model="lt.label" style="font-size:1.3em;"></v-text-field>

                        <b-form-select v-model="lb.itemLabGroup.id" class="mb-3">
                          <template slot="first">
                            <option :value="null" disabled>Lab Group</option>
                            <option
                              v-for="(item, index) in itemdes"
                              :key="index"
                              :value="item.value"
                            >{{item.text}}</option>
                          </template>
                        </b-form-select>

                        <v-radio-group v-model="result" row>
                          <h3
                            style="font-size:1em; color:grey; font-weight:normal;"
                          >Result : &nbsp; &nbsp;</h3>
                          <v-radio label="Text" value="text"></v-radio>
                          <v-radio label="Number" value="number"></v-radio>
                        </v-radio-group>

                        <div v-if="result == 'text'">
                          <v-layout>
                            <v-text-field
                              label="Min"
                              type="number"
                              v-model="lt.normalMin"
                              style="font-size:1.3em; width:38%; margin-right:3%;"
                            ></v-text-field>
                            <v-text-field
                              label="Max"
                              type="number"
                              v-model="lt.normalMax"
                              style="font-size:1.3em; width:40%;"
                            ></v-text-field>
                          </v-layout>
                          <v-text-field
                            label="Normal"
                            v-model="lt.normalStr"
                            style="font-size:1.3em;"
                          ></v-text-field>
                          <v-text-field label="Unit" v-model="lt.unit" style="font-size:1.3em;"></v-text-field>
                        </div>
                        <div v-if="result == 'number'">
                          <v-layout>
                            <v-text-field
                              label="Min"
                              v-model="lt.normalMin"
                              type="number"
                              style="font-size:1.3em; width:38%; margin-right:3%;"
                            ></v-text-field>
                            <v-text-field
                              label="Max"
                              type="number"
                              v-model="lt.normalMax"
                              style="font-size:1.3em; width:40%;"
                            ></v-text-field>
                          </v-layout>
                          <v-text-field
                            label="Normal"
                            v-model="lt.normalStr"
                            style="font-size:1.3em;"
                          ></v-text-field>
                          <v-text-field label="Unit" v-model="lt.unit" style="font-size:1.3em;"></v-text-field>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-flex>
          </div>
          <div v-if="radios == 'item set'">
            <h1>item set ...</h1>
            <h2>...2</h2>
          </div>
          <!-- <button v-on:click="cl()">123</button> -->

          <router-link to="/admin/item" class="rtl">
            <v-btn small color="green" style="color:white;" v-on:click="editCC(item)">SAVE</v-btn>
          </router-link>

          <router-link to="/admin/item" class="rtl">
            <v-btn small color="red" style="color:white;">cancel</v-btn>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- end -->
</template>

<script>
import ToolbarAddEdit from "../ToolbarAddEdit.vue";
import axios from "axios";
import { mapState, mapActions } from "vuex";
export default {
  components: {
    ToolbarAddEdit
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
      selected: [],
      radios: "item",
      active: true,
      items: [
        { option: "Drug", value: 1 },
        { option: "Service Charge", value: 5 },
        { option: "Lab", value: 3 }
      ],
      itemdes: [
        { value: 1, text: "เคมีคลินิก (Clinical Chemist" },
        { value: 2, text: "โลหิตวิทยา (Hematolog)" },
        { value: 3, text: "จุลชีววิทยา (Microbiolo)" }
      ],

      itemprice: {},
      itemdrug: {},
      itemlab: {},
      labtest: {},
      result: "",
      elementPrice: null,
      elementDrug: null,
      elementLab: null,
      elementLT: null
    };
  },
  computed: {
    ...mapState(["item", "unit", "caution", "frequency", "instruction"])
  },
  methods: {
    ...mapActions([
      "callItem",
      "snAdd",
      "snAddErr",
      "callUnit",
      "callCaution",
      "callFrequency",
      "callInstruction"
    ]),
    cl() {
      // for (let index = 0; index < this.itemlab.results.length; index++) {
      //   const element = this.itemlab.results[index];
      //   if (element.item.id == this.$route.params.id) {
      //     this.elementLab = element;
      //     console.log(this.elementLab);
      //   }
      // }
      // for (let index = 0; index < this.labtest.results.length; index++) {
      //   const element = this.labtest.results[index];
      //   if (element.itemLab.item.id == this.$route.params.id) {
      //     this.elementLT = element;
      //     console.log(this.elementLT);
      //   }
      // }
    },
    editCC(item) {
      for (let index = 0; index < this.itemprice.results.length; index++) {
        const element = this.itemprice.results[index];
        if (element.itemId == this.$route.params.id) {
          this.elementPrice = element;
          console.log(this.elementPrice.cost);
        }
      }
      for (let index = 0; index < this.itemdrug.results.length; index++) {
        const element = this.itemdrug.results[index];
        if (element.item.id == this.$route.params.id) {
          this.elementDrug = element;
        }
      }
      var self = this;

      axios
        .put("/api/base/items/" + self.$route.params.id, {
          code: item.code,
          label: item.label,
          active: item.active,
          isItemSet: false,
          itemGroupId: item.itemGroup.id
        })
        .then(function(response) {
          console.log(response);
          self.callItem();
          self.snAdd();
        })
        .catch(function(error) {
          console.log(error);
          self.snAddErr();
        });

      axios
        .put("/api/base/item-prices/" + this.elementPrice.id, {
          cost: this.elementPrice.cost,
          price: this.elementPrice.price
        })
        .then(function(response) {
          console.log(response);
          self.callItem();
          self.snAdd();
        })
        .catch(function(error) {
          console.log(error);
          self.snAddErr();
        });

      if (item.itemGroup.id == "1") {
        axios
          .put("/api/base/item-drugs/" + this.elementDrug.id, {
            description: this.elementDrug.description,
            dose: this.elementDrug.dose,
            itemCautionId: this.elementDrug.itemCaution.id,
            itemFrequencyId: this.elementDrug.itemFrequency.id,
            itemInstructionId: this.elementDrug.itemInstruction.id,
            itemUnitId: this.elementDrug.itemUnit.id
          })
          .then(function(response) {
            console.log(response);
            self.callItem();
            self.snAdd();
          })
          .catch(function(error) {
            console.log(error);
            self.snAddErr();
          });
      }
    },
    callPrice() {
      var self = this;
      const token2 = sessionStorage.getItem("admin");
      const token3 = JSON.parse(token2);
      const jwt2 = "JWT ";
      axios.defaults.baseURL = "http://chaofavc.somprasongd.work:81";
      axios.defaults.headers.common["Authorization"] = jwt2 + token3.token;
      axios
        .get("/api/base/item-prices")
        .then(function(res) {
          if (res.status !== 200) {
            self.itemprice = null;
            return;
          }
          self.itemprice = res.data;
          console.log(self.itemprice);
        })
        .catch(function(error) {
          console.log("Error:", error);
        });
    },
    callDrug() {
      var self = this;
      const token2 = sessionStorage.getItem("admin");
      const token3 = JSON.parse(token2);
      const jwt2 = "JWT ";
      axios.defaults.baseURL = "http://chaofavc.somprasongd.work:81";
      axios.defaults.headers.common["Authorization"] = jwt2 + token3.token;
      axios
        .get("/api/base/item-drugs")
        .then(function(res) {
          if (res.status !== 200) {
            self.itemdrug = null;
            return;
          }
          self.itemdrug = res.data;
          console.log(self.itemdrug);
        })
        .catch(function(error) {
          console.log("Error:", error);
        });
    },
    callLab() {
      var self = this;
      const token2 = sessionStorage.getItem("admin");
      const token3 = JSON.parse(token2);
      const jwt2 = "JWT ";
      axios.defaults.baseURL = "http://chaofavc.somprasongd.work:81";
      axios.defaults.headers.common["Authorization"] = jwt2 + token3.token;
      axios
        .get("/api/base/item-labs")
        .then(function(res) {
          if (res.status !== 200) {
            self.itemlab = null;
            return;
          }
          self.itemlab = res.data;
          console.log(self.itemlab);
        })
        .catch(function(error) {
          console.log("Error:", error);
        });
    },
    calllabtest() {
      var self = this;
      const token2 = sessionStorage.getItem("admin");
      const token3 = JSON.parse(token2);
      const jwt2 = "JWT ";
      axios.defaults.baseURL = "http://chaofavc.somprasongd.work:81";
      axios.defaults.headers.common["Authorization"] = jwt2 + token3.token;
      axios
        .get("/api/base/item-lab-tests")
        .then(function(res) {
          if (res.status !== 200) {
            self.labtest = null;
            return;
          }
          self.labtest = res.data;
          console.log(self.labtest);
        })
        .catch(function(error) {
          console.log("Error:", error);
        });
    }
    // setresult() {
    //   for (let index = 0; index < this.labtest.results.length; index++) {
    //     const element = this.labtest.results[index];

    //     if (element.itemLab.item.id == this.$route.params.id) {
    //       this.elementLT = element;
    //       if (this.elementLT.resultStr == true) {
    //         this.result = 'text';
    //       }else{
    //         this.result = 'number';
    //       }
    //     }
    //   }
    // }
  },
  mounted() {
    this.callItem();
    this.callPrice();
    this.callDrug();
    this.callLab();
    this.calllabtest();
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
.chBox {
  margin-top: 0px;
  padding-top: 0px;
}
</style>
