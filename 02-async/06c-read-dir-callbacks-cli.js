const fs = require("fs");
const path = require("path");
const { mapAsync } = require("./06a-read-dir-callbacks");

const targetDirectory = process.argv[2] || "./";

getFileLengths(targetDirectory, function (err, results) {
  if (err) return console.error(err);
  results.forEach(([file, length]) => console.log(`${file}: ${length}`));
  console.log("done!");
});

function getFileLengths(dir, cb) {
  fs.readdir(dir, function (err, files) {
    if (err) return cb(err);
    const filePaths = files.map((file) => path.join(dir, file));
    mapAsync(filePaths, readFile, cb);
  });
}

function readFile(file, cb) {
  fs.readFile(file, function (err, fileData) {
    if (err) {
      if (err.code === "EISDIR") return cb(null, [file, 0]);
      return cb(err);
    }
    cb(null, [file, fileData.length]);
  });
}
