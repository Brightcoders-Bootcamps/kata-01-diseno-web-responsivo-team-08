
var burgerButtton = document.getElementById("navMenu");
var navRight = document.getElementById("navRight");


burgerButtton.addEventListener("click", function () {
  navRight.classList.toggle("hidden");
});

$('#Aceptar').submit(function (evento) {
  evento.preventDefault();

  console.log("Boton con evento");
  var link = document.getElementById("link").value;
  console.log(link);
  $.ajax({
    url: 'https://rel.ink/api/links/',
    type: 'POST',
    cache: false,
    dataType: "json",
    data: {
      url: link
    },
    success: function (data) {
      console.log(data);
      //$("#tbAlertasArcos").html(datosArcos);
    }, error: function (error) {
      console.log("Aqui esta2");
      console.log(error);
    }
  })
});

