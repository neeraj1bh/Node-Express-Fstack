const fs = require("fs").promises;
fs.readdir("./")
  .catch((err) => console.log(err))
  .then((files) => {
    Promise.all(
      files.map((file) =>
        fs
          .readFile(file)
          //   .then((data) => {
          //     console.log(data);
          //     return data;
          //   })
          //   if not modified the result will be just an array of file data
          .then((data) => [file, data.length])
      )
    ).then((results) => {
      results.forEach(([file, length]) => {
        console.log(`${file}: ${length}`);
      });
    });
    console.log("Done!");
  });
