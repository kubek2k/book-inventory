const app = require('./app')
const books = require('./books')

const server = app(books).listen(parseInt(process.env.PORT || '3001'), function() {
  console.log("applicatin listening on " + process.env.PORT);
});
