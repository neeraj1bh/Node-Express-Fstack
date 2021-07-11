const fs = require("fs").promises;
const path = require("path");

const productsFile = path.join(__dirname, "../products.json");

async function list(opts = {}) {
  const { offset, limit, tag } = opts;
  //   const { offset = 0, limit = 25 } = opts;

  const data = await fs.readFile(productsFile);
  return JSON.parse(data)
    .filter((p, i) => {
      //   console.log(!tag, !tag || p.tags.indexOf(tag) >= 0);
      return !tag || p.tags.indexOf(tag) >= 0;
    })
    .slice(offset, offset + limit);
}

module.exports = {
  list,
};
