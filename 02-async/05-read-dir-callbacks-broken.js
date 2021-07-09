const fs = require("fs");
const directoryPath = "./";
// const brokenDirectoryPath = "/home/neeraj/Music";

// fs.readdir(brokenDirectoryPath, (err, fileList) => {
fs.readdir(directoryPath, (err, fileList) => {
  if (err) return console.error(err);

  console.log(fileList);

  fileList.forEach(function (filename) {
    fs.readFile(filename, (err, fileData) => {
      if (err) return console.error(err);

      console.log(`${filename}: ${fileData.length}`);
    });
  });

  console.log("Done!");
});

// const seconds = [5, 2];
// seconds.forEach((s) => {
//   setTimeout(() => console.log(`Waited ${s} seconds`), 1000 * s);
// });
// console.log("done!");
