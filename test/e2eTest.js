const request = require('supertest')
const books = require('../inMemoryBooks')()
const app = require('../app')(books)
const _ = require('underscore')

describe("Created book", function() {
  it('saves and returns json', function(done) {
    request(app)
      .post('/stock')
      .set('Content-Type', 'application/json')
      .send({isbn: "abcd", count: 10})
      .expect(200, {isbn: "abcd", count: 10}, done);
  });

  it('book is findable by isbn', function(done) {
     request(app)
       .get('/book/abcd')
       .send()
       .expect(200, {isbn: "abcd", count: 10}, done);
  });

  it('book can be found in all books', function(done) {
     request(app)
       .get('/all')
       .send()
       .expect(200)
       .expect(function(res) {
         const books = res.body;
         return _.find(books, function(b) { return b.isbn === "abcd"; });
       })
       .end(done);
  });
});

describe("Non existing book", function() {
  it('can\'t be found by isbn', function(done) {
    request(app)
      .get("/books/efgh")
      .expect(404, done);
  });

  it ('can\'t be found in all books', function(done) {
    request(app)
      .get("/all")
      .expect(200)
      .expect(function(res) {
        return _.filter(res.body, function(b) { return b.isbn === "efgh"; }).length == 0;
      })
      .end(done);
  });
});
