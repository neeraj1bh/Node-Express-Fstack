const express = require("express");
const api = require("./api");
const middleware = require("./middleware");

const port = process.env.PORT || 1337;

const app = express();

app.use(middleware.cors);
app.use(express.json());
app.get("/products", api.listProducts);
app.post("/products", api.createProduct);
app.get("/products/:id", api.getProduct);
app.put("/products/:id", api.updateProduct);
app.delete("/products/:id", api.deleteProduct);
app.listen(port, () => console.log(`Server listening on port ${port}`));
app.use(middleware.handleError);
app.use(middleware.notFound);
