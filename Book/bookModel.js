const fs = require('fs');
const path = require('path');
const { hasUncaughtExceptionCaptureCallback } = require('process');

//Typically the model will access a database of some type, but this is omitted in this example for simplicity
class BookModel {
	constructor() {
		this.initialize();
	}

	//initialize the bookList with books
	initialize() {
        this.bookList = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'bookData.json')));
	}

	//return all books
	getAllBooks() {
		return this.bookList;
	}

    getBooksByCategory(category) {
		return this.bookList.filter(item => item.category == category);
    }

	getBookById(bookId) {
		return this.bookList.find(item => item.id == bookId);
	}

	deleteBook(bookId) {
		let book = this.getBookById(bookId);

		this.bookList = this.bookList.filter(item => item.id != bookId);

		return book;
	}

}

module.exports = BookModel;