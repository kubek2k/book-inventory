const _ = require("underscore");

module.exports = function() {

  const books = {};

  return {
    findAll: function() {
      return Promise.resolve(_.values(books));
    },
    find: function(isbn) {
      if (books[isbn]) {
        return Promise.resolve(books[isbn]);
      }
      return Promise.resolve(null);
    },
    stockUp: function(isbn, count) {
      books[isbn] = {isbn: isbn, count: count};
      return Promise.resolve();
    }
  };
};
