const $cards = document.getElementById('cards');
const cardEvents = data.eventos;
let template = '';

for (const evento of cardEvents) {
  template += createCard(evento);
}

$cards.innerHTML = (template);

function createCard(card) {
    return `<div class="card" style="width: 18rem">
            <img src="${card.image}" class="card-img-top" alt="foods" />
            <div class="card-body">
                <h5 class="card-title">${card.name}</h5>
                <p class="card-text">${card.description}</p>
            </div>
            <div class="cardfooter">
                <p>Price: ${card.price}</p>
                <a class="btn btn-light" href="./assets/pages/details.html">Details</a>
            </div>
        </div>`;
}
