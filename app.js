const express = require('express');
const app = express();
const body_parser = require('body-parser');

module.exports = function(books) {

  const resources = require('./resources')(books);

  app.use(resources.logReq);
  app.use(body_parser.json());
  app.use(function(req, res, next) {
    const startTime = Date.now();
    res.on('finish', function() {
      console.log("Request taken " + (Date.now() - startTime) + " milliseconds");
    });
    next();
  });

  app.post("/stock", resources.stockUp);
  app.get("/all", resources.findAll);
  app.get("/book/:isbn", resources.find);
  app.get("/copiesLeft/:isbn", resources.copiesLeft);

  app.use(resources.notFound);
  app.use(resources.serverError);


  return app;
}
