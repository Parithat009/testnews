import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        data: {},
        ex: {},
        ht: {},
        pe: {},
        us: {},
        snackbar: false,
        snColor: null,
        snText: null,

        username: '',
        password: '',
        loginData: null,
        token: null,

        caution: {},
        frequency: {},
        instruction: {},
        unit: {},
        item:{}

        // user: null,

    },
    actions: {
        callApi({ commit }) {
            var self = this;
            const token2 = sessionStorage.getItem("admin");
            const token3 = JSON.parse(token2);
            const jwt2 = "JWT ";
            axios.defaults.baseURL = 'http://chaofavc.somprasongd.work:81'
            axios.defaults.headers.common['Authorization'] = jwt2 + token3.token;
            axios
                .get('/api/base/base-ccs')
                .then(function (res) {
                    if (res.status !== 200) {
                        self.state.data = null;
                        return;
                    }
                    self.state.data = res.data;
                    console.log(self.state.data);

                    commit('callApi')
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });
        },
        callEX() {
            var self = this;
            const token2 = sessionStorage.getItem("admin");
            const token3 = JSON.parse(token2);
            const jwt2 = "JWT ";
            axios.defaults.baseURL = 'http://chaofavc.somprasongd.work:81'
            axios.defaults.headers.common['Authorization'] = jwt2 + token3.token;
            axios
                .get('/api/base/base-exes')
                .then(function (res) {
                    if (res.status !== 200) {
                        self.state.ex = null;
                        return;
                    }
                    self.state.ex = res.data;
                    console.log(self.state.ex);
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });
        },
        callHT() {
            var self = this;
            const token2 = sessionStorage.getItem("admin");
            const token3 = JSON.parse(token2);
            const jwt2 = "JWT ";
            axios.defaults.baseURL = 'http://chaofavc.somprasongd.work:81'
            axios.defaults.headers.common['Authorization'] = jwt2 + token3.token;
            axios
                .get('/api/base/base-hts')
                .then(function (res) {
                    if (res.status !== 200) {
                        self.state.ht = null;
                        return;
                    }
                    self.state.ht = res.data;
                    console.log(self.state.ht);
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });
        },
        callPE() {
            var self = this;
            const token2 = sessionStorage.getItem("admin");
            const token3 = JSON.parse(token2);
            const jwt2 = "JWT ";
            axios.defaults.baseURL = 'http://chaofavc.somprasongd.work:81'
            axios.defaults.headers.common['Authorization'] = jwt2 + token3.token;

            axios
                .get('/api/base/base-pes')
                .then(function (res) {
                    if (res.status !== 200) {
                        self.state.pe = null;
                        return;
                    }
                    self.state.pe = res.data;
                    console.log(self.state.pe);
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });
        },
        callUser() {
            var self = this;

            const token2 = sessionStorage.getItem("admin");
            const token3 = JSON.parse(token2);
            const jwt2 = "JWT ";
            axios.defaults.baseURL = 'http://chaofavc.somprasongd.work:81'
            axios.defaults.headers.common['Authorization'] = jwt2 + token3.token;

            axios
                .get('/api/users/admin')
                .then(function (res) {
                    if (res.status !== 200) {
                        self.state.us = null;
                        return;
                    }
                    self.state.us = res.data;
                    console.log(self.state.us);
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });
        },
        snAdd({ commit }) {
            commit('snAdd')

        },
        snAddErr({ commit }) {
            commit('snAddErr')

        },
        snStop({ commit }) {
            commit('snStop')
        },
        async login({ commit }) {
            var self = this;
            axios.defaults.baseURL = 'http://chaofavc.somprasongd.work:81'
            // axios.defaults.headers.common['Authorization'] = `JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZ3JvdXBzIjpbeyJpZCI6MSwibmFtZSI6InJlZ2lzdGVyIn0seyJpZCI6MiwibmFtZSI6ImRvY3RvciJ9LHsiaWQiOjMsIm5hbWUiOiJsYWIifSx7ImlkIjo0LCJuYW1lIjoicGhhcm1hY3kifSx7ImlkIjo1LCJuYW1lIjoiY2FzaGllciJ9XSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNTU0MTkyNDA5fQ.O923cGJ8aiEji_E1SzPz5PjD1PsGNhhDB3JTD2M6TP8`
            const response = await axios
                .post("/api/auth/login", {
                    username: self.state.username,
                    password: self.state.password

                });
            const token = response.data;
            sessionStorage.setItem('admin', JSON.stringify(token))

            self.state.loginData = response.data;
            console.log(self.state.loginData);

            commit('login', token);

            console.log('end')

        },

        callCaution() {
            var self = this;
            const token2 = sessionStorage.getItem("admin");
            const token3 = JSON.parse(token2);
            const jwt2 = "JWT ";
            axios.defaults.baseURL = 'http://chaofavc.somprasongd.work:81'
            axios.defaults.headers.common['Authorization'] = jwt2 + token3.token;
            axios
                .get('/api/base/item-cautions')
                .then(function (res) {
                    if (res.status !== 200) {
                        self.state.data = null;
                        return;
                    }
                    self.state.caution = res.data;
                    console.log(self.state.caution);
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });
        },
        callFrequency() {
            var self = this;
            const token2 = sessionStorage.getItem("admin");
            const token3 = JSON.parse(token2);
            const jwt2 = "JWT ";
            axios.defaults.baseURL = 'http://chaofavc.somprasongd.work:81'
            axios.defaults.headers.common['Authorization'] = jwt2 + token3.token;
            axios
                .get('/api/base/item-frequencies')
                .then(function (res) {
                    if (res.status !== 200) {
                        self.state.data = null;
                        return;
                    }
                    self.state.frequency = res.data;
                    console.log(self.state.frequency);
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });
        },
        callInstruction() {
            var self = this;
            const token2 = sessionStorage.getItem("admin");
            const token3 = JSON.parse(token2);
            const jwt2 = "JWT ";
            axios.defaults.baseURL = 'http://chaofavc.somprasongd.work:81'
            axios.defaults.headers.common['Authorization'] = jwt2 + token3.token;
            axios
                .get('/api/base/item-instructions')
                .then(function (res) {
                    if (res.status !== 200) {
                        self.state.data = null;
                        return;
                    }
                    self.state.instruction = res.data;
                    console.log(self.state.instruction);
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });
        },
        callUnit() {
            var self = this;
            const token2 = sessionStorage.getItem("admin");
            const token3 = JSON.parse(token2);
            const jwt2 = "JWT ";
            axios.defaults.baseURL = 'http://chaofavc.somprasongd.work:81'
            axios.defaults.headers.common['Authorization'] = jwt2 + token3.token;
            axios
                .get('/api/base/item-units')
                .then(function (res) {
                    if (res.status !== 200) {
                        self.state.unit = null;
                        return;
                    }
                    self.state.unit = res.data;
                    console.log(self.state.unit);
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });
        },
        callItem() {
            var self = this;
            const token2 = sessionStorage.getItem("admin");
            const token3 = JSON.parse(token2);
            const jwt2 = "JWT ";
            axios.defaults.baseURL = 'http://chaofavc.somprasongd.work:81'
            axios.defaults.headers.common['Authorization'] = jwt2 + token3.token;
            axios
                .get('/api/base/items')
                .then(function (res) {
                    if (res.status !== 200) {
                        self.state.item = null;
                        return;
                    }
                    self.state.item = res.data;
                    console.log(self.state.item);
                })
                .catch(function (error) {
                    console.log("Error:", error);
                });
        }

    },
    mutations: {
        callApi() {
            var self = this;
        },
        snAdd() {
            var self = this;

            self.state.snackbar = true;
            self.state.snColor = 'green';
            self.state.snText = 'Successful !';

        },
        snAddErr() {
            var self = this;

            self.state.snackbar = true;
            self.state.snColor = 'red';
            self.state.snText = 'Unsuccessful !';

        },
        snStop() {
            var self = this;
            self.state.snackbar = false;
        },
        getLogin(state, value) {
            state.username = value.username;
            state.password = value.password;
        },
        login(state, token) {
            state.token = token
            // console.log('--'+state.token);
        }
    }
});