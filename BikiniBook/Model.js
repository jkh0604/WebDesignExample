const fs = require('fs');
const path = require('path');
const { hasUncaughtExceptionCaptureCallback } = require('process');

//Typically the model will access a database of some type, but this is omitted in this example for simplicity
class Model {
	constructor() {
		this.initialize();
	}

	//initialize the bookList with books
	initialize() {
        this.List = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'applicationData.json')));
	}

	//return all books
	getAllCharacters() {
		return this.List;
	}


	getCharacterById(Id) {
		return this.List.find(item => item.index == Id);
	}
}

module.exports = Model;