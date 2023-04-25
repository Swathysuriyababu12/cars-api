const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongodb");
  } catch (error) {
    throw error;
    process.exit();
  }
};
module.exports = connect;
