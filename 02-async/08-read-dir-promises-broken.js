const fs = require("fs").promises;
fs.readdir("./")
  .catch((err) => console.log(err))
  .then((files) => {
    files.forEach((file) => {
      fs.readFile(file)
        .catch((err) => console.log(err))
        .then((data) => console.log(`${file}: ${data.length}`));
    });
    console.log("Done!");
  });
