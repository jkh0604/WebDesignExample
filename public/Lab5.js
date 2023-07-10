class PageModel {
	GetBooks(){

        let data = {};
        var xhttp = new XMLHttpRequest();
        let url = `http://localhost:3050/catalog/books`;
        xhttp.open("GET", url, false);
        xhttp.setRequestHeader("Accept", "application/json");
        xhttp.send();
        if (xhttp.status == 200) {
          data = JSON.parse(xhttp.responseText);
        } else {
          //Handle Error
        }
        return data;

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

        this.CreateCards();
	}

    CreateCards() {
        let data = this.pageModel.GetBooks();
        this.pageView.CreateCards(data);
    }
}

const app = new PageController(new PageModel(), new PageView());
