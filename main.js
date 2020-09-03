var burgerButtton = document.getElementById("navMenu");
var navRight = document.getElementById("navRight");

burgerButtton.addEventListener("click",function(){
  navRight.classList.toggle("hidden");
});
