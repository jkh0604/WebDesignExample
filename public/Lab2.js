class pageController {

    CreateCards(data) {
        let cards = "";
        data.forEach(item => {
            let card = 
            `<div class="col mb-4">` +
                `<div class="card h-100">` +
                    `<div class="card-body">` +
                        `<div class="card-title">${item.index}</div>` +
                        `<div class="card-title">${item.name}</div>` +
                        `<p class="card-text">${item.desc}</p>` +
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

const app = new pageController();