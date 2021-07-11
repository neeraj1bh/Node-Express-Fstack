const fs = require("fs").promises;
const path = require("path");

const productsFile = path.join(__dirname, "../products.json");

async function list(opts = {}) {
  const { offset, limit } = opts;
  //   const { offset = 0, limit = 25 } = opts;

  const data = await fs.readFile(productsFile);
  return JSON.parse(data).slice(offset, offset + limit);
}

module.exports = {
  list,
};
