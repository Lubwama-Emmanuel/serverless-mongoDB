const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
let conn = null;

module.exports = connectDatabase = async () => {
  if (conn == null) {
    console.log("Creating new connection......");
    conn = await mongoose.set('strictQuery', true).connect(process.env.DB, {
      serverSelectionTimeoutMS: 5000,
    });
    return conn;
  }

  console.log("Connection already established, reusing connection...");
};
