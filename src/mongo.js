const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    mongoose.set("useCreateIndex", true);
  };
  connect();
  const db = mongoose.connection;
  db.once("open", () => console.log("connected to mongodb"));
};
