require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRouter = require("./src/authRouter");
const initMongo = require("./src/mongo");

const app = express();

app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan("tiny"));
app.use(express.json());
app.get("/favicon.ico", (req, res) => res.status(204));

app.use(express.static("./src/public"));
app.use("/", authRouter);

const start = () => {
  initMongo();
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () =>
    console.log(`\nauthentication-server started on http://localhost:${PORT}`)
  );
};

app.start = start;

if (require.main === module) app.start();

module.exports = app;
