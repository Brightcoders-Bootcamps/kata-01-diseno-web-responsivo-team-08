// Global variables
var burgerButtton = document.getElementById("navMenu");
var navRight = document.getElementById("navRight");
let shortlinks = [sessionStorage.getItem('linksAll')];
const form = document.getElementById('aceptar');

// Burget button expand functionality
burgerButtton.addEventListener("click", function () {
  navRight.classList.toggle("hidden");
});

// Start of API fetch
form.addEventListener('submit', function (evento) {
  evento.preventDefault();
  var link = $('#link').val();
  console.log(link);
  
  if (link == '') { // 'Please add link..' Animation

    document.getElementById('btnShorten').disabled=true;
    $('#link').addClass('errorEvent');
    var error = document.getElementById('errorMessage');
    error.style.display = 'block';
    setTimeout(errorMessages, 3000);

  } else {
    $('#link').removeClass('errorEvent');
    var error = document.getElementById('errorMessage');
    error.style.display = 'none';
    
    //Disable submit button
    document.getElementById('btnShorten').disabled=true;
    
    fetch('https://rel.ink/api/links/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ url: link }),
      credentials: 'same-origin'
    })
      .then((response) => response.json())
      .then((data) => {
        //Enable sumbit button
        document.getElementById('btnShorten').disabled=false;

        console.log(data.hashid);
        var shortLink = 'https://rel.ink/' + data.hashid;
        var mainContainer = document.getElementById('results');
        var idshort = 'short-link' + data.hashid;
        var insertHTM = `<div class="one-result">
                          <div id="first-link">
                          <p class="p-link">${link}</p>
                          </div>
                          <p class="p-link1" id=${idshort}>${shortLink}</p>
                          <button class="btn-start copy-text" id="copy-button${data.hashid}" onClick="copyLink(this)"><p>Copy</p></button>
                          </div>`;
        mainContainer.insertAdjacentHTML('afterbegin', insertHTM);
        shortlinks.push(insertHTM);
        sessionStorage.setItem('linksAll', shortlinks);
      }).catch((error) => {
        console.error('Error from API:', error);
      })
  }
});

// Save results on refresh functionality
window.addEventListener('load', function(event) {
  var linkss = shortlinks.toString().replace(',',' ');
  console.log(linkss);
  var mainContainer = document.getElementById('results');
  mainContainer.insertAdjacentHTML('afterbegin', linkss);
});

// Copy function
const copyLink = (button) => {
  const idButton = button.id;
  const id = idButton.slice(11);
  const buttonTag = document.getElementById(idButton);
  navigator.clipboard.writeText('https://rel.ink/' + id);
  addStyles(buttonTag);
};

// Copy button, change word
function addStyles(buttonTag){
  buttonTag.innerHTML = 'Copied!';
}

// Used for 'Please add link...'
function errorMessages(){
  $('#link').removeClass('errorEvent');
  var error = document.getElementById('errorMessage');
  error.style.display = 'none';
  document.getElementById('btnShorten').disabled=false;
}

