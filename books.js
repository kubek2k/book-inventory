
const MongoClient = require('mongodb').MongoClient
// Connection URL
const url = process.env.MONGOLAB_URI
// Use connect method to connect to the Server

const collection = MongoClient.connect(url).then(function(db) {
  return db.collection('books');
})

function stockUp(isbn, count) {
  return collection.then(function(collection) {
    return collection.updateOne({isbn: isbn},
                                {$set: {isbn: isbn, count: count}},
                                {upsert: true});
  });
}

function mapFromDb(books) {
  return books.map(mapBookFromDb);
}

function mapBookFromDb(book) {
  if (book) {
    return {isbn: book["isbn"], count: book["count"]};
  } else {
    return book;
  }
}

function findAll() {
  return collection.then(function(collection) {
    return collection.find().toArray();
  })
  .then(mapFromDb);
}

function find(isbn) {
  return collection
    .then(function(collection) {
            return collection.find({isbn: isbn}).limit(1).next();
    })
    .then(mapBookFromDb);
}

module.exports = {
  stockUp: stockUp,
  findAll: findAll,
  find: find
}
