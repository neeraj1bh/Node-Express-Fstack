const Products = require("./products");

async function listProducts(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  try {
    res.json(await Products.list());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listProducts,
};
