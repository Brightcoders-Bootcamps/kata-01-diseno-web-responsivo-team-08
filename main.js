
var burgerButtton = document.getElementById("navMenu");
var navRight = document.getElementById("navRight");
let shortlinks = [sessionStorage.getItem('linksAll')];

burgerButtton.addEventListener("click", function () {
  navRight.classList.toggle("hidden");
});

const form = document.getElementById('aceptar');

form.addEventListener('submit', function (evento) {
  evento.preventDefault();
  var link = document.getElementById("link").value;
  console.log(link);
  if (link == '') {
    alert("Datos ingresados incorrectamente");
  } else {
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
        var mainContainer = document.getElementById("results");
        var idshort = "short-link" + data.hashid;
        var insertHTM = `<div class="one-result">
                          <p class="p-link">${link}</p>
                          <p class="p-link1" id=${idshort}>${shortLink}</p>
                          <button class="btn-start copy-text" id="copy-button${data.hashid}" onClick="myFunction(this)">Copy</button>
                          </div>`;
        mainContainer.insertAdjacentHTML('afterbegin', insertHTM);
        shortlinks.push(insertHTM);
        sessionStorage.setItem('linksAll', shortlinks);
        mostrarDatos();
      }).catch((error) => {
        console.error('Error from API:', error);
      })
  }
});

function mostrarDatos(){
  console.log('entre a mostrar datos');
  var linkss = shortlinks.toString().replace(","," ");
  console.log(linkss);
  var mainContainer = document.getElementById("results");
  mainContainer.insertAdjacentHTML('afterbegin', linkss);
}

// Copy function
function myFunction(button) {
  var idButton = button.id;
  var id = idButton.slice(11);
  navigator.clipboard.writeText('https://rel.ink/' + id);
}

