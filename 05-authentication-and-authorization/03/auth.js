const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const jwt = require("jsonwebtoken");

const autoCatch = require("./lib/auto-catch");

const jwtSecret = process.env.SESSION_SECRET || "mark nine";
const adminPassword =
  process.env.ADMIN_PASSWORD || "SuperCoolpASSWORD@hARDtOcRaCK#123";
const jwtOpts = { algorithm: "HS256", expiresIn: "30d" };

passport.use(adminStrategy());
const authenticate = passport.authenticate("local", { session: false });

async function login(req, res, next) {
  console.log(req.user.username);
  const token = await sign({ username: req.user.username });
  console.log(token);
  res.cookie("jwt", token, { httpOnly: true });
  res.json({ success: true, token: token });
}

async function sign(payload) {
  const token = await jwt.sign(payload, jwtSecret, jwtOpts);
  return token;
}

function adminStrategy() {
  return new Strategy(function (username, password, callback) {
    const isAdmin = username === "admin" && password === adminPassword;
    if (isAdmin) return callback(null, { username: "admin" });

    callback(null, false);
  });
}

async function ensureAdmin(req, res, next) {
  const jwtString = req.headers.authorization || req.cookies.jwt;
  const payload = await verify(jwtString);
  if (payload.username === "admin") return next();

  const err = new Error("Unauthorized");
  err.statusCode = 401;
  next(err);
}

async function verify(jwtString = "") {
  jwtString = jwtString.replace(/^Bearer /i, "");
  try {
    const payload = await jwt.verify(jwtString, jwtSecret);
    return payload;
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }
}

module.exports = {
  authenticate,
  login: autoCatch(login),
  ensureAdmin: autoCatch(ensureAdmin),
};
