const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const expressSession = require("express-session");

const sessionSecret = process.env.SESSION_SECRET || "mark nine";
const adminPassword =
  process.env.ADMIN_PASSWORD || "SuperCoolpASSWORD@hARDtOcRaCK#123";

passport.use(adminStrategy());
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
const authenticate = passport.authenticate("local");

function setMiddleware(app) {
  app.use(session());
  app.use(passport.initialize());
  app.use(passport.session());
}

function login(req, res, next) {
  res.json({ success: true });
}

function adminStrategy() {
  return new Strategy(function (username, password, callback) {
    const isAdmin = username === "admin" && password === adminPassword;
    if (isAdmin) callback(null, { username: "admin" });

    callback(null, false);
  });
}

function ensureAdmin(req, res, next) {
  const isAdmin = req.user && req.user.username === "admin";
  if (isAdmin) return next();

  const err = new Error("Unauthorized");
  err.statusCode = 401;
  next(err);
}

function session() {
  return expressSession({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  });
}

module.exports = {
  setMiddleware,
  authenticate,
  login,
  ensureAdmin,
};
