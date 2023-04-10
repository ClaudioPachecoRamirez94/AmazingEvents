//REFERENCIAS
const $cards = document.getElementById('cards');
const $searchCategories = document.getElementById('searchCategories');
const $checkforms = document.getElementById('checkforms');

//DATOS
const cardEvents = data.eventos.filter(event => event.estimate);
let selectedCategories = [];

//CREACION CARTAS
function createCard(cards) {
  let template = '';
  if (cards.length === 0){
      template = "<h4>No hay eventos</h4>";
  }else{
      for (const card of cards) {
          template += `<div class="card" style="width: 18rem">
          <img src="${card.image}" class="card-img-top" alt="foods" />
          <div class="card-body">
              <h5 class="card-title">${card.name}</h5>
              <p class="card-text">${card.description}</p>
          </div>
          <div class="cardfooter">
              <p>Price: ${card.price}</p>
              <a class="btn btn-light" href="./details.html?name=${card.name}">Details</a>
          </div>
          </div>`;
      }
  }
  $cards.innerHTML = template;
}

//CREACION CHECKBOX
function createCheckCategories(category, index) {
    return `<div class="form-check">
    <input class="form-check-input inputsquare" onclick="searchCardsByCategory(event)" type="checkbox" value="${category}" id="check-${index}" />
    <label class="form-check-label" for="check-${index}">${category}</label>
    </div>`;
}

//FUNCIONES DE FILTRO
function filterByCheckbox(events){
    const filteredEventsByCheckbox =  events.filter(event => selectedCategories.includes(event.category));
    if (filteredEventsByCheckbox.length === 0) {
        return events;
    }else{
        return filteredEventsByCheckbox;
    }
}

function filterByText(events, text){
    return events.filter(event => event.name.toLowerCase().includes(text.toLowerCase()));
}

function crossFilter(events, text){
    const filteredByCheckbox = filterByCheckbox(events);
    const filteredByText = filterByText(filteredByCheckbox, text);
    //Retorna las cards filtradas por texto y categoria simultaneamente
    return filteredByText;
}

function searchCardbyText (e) {
    e.preventDefault()
    const textSearch = $searchCategories.value.toLowerCase();
    const filterCards = crossFilter(cardEvents, textSearch);
    createCard(filterCards);
}

function searchCardsByCategory(e) {
    //Captura el texto del checkbox seleccionado
    const category = e.target.value;
    //Buscar si el texto exixte en selected categories
    const index = selectedCategories.indexOf(category);
    if (index === -1) {
        // La categoría no está presente, agregarla
        selectedCategories.push(category);
    } else {
        // La categoría ya está presente, eliminarla
        selectedCategories.splice(index, 1);
    }
    const textSearch = $searchCategories.value.toLowerCase();
    const filterCard = crossFilter(cardEvents, textSearch);
    createCard(filterCard);
}

//mostrar check sin repetir categoria
function extractCategories(){
    //recorre los datos data.js y devuelve todas las categorias aun si estan repetidas
    const categories = cardEvents.map(evento => evento.category)
    //crea un array con las categorias sin repetir ordenadas alfabeticamente (sort)
    const uniqueCategories = Array.from(new Set(categories)).sort();
    //recorrer cada categoria y las imprime en el html
    uniqueCategories.forEach((category, index) => {
        $checkforms.innerHTML += createCheckCategories(category, index)
    })
}

//INICIALIZAR CARGA INICIAL
createCard(cardEvents);
extractCategories();
