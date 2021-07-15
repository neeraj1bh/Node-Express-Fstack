// Models and Schemas
// With mongoose, we create a model by using mongoose.model() and passing it a name and a schema object.
// A schema maps to a collection, and xit defines the shape of documents within that collection.
// Here’s how we can create the Product collection:
// 04-persistence/01/products.js pg ~ 128

const cuid = require("cuid");
const db = require("./db");
const Product = db.model("Product", {
  _id: { type: String, default: cuid },
  description: String,
  imgThumb: String,
  img: String,
  link: String,
  userId: String,
  userName: String,
  userLink: String,
  tags: { type: [String], index: true },
});

// 04-persistence/01/products.js pg ~ 145

async function get(_id) {
  // This here (findById) is a query and we use exec on a query
  const order = await Order.findById(_id).populate("products").exec();
  return order;
}

async function create(fields) {
  // This below (order) is a document we use execPopulate on a document
  const order = await new Order(fields).save();
  await order.populate("products").execPopulate();
  return order;
}

// Also you can say the document is like a object / row and a collection is like a table

// Think so that all the routes for Users are not yet created

// Use it like this pg ~ 204
// heroku config:set -a node-prod-api \
// MONGO_URI="mongodb+srv://fstack-node:e07830359ef506f574efd22f2ce44a9ea760ec30@cluster0.gle3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority" \
// JWT_SECRET=$(openssl rand -base64 32) \
// ADMIN_PASSWORD=$(openssl rand -base64 32)
//  ›   Warning: heroku update available from 7.56.0 to 7.56.1.
// Setting MONGO_URI, JWT_SECRET, ADMIN_PASSWORD and restarting ⬢ node-prod-api... done, v3
// ADMIN_PASSWORD: Q4JD5zfx+ObOxJ9/HW/XcLiuqhtMSuKMF+I0U7tWrjU=
// JWT_SECRET:     7zvZ65HnU7E1xbgXaeuf9EKk4oBD8R09kRAWeHylJrE=
// MONGO_URI:      mongodb+srv://fstack-node:e07830359ef506f574efd22f2ce44a9ea760ec30@cluster0.gle3e.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// ❯ heroku git:remote -a node-prod-api
//  ›   Warning: heroku update available from 7.56.0 to 7.56.1.
// set git remote heroku to https://git.heroku.com/node-prod-api.git

// ❯ git remote -v
// heroku	https://git.heroku.com/node-prod-api.git (fetch)
// heroku	https://git.heroku.com/node-prod-api.git (push)
// origin	https://github.com/neeraj1bh/Node-Express-Fstack.git (fetch)
// origin	https://github.com/neeraj1bh/Node-Express-Fstack.git (push)

// git push heroku main
// Enumerating objects: 182, done.
// Counting objects: 100% (182/182), done.
// Delta compression using up to 4 threads
// Compressing objects: 100% (172/172), done.
// Writing objects: 100% (182/182), 394.97 KiB | 8.59 MiB/s, done.
// Total 182 (delta 60), reused 4 (delta 0), pack-reused 0

// ❯ curl -sX POST \
// -H 'content-type: application/json' \
// -d '{"username": "admin", "password": "Q4JD5zfx+ObOxJ9/HW/XcLiuqhtMSuKMF+I0U7tWrjU="}' \
// https://node-prod-api.herokuapp.com/login \
// | jq -r .token \
// > admin.jwt

// ❯ curl -X POST \
// -H 'content-type: application/json' \
// -H "authorization: Bearer $(cat admin.jwt)" \
// -d "$(cat products.json | jq '.[1]')" \
// https://node-prod-api.herokuapp.com/products
// {"tags":["pattern","creative","painting","splash","swirl","orange","blue","white","liquid","background"],"_id":"cjv32mizj0001c9gl81zab8vd","description":"Abstract background","imgThumb":"https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjY0MjAxfQ","img":"https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&ixid=eyJhcHBfaWQiOjY0MjAxfQ","link":"https://unsplash.com/photos/0ZPSX_mQ3xI","userId":"IFcEhJqem0Q","userName":"Annie Spratt","userLink":"https://unsplash.com/@anniespratt","__v":0}%

// On localhost when checking logger and stuff in module 06 deployment use

// ❯ curl -sX POST \
// -H 'content-type: application/json' \
// -d '{"username": "admin", "password": "SuperCoolpASSWORD@hARDtOcRaCK#123"}' \
// http://localhost:1337/login

// {"success":true,"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNjI2MzE4NDA1LCJleHAiOjE2Mjg5MTA0MDV9.49NbUcZ89UBb5QgWAz9Uh78OBdm2t0X_EZJHnOtQ7j4"}%
