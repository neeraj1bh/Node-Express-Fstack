const fs = require("fs");
const https = require("https");

const fileUrl = "https://wallpaperaccess.com/full/114522.png";

https.get(fileUrl, (res) => {
  const fileStream = fs.createWriteStream("hokage.png");

  res
    .on("data", (data) => fileStream.write(data))
    .on("end", () => fileStream.end());
  console.log("File Saved!");
});
