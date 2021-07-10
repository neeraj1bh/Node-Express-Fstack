const fs = require("fs");
const https = require("https");

const fileUrl = "https://wallpaperaccess.com/full/114522.png";

https.get(fileUrl, (res) => {
  const chunks = [];

  res
    .on("data", (data) => chunks.push(data))
    .on("end", () =>
      fs.writeFile("hokage.png", Buffer.concat(chunks), (err) => {
        if (err) console.error(err);
        console.log("File Saved!");
      })
    );
});
