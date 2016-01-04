function handleError(err) {
  console.error(err.stack);
  res.status(err.status || 500).send({});
}

module.exports = function(books) {
  return {
    findAll: function(req, res) {
      books.findAll().
      then(function(books) {
        res.status(200).json(books);
      })
      .catch(handleError);
    },

    find: function(req, res) {
      books.find(req.params.isbn)
      .then(function(book) {
        if (!book) {
          res.status(404).send();
        } else {
          res.status(200).json(book);
        }
      })
      .catch(handleError);
    },

    copiesLeft: function(req, res) {
      books.find(req.params.isbn)
        .then(function(book) {
          res.send('<div>'+ book.count +' </div>');
        })
        .catch(handleError);
    },

    stockUp: function(req, res) {
      console.log("Stocking up " + req.body.isbn + " count = " + req.body.count);
      books.stockUp(req.body.isbn, req.body.count)
      .then(function(result) {
        console.log("Book upserted " + req.body.isbn);
        res.status(200).json({isbn: req.body.isbn, count: req.body.count});
      })
      .catch(handleError);
    },

    notFound: function(req, res, next) {
      res.status(404).send("sorry!");
      next();
    },

    serverError: function(err, req, res, next) {
      console.error(err.stack);
      res.status(err.status || 500).json({error: 'hello'});
    },

    logReq: function(req, res, next) {
      console.log("We've got a req "  + new Date());
      next();
    }
  }
};
