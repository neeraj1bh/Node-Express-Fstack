const fs = require("fs");
const { mapAsync } = require("./06a-read-dir-callbacks");
// const brokenDirectoryPath = "/home/neeraj/Music";

// fs.readdir(brokenDirectoryPath, function (err, files) {
fs.readdir("./", function (err, files) {
  if (err) return console.error(err);
  mapAsync(files, fs.readFile, (err, results) => {
    if (err) return console.error(err);
    results.forEach((data, i) => console.log(`${files[i]}: ${data.length}`));
    console.log("done!");
  });
});
