const fs = require('fs');
const e = require('express');
const path = require("path");
const data = require('./applicationData.json');
var Model = require('./Model');
aModel = new Model();

class Controller{
    constructor(req) {
        this.query = req.query;
        this.url = req.url;
        this.method = req.method;

    }

    getPageApplication()
    {
        let head = `<title>` + data[0].name + `</title>` +
        `<!-- Bootstrap CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css" integrity="sha384-xOolHFLEh07PJGoPkLv1IbcEPTNtaed2xpHsD9ESMhqIYd0nLMwNLD69Npy4HI+N" crossorigin="anonymous">
        <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-Fy6S3B9q64WdZWQUiU+q4/2Lc9npb8tCaSX9FK7E8HnRr0Jz8D6OP9dO5Vg3Q9ct" crossorigin="anonymous"></script>`;
        let body = `<h1>` + data[0].desc + `</h1>`;
        body += `<div id="workspace" style="width: 800px;">
        <div class="card-deck">`;
        for (let i = 1; i < data.length; i++)
        {
            body += `<div class="card" style="width: 18rem;">
            <img src="../images/` + data[i].img +`" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">` + data[i].name + `</h5>
            <p class="card-text">` + data[i].desc + `</p>
            <a href=".` + data[i].url + `" class="btn btn-primary">` + data[i].name + `</a>
            </div>
        </div>`;
        }
        body += `</div>
        </div>`;


        let template = fs.readFileSync(path.resolve(__dirname, 'template.html')).toString();
        template = template.replace("{body}", body);
        template = template.replace("{head}", head);
        return template;
    }

    getContentPage()
    {
        var index = 0;
        for (let i = 0; i < data.length; i++)
        {
            var item = data[i].url == this.url;
            if (item == true)
                index = data[i].index;
        }
        //var item = this.data.find(item => item.url == this.url);
        console.log(index);

        let head = `<title>` + data[index].name + `</title>`;
        let body = `<h1>` + data[index].name + `</h1>` +
        `<img src="../images/` + data[index].img +`" width = "200" height = "250">` +
        `<p><b>“I’m ugly and I’m proud!”</b></p>` +
        `<p>` + data[index].desc + `</p>`;
        if(index == data.length-1)
            body += `<p><a href=".` + data[1].url +`">` + data[1].name + `</a></p>`;
        else
        {
            index += 1;
            body += `<p><a href=".` + data[index].url +`">` + data[index].name + `</a></p>`;
        }
        body += `<p><a href=".` + data[0].url + `">Return to Home</a></p>`;
        let template = fs.readFileSync(path.resolve(__dirname, 'template.html')).toString();
        template = template.replace("{body}", body);
        template = template.replace("{head}", head);
        return template;
    }

    getPageError()
    {
        let template = fs.readFileSync(path.resolve(__dirname, 'template.html')).toString();
        template = template.replace("{head}", "Error 404:");
        template = template.replace("{body}", "The Following Page does NOT exist.");
        return template;
    }

    getPage() {
        if (this.url == data[0].url)
            return this.getPageApplication();
        else
            return this.getContentPage();
    }

}

exports.List = function(req, res) {
    let books;
    books = aModel.getAllCharacters();
    res.send(books);	
};


// return a specific book.
exports.Detail = function(req, res) {
	book = aModel.getCharacterById(req.params.index);
	res.send(book);
};
//module.exports = Controller;