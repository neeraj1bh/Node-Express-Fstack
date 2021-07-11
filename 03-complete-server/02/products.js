const fs = require("fs").promises;
const path = require("path");

const productsFile = path.join(__dirname, "../products.json");

async function list() {
  const data = await fs.readFile(productsFile);
  return JSON.parse(data);
}

module.exports = {
  list,
};
