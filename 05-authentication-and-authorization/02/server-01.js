const express = require("express");
const cookieParser = require("cookie-parser");

const api = require("./api");
const auth = require("./auth");
const middleware = require("./middleware");

const port = process.env.PORT || 1337;
const app = express();

app.use(middleware.cors);
app.use(express.json());
app.use(cookieParser());
auth.setMiddleware(app);

app.post("/login", auth.authenticate, auth.login);

// Products endpoints
app.get("/products", api.listProducts);
app.get("/products/:id", api.getProduct);
app.post("/products", ensureAdmin, api.createProduct);
app.put("/products/:id", ensureAdmin, api.updateProduct);
app.delete("/products/:id", ensureAdmin, api.deleteProduct);

// Orders endpoints
app.get("/orders", ensureAdmin, api.listOrders);
app.post("/orders", ensureAdmin, api.createOrder);

// Error handler and Not Found Page handlers
// app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);

app.listen(port, () => console.log(`Server listening on port ${port}`));
