const fs = require("fs");
const csv = require("csv-parser");
const { Transform } = require("stream");

fs.createReadStream("24-csv-file.csv")
  .pipe(csv())
  .pipe(clean())
  .on("data", (row) => console.log(JSON.stringify(row)));

function clean() {
  return new Transform({
    // objectMode: true,
    transform(row, encoding, callback) {
      callback(null, row);
    },
  });
}
