class PageModel {
	SendGetBooksRequest(){

        console.log("Check Point 1");
        let data = {};
        var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
                console.log("Check Point 2");

                this.books = JSON.parse(this.responseText);
				
				const element = document.querySelector('#root');
				let event = new CustomEvent('GetBookData', {detail:this.books});
				element.dispatchEvent(event);
			}
		};
        console.log("Check Point 3");
        let url = `http://localhost:3050/catalog/books`;
        xhttp.open("GET", url, false);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.send();

        console.log("Check Point 4");

	}
}

class PageView {

    CreateCards(data) {
        let cards = "";
        data.forEach(item => {
            let card = 
            `<div class="col mb-4">` +
                `<div class="card h-100">` +
                    `<div class="card-body">` +
                        `<div class="card-title">${item.id}</div>` +
                        `<div class="card-title">${item.name}</div>` +
                        `<p class="card-text">${item.author}</p>` +
                    `</div>` +
                `</div>` +
            `</div>`;
            cards += card;    
        });

        let template = 
        `<div class="row row-cols-4 row-cols-md-4">` +
            `${cards}` +
        `</div>` 

        let root = document.querySelector('#root');
        root.innerHTML = template;
    }

}



class PageController {
    constructor(pageModel, pageView) {
        this.pageModel = pageModel;
        this.pageView = pageView;

		const element = document.querySelector('#root');
		element.addEventListener('GetBookData', function(event) {
			app.HandleBookData(event.detail);
		});

	}

    CreateCards() {
        let data = this.pageModel.SendGetBooksRequest();
    }

    HandleBookData(data) {
        this.pageView.CreateCards(data);
    }
}

const app = new PageController(new PageModel(), new PageView());
app.CreateCards();