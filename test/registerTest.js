// run this after loginTest.js

const http = require("http");

const data = JSON.stringify({
  username: "nickname",
  email: "example@mail.com",
  password: "pass123",
});

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/register",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on("data", (d) => {
    process.stdout.write(d);
  });
});

req.on("error", (error) => {
  console.error(error);
});

req.write(data);
req.end();
