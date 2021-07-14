module.exports = function autoCatch(handlers) {
  console.log("Handlers: ", handlers);
  if (typeof handlers === "function")
    console.log("----> Normally returned as functions handlers: ", handlers);

  if (typeof handlers === "function") return auto(handlers);

  return Object.keys(handlers).reduce((autoHandlers, key) => {
    // console.log("----> autoHandlers: ", autoHandlers);
    // console.log("----> handlers: ", handlers);

    //Think so that here using reduce it is wrapping the handlers into promises if they are objects
    autoHandlers[key] = auto(handlers[key]);
    console.log("----> Wrapped autoHandlers: ", autoHandlers);
    return autoHandlers;
  }, {});
};

function auto(handler) {
  return (req, res, next) =>
    Promise.resolve(handler(req, res, next)).catch(next);
}

// Output:
// ❯ node server-01.js
// Handlers:  {
//   listProducts: [AsyncFunction: listProducts],
//   getProduct: [AsyncFunction: getProduct],
//   createProduct: [AsyncFunction: createProduct],
//   updateProduct: [AsyncFunction: updateProduct],
//   deleteProduct: [AsyncFunction: deleteProduct],
//   createOrder: [AsyncFunction: createOrder],
//   listOrders: [AsyncFunction: listOrders]
// }
// ----> Wrapped autoHandlers:  { listProducts: [Function (anonymous)] }
// ----> Wrapped autoHandlers:  {
//   listProducts: [Function (anonymous)],
//   getProduct: [Function (anonymous)]
// }
// ----> Wrapped autoHandlers:  {
//   listProducts: [Function (anonymous)],
//   getProduct: [Function (anonymous)],
//   createProduct: [Function (anonymous)]
// }
// ----> Wrapped autoHandlers:  {
//   listProducts: [Function (anonymous)],
//   getProduct: [Function (anonymous)],
//   createProduct: [Function (anonymous)],
//   updateProduct: [Function (anonymous)]
// }
// ----> Wrapped autoHandlers:  {
//   listProducts: [Function (anonymous)],
//   getProduct: [Function (anonymous)],
//   createProduct: [Function (anonymous)],
//   updateProduct: [Function (anonymous)],
//   deleteProduct: [Function (anonymous)]
// }
// ----> Wrapped autoHandlers:  {
//   listProducts: [Function (anonymous)],
//   getProduct: [Function (anonymous)],
//   createProduct: [Function (anonymous)],
//   updateProduct: [Function (anonymous)],
//   deleteProduct: [Function (anonymous)],
//   createOrder: [Function (anonymous)]
// }
// ----> Wrapped autoHandlers:  {
//   listProducts: [Function (anonymous)],
//   getProduct: [Function (anonymous)],
//   createProduct: [Function (anonymous)],
//   updateProduct: [Function (anonymous)],
//   deleteProduct: [Function (anonymous)],
//   createOrder: [Function (anonymous)],
//   listOrders: [Function (anonymous)]
// }
// Handlers:  [AsyncFunction: login]
// ----> Normally returned as functions handlers:  [AsyncFunction: login]
// Handlers:  [AsyncFunction: ensureAdmin]
// ----> Normally returned as functions handlers:  [AsyncFunction: ensureAdmin]
// (node:30703) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
// (Use `node --trace-warnings ...` to show where the warning was created)
// Server listening on port 1337
// Connected

// =======================================================

// And here are so many functions that are returned as wrapped because in api.js we export all of them from module.exports and wrapped them in an object like this

// module.exports = autoCatch({
//   listProducts,
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   createOrder,
//   listOrders,
// });

// if we just wrap one how we did in auth.js then it skips the Object.keys way as it is a function

// module.exports = {
//   listProducts: autoCatch(listProducts),
//   getProduct,
//   createProduct,
//   updateProduct,
//   deleteProduct,
//   createOrder,
//   listOrders,
// };

// Output:
// ❯ node server-01.js
// Handlers:  [AsyncFunction: listProducts]
// ----> Normally returned as functions handlers:  [AsyncFunction: listProducts]
// Handlers:  [AsyncFunction: login]
// ----> Normally returned as functions handlers:  [AsyncFunction: login]
// Handlers:  [AsyncFunction: ensureAdmin]
// ----> Normally returned as functions handlers:  [AsyncFunction: ensureAdmin]
// (node:31593) [MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
// (Use `node --trace-warnings ...` to show where the warning was created)
// Server listening on port 1337
// Connected
