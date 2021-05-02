// npm run dbtest
require("dotenv").config();

const mongoose = require("mongoose");

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.log(error);
  }
};

testConnection();

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("  Successfully connected to MongoDB.");
  console.log("  Connection string:", connection._connectionString);
  process.exit();
});
