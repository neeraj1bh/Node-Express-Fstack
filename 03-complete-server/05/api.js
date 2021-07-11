const Products = require("./products");

async function listProducts(req, res) {
  // Try adding this for server-01 and removing for server -02
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  const { offset = 0, limit = 25, tag } = req.query;
  try {
    res.json(
      await Products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag,
      })
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getProduct(req, res, next) {
  // Try adding this for server-01 and removing for server -02
  //   res.setHeader("Access-Control-Allow-Origin", "*");
  const { id } = req.params;
  try {
    const product = await Products.get(id);
    if (!product) return next();
    return res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  listProducts,
  getProduct,
};
