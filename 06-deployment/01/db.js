const mongoose = require("mongoose");
mongoose.connect(
  process.env.MONGO_URI || "mongodb://localhost:27017/printshop",
  { useNewUrlParser: true, useCreateIndex: true }
);

// Just to check if connected properly
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (err) => {
    console.log("Error : ", err);
  });

module.exports = mongoose;
