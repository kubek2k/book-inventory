const express = require('express');
const app = express();
const body_parser = require('body-parser');

module.exports = function(books) {

  const resources = require('./resources')(books);

  app.use(resources.logReq);
  app.use(body_parser.json());

  app.post("/stock", resources.stockUp);
  app.get("/all", resources.findAll);
  app.get("/book/:isbn", resources.find);

  app.use(resources.notFound);
  app.use(resources.serverError);

  return app;
}
