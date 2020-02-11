const express = require("express");
const app = express();
const routes = require("./router/index");

app.use(routes);

module.exports = app
