
var burgerButtton = document.getElementById("navMenu");
var navRight = document.getElementById("navRight");


burgerButtton.addEventListener("click", function () {
  navRight.classList.toggle("hidden");
});

const form = document.getElementById('aceptar');

form.addEventListener('submit', function (evento) {
  evento.preventDefault();

  console.log("Boton con evento");
  var link = document.getElementById("link").value;
  console.log(link);

  fetch('https://rel.ink/api/links/',{
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({url: link}),
    credentials: 'same-origin'
  })
  .then((response) => response.json())
  .then((data) => {
    debugger;
  }).catch((error) => {
    console.error('Error from API:', error);
  })

});

// const cardComponent = 

