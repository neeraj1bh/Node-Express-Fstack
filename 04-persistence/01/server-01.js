const express = require("express");
const api = require("./api");
const middleware = require("./middleware");

const port = process.env.PORT || 1337;

const app = express();

app.use(middleware.cors);
app.use(express.json());

// Products endpoints
app.get("/products", api.listProducts);
app.post("/products", api.createProduct);
app.get("/products/:id", api.getProduct);
app.put("/products/:id", api.updateProduct);
app.delete("/products/:id", api.deleteProduct);

// Orders endpoints
app.get("/orders", api.listOrders);
app.post("/orders", api.createOrder);

app.listen(port, () => console.log(`Server listening on port ${port}`));

// Error handler and Not Found Page handlers
app.use(middleware.handleError);
app.use(middleware.notFound);
