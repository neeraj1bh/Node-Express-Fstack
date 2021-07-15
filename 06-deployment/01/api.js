const Products = require("./models/products");
const Orders = require("./models/orders");
const Users = require("./models/users");
const autoCatch = require("./lib/auto-catch");

async function createUser(req, res, next) {
  const user = await Users.create(req.body);
  const { username, email } = user;
  res.json({ username, email });
}

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
  if (!req.isAdmin) return forbidden(next);
  const product = await Products.create(req.body);
  res.json(product);
}

function forbidden(next) {
  const err = new Error("Forbidden");
  err.statusCode = 403;
  return next(err);
}

async function updateProduct(req, res, next) {
  if (!req.isAdmin) return forbidden(next);
  const change = req.body;
  const product = await Products.edit(req.params.id, change);
  res.json(product);
}

async function deleteProduct(req, res, next) {
  if (!req.isAdmin) return forbidden(next);
  const product = await Products.remove(req.params.id);
  res.json({ success: true });
}

async function createOrder(req, res, next) {
  const fields = req.body;
  if (!req.isAdmin) fields.username = req.user.username;
  const order = await Orders.create(fields);
  res.json(order);
}

async function get(_id) {
  const order = await Order.findById(_id).populate("products").exec();
  return order;
}

async function listOrders(req, res, next) {
  const { offset = 0, limit = 25, status, productId } = req.query;
  const opts = {
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status,
  };

  if (!req.isAdmin) opts.username = req.user.username;
  const orders = await Orders.list(opts);

  res.json(orders);
}

function homePage(req, res, next) {
  res.json("Api started");
}

module.exports = autoCatch({
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  createOrder,
  listOrders,
  createUser,
  homePage,
});
