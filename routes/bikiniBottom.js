var express = require('express');
var router = express.Router();
//const path = require("path");

var labController = require('../BikiniBook/Controller');

router.get('/character/:index', labController.Detail);
router.get('/character', labController.List);

/*
router.get('/', function(req, res, next) {
    //res.sendFile(path.resolve('public/applications.html') );
    labController = new LabController(req);
    html = labController.getPage();
    res.send(html);
}); */

/*router.get('/*', function(req, res, next) {
    labController = new LabController(req);
    html = labController.getPage();
    res.send(html);
}); */



module.exports = router;