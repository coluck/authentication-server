/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
var app = new Vue({
  el: "#app",
  data: {
    loggedIn: false,
    username: "",
    email: "",
    password: "",
    error: "",
    accessToken: "",
    refreshToken: "",
  },
  created() {
    let accessToken = localStorage.getItem("access_token");
    let refreshToken = localStorage.getItem("refresh_token");
    if (accessToken || refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.loggedIn = true;
    }
  },
  methods: {
    register() {
      this.error = "";
      if (!(this.username && this.email && this.password))
        return (this.error =
          "username, email and password is required for register");
      axios
        .post("/register", {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.login();
        })
        .catch((err) => {
          this.error = err.response.data;
        });
    },
    login() {
      this.error = "";
      if (!(this.email && this.password))
        return (this.error =
          "username, email and password is required for login");
      axios
        .post("/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.loggedIn = true;
          this.accessToken = res.data.access_token;
          this.refreshToken = res.data.refresh_token;
          localStorage.setItem("access_token", this.accessToken);
          localStorage.setItem("refresh_token", this.refreshToken);
        })
        .catch((err) => {
          this.error = err.response.data;
        });
    },
    refresh() {
      axios
        .post("/token", {
          refresh_token: this.refreshToken,
        })
        .then((res) => {
          this.accessToken = res.data.access_token;
          alert("Access Token refreshed");
          localStorage.setItem("access_token", this.accessToken);
        })
        .catch((err) => {
          this.error = err.response.data;
        });
    },
    logout() {
      localStorage.clear();
      this.loggedIn = false;
      this.accessToken = "";
      this.refreshToken = "";
    },
  },
});
