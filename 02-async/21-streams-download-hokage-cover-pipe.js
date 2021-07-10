const fs = require("fs");
const https = require("https");

const fileUrl = "https://wallpaperaccess.com/full/114522.png";

https.get(fileUrl, (res) => {
  res
    .pipe(fs.createWriteStream("hokage.png"))
    .on("finish", () => console.log("File Saved!"));
});
