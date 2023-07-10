const e = require('express');
var BookModel = require('./bookModel');
bookModel = new BookModel();

// return all books.
exports.bookList = function(req, res) {

    console.log(req.query.category);

    let books;

    if (req.query.category)
        books = bookModel.getBooksByCategory(req.query.category);
    else
        books = bookModel.getAllBooks();

    res.send(books);	
};



// return a specific book.
exports.bookDetail = function(req, res) {
	book = bookModel.getBookById(req.params.id);
	res.send(book);
};

exports.deleteBook = function(req, res) {
	book = bookModel.deleteBook(req.params.id);
	res.send(book);
};
