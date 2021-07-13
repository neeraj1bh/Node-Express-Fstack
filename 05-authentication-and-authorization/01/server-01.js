const express = require("express");
const api = require("./api");
const middleware = require("./middleware");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const sessionSecret = process.env.SESSION_SECRET || "mark nine";
const adminPassword =
  process.env.ADMIN_PASSWORD || "SuperCoolpASSWORD@hARDtOcRaCK#123";

const port = process.env.PORT || 1337;

passport.use(
  new Strategy(function (username, password, callback) {
    const isAdmin = username === "admin" && password === adminPassword;
    if (isAdmin) callback(null, { username: "admin" });
    callback(null, false);
  })
);

function ensureAdmin(req, res, next) {
  const isAdmin = req.user && req.user.username === "admin";
  if (isAdmin) return next();

  res.status(401).json({ error: "Unauthorized" });
}

passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

const app = express();

app.use(middleware.cors);
app.use(express.json());
app.use(cookieParser());
app.use(
  expressSession({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.post("/login", passport.authenticate("local"), (req, res) =>
  res.json({ success: true })
);

// Products endpoints
app.get("/products", api.listProducts);
app.get("/products/:id", api.getProduct);
app.post("/products", ensureAdmin, api.createProduct);
app.put("/products/:id", ensureAdmin, api.updateProduct);
app.delete("/products/:id", ensureAdmin, api.deleteProduct);

// Orders endpoints
app.get("/orders", ensureAdmin, api.listOrders);
app.post("/orders", ensureAdmin, api.createOrder);

app.listen(port, () => console.log(`Server listening on port ${port}`));

// Error handler and Not Found Page handlers
// app.use(middleware.handleValidationError);
app.use(middleware.handleError);
app.use(middleware.notFound);
