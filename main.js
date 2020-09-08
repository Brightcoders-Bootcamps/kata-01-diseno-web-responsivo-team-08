var burgerButtton = document.getElementById("navMenu");
var navRight = document.getElementById("navRight");
var btnShorten = document.getElementById("btnShorten");

burgerButtton.addEventListener("click",function(){
  navRight.classList.toggle("hidden");
});

btnShorten.addEventListener("click",function(){
  console.log("Boton con evento");
  var URL = document.getElementById("URL").value;
  console.log(URL);

});


$('#Aceptar').submit(function (evento) {
  evento.preventDefault();
  var warning = $("#filter-warning").is(':checked');
  var info = $("#filter-info").is(':checked');
  var danger = $("#filter-danger").is(':checked');
  var dias = $("#filter-days").val();
  dias = dias === '' ? 0 : +dias;
  $.ajax({
      url: 'listar_autos_interfazPrincipal.htm',
      type: 'POST',
      cache: false,
      contentType: "application/x-www-form-urlencoded; charset=UTF-8;",
      dataType: "json",
      data: {
          warning: warning,
          info: info,
          danger: danger,
          dias: dias},
      success: function (data) {
          
          $("#tbAlertasAutos").html(datos);
          $("#tbAlertasArcos").html(datosArcos);
      }, error: function (error) {
          console.log("Aqui esta2");
          console.log(error);
      }
  });
});
