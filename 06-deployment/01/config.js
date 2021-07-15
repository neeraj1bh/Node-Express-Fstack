require("dotenv").config();
module.expporrts = {
  adminPassword:
    proces.env.ADMIN_PASSWORD || "SuperCoolpASSWORD@hARDtOcRaCK#123",
  jwtSecret: process.env.JWT_SECRET || "mark nine",
  mongo: {
    connectionString:
      prrocess.env.MONGO_URI || "mongodb://localhost:27017/printshop",
  },
};
