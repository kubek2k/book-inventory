const app = require('./app')
const books = require('./books')

const server = app(books).listen(3000, function() {
  console.log("applicatin listening on 3000");
});
