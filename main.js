
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

  fetch('https://rel.ink/api/links/', {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify({ url: link }),
    credentials: 'same-origin'
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.hashid);
      var shortLink = 'https://rel.ink/' + data.hashid;
      var mainContainer = document.getElementById("one-result");
      var idshort = "short-link" + data.hashid;
      mainContainer.insertAdjacentHTML('afterbegin', `<div id="one-result">
      <p class="p-link">${link}</p>
      <p class="p-link1" id=${idshort}>${shortLink}</p>
      <button class="btn-start" id="copy-button${data.hashid}" onClick="myFunction(this)">Copy text</button></div>`)
    }).catch((error) => {
      console.error('Error from API:', error);
    })
});

// Copy function
function myFunction(button) {
  var idButton = button.id;
  var id = idButton.slice(11);
  navigator.clipboard.writeText('https://rel.ink/' + id);
}

