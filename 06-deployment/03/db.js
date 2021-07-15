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

module.exports.checkHealth = async function () {
  const time = Date.now();
  const { db } = mongoose.connection;
  const collection = db.collection("healthcheck");

  const query = { _id: "heartbeat" };
  const value = { time };
  await collection.update(query, value, { upsert: true });

  const found = await collection.findOne({ time: { $gte: time } });
  if (!found) throw new Error("DB HealthCheck Failed");
  return !!found;
};
