//1.- REFERENCIAS
const $cards = document.getElementById('cards');
const $searchCategories = document.getElementById('searchCategories');
const $checkforms = document.getElementById('checkforms');

//2.- DATOS
const cardEvents = data.eventos;
let selectedCategories = [];

//3.-CREACION DE ELEMENTOS
//(crea cartas)
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
                <a class="btn btn-light" href="./assets/pages/details.html?name=${card.name}">Details</a>
            </div>
            </div>`;
        }
    }
    $cards.innerHTML = template;
}

//(crea html checkbox)
function createCheckCategories(category, index) {
    return `<div class="form-check">
    <input class="form-check-input inputsquare" onclick="searchCardsByCategory(event)" type="checkbox" value="${category}" id="check-${index}" />
    <label class="form-check-label" for="check-${index}">${category}</label>
    </div>`;
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

//5.- FUNCIONES DE FILTRO

//5.3
function filterByCheckbox(events){
    const filteredEventsByCheckbox =  events.filter(event => selectedCategories.includes(event.category));
    if (filteredEventsByCheckbox.length === 0) {
        return events;
    }else{
        return filteredEventsByCheckbox;
    }
}


//5.4
function filterByText(events, text){
    return events.filter(event => event.name.toLowerCase().includes(text.toLowerCase()));
}

//5.2 
function crossFilter(events, text){
    const filteredByCheckbox = filterByCheckbox(events);
    const filteredByText = filterByText(filteredByCheckbox, text);
    //Retorna las cards filtradas por texto y categoria simultaneamente
    return filteredByText;
}

//5.1.-se ejecuta el primer filtro que se use
function searchCardbyText (e) {
    e.preventDefault()
    const textSearch = $searchCategories.value.toLowerCase();
    const filterCards = crossFilter(cardEvents, textSearch);
    createCard(filterCards);
}
 //5.1 se ejecuta el primer filtro que se use
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

//4.- INICIALIZAR CARGA INICIAL
createCard(cardEvents);
extractCategories();
