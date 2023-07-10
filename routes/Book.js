var express = require('express');
var router = express.Router();

var bookController = require('../Book/bookController');

//   /book/1
router.get('/book/:id', bookController.bookDetail);
router.get('/books', bookController.bookList);

router.delete('/book/:id', bookController.deleteBook);

//router.get('/*', bookController.bookList);

module.exports = router;