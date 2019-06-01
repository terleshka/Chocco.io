//полноэкранное меню

const menuOpen = document.getElementById('menuOpen');
const menuModal = document.getElementById('menuModal');
const menuClose = document.getElementById('menuClose');
menuOpen.onclick = function() {
  menuModal.style.display = "flex";
};
menuClose.onclick = function() {
  menuModal.style.display = "none";
};

//аккордеон для секции команда

var acc = document.getElementsByClassName("team__name");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("team__name--active");
  });
}

//слайдер

const left = document.querySelector("#left");
const right = document.querySelector("#right");
const items = document.querySelector("#items");
const firstSlide = document.getElementsByClassName('first-slide');
const secondSlide = document.getElementsByClassName('second-slide');
const firstStep = 0;
const lastStep = document.body.clientWidth;
let currentStep = 0;

items.style.right = currentStep;

right.addEventListener("click", function(){
  // if (currentStep < lastStep){
  //   currentStep = lastStep;
  //   items.style.right = currentStep +'px';
  //   console.log(currentStep);
    firstSlide.style.display = 'flex';
    secondSlide.style.display = 'none';
    console.log(firstSlide);

  
 
});

