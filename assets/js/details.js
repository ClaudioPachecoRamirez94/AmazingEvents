const $eventsdetail = document.getElementById('eventsdetail');
const urlParams = location.search;
const params = new URLSearchParams(urlParams);
const eventName = params.get("name");
const evento = data.eventos.filter((evento) => evento.name == eventName);

function printEventDetails(evento) {
  let card = "";
  if (evento.estimate) {
    card = `<div class="row g-0">
    <div class="imgDetails col-md-4">
      <img src="${evento.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3>Name: "${evento.name}"</h3>
        <h3>Date: "${evento.date}"</h3>
        <h3>Description: "${evento.description}"</h3>
        <h3>Category: "${evento.category}"</h3>
        <h3>Place: "${evento.place}"</h3>
        <h3>Capacity: "${evento.capacity}"</h3>
        <h3>Estimate: "${evento.estimate}"</h3>
        <h3>Price: "${evento.price}"</h3>
      </div>
    </div>
  </div>`;
  } else {
    card = `<div class="row g-0">
    <div class="imgDetails col-md-4">
      <img src="${evento.image}" class="image img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h3>Name: "${evento.name}"</h3>
        <h3>Date: "${evento.date}"</h3>
        <h3>Description: "${evento.description}"</h3>
        <h3>Category: "${evento.category}"</h3>
        <h3>Place: "${evento.place}"</h3>
        <h3>Capacity: "${evento.capacity}"</h3>
        <h3>Assistance: "${evento.assistance}"</h3>
        <h3>Price: "${evento.price}"</h3>
      </div>
    </div>
  </div>`;
  }
  $eventsdetail.innerHTML = card;
}

printEventDetails(evento[0]);
