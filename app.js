
var express = require('express');
var path = require('path');

var BookRouter = require('./routes/Book');
var BikiniRouter = require('./routes/bikiniBottom');
var publicRouter = require('./routes/public');

var app = express();
app.use(express.urlencoded({extended:true}));

app.use('/catalog/', BookRouter);
app.use('/bikiniBottom/', BikiniRouter);
app.use('/', publicRouter);





const PORT  = process.env.PORT || 3050
app.listen(PORT,()=> console.info(`Server has started on ${PORT}`))


module.exports = app;