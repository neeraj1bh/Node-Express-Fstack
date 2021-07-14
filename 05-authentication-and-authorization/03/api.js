const Products = require("./models/products");
const Orders = require("./models/orders");
const autoCatch = require("./lib/auto-catch");

async function listProducts(req, res, next) {
  const { offset = 0, limit = 25, tag } = req.query;
  res.json(
    await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag,
    })
  );
}

async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);
  if (!product) return next();
  return res.json(product);
}

async function createProduct(req, res, next) {
  const product = await Products.create(req.body);
  res.json(product);
}

async function updateProduct(req, res, next) {
  const change = req.body;
  const product = await Products.edit(req.params.id, change);
  res.json(product);
}

async function deleteProduct(req, res, next) {
  const product = await Products.remove(req.params.id);
  res.json({ success: true });
}

async function createOrder(req, res, next) {
  const order = await Orders.create(req.body);
  res.json(order);
}

async function get(_id) {
  const order = await Order.findById(_id).populate("products").exec();
  return order;
}

async function listOrders(req, res, next) {
  const { offset = 0, limit = 25, status, productId } = req.query;

  const orders = await Orders.list({
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status,
  });

  res.json(orders);
}

module.exports = autoCatch({
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createOrder,
  listOrders,
});
