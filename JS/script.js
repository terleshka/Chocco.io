//полноэкранное меню

const menuOpen = document.getElementById('menuOpen');
const menuModal = document.getElementById('menuModal');
const menuClose = document.getElementById('menuClose');
menuOpen.onclick = function () {
  menuModal.style.display = "flex";
};
menuClose.onclick = function () {
  menuModal.style.display = "none";
};

//аккордеон для секции команда

var acc = document.getElementsByClassName("team__name");

for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("team__name--active");
  });
}

//аккордеон для секции меню
const accordion = document.querySelector('.accordion');
var currentActiveItem;

accordion.classList.add('accordion');
accordion.addEventListener('click', function (e) {
  if (e.target.classList.contains('accordion__title') || e.target.classList.contains('accordion__link')) {
    if (currentActiveItem) {
      currentActiveItem.classList.remove('accordion__item--active');
      if (currentActiveItem == e.target.parentNode.parentNode || currentActiveItem == e.target.parentNode) {
        currentActiveItem = 0;
        return;
      }
    }

    if (e.target.classList.contains('accordion__title')) {
      currentActiveItem = e.target.parentNode.parentNode;
    } else {
      currentActiveItem = e.target.parentNode;
    }
    currentActiveItem.classList.add('accordion__item--active');
  }
});

//слайдер с батончиками

const left = document.querySelector("#left");
const right = document.querySelector("#right");
const items = document.querySelector("#items");
const slider = document.querySelector('.slider');
const computedSlider = getComputedStyle(slider);
const computedItems = getComputedStyle(items);
var slideInterval = setInterval(rightClickTimer, 8000);

const firstStep = 0;
const step = parseInt(computedSlider.width);
const lastStep = parseInt(computedItems.width);
let currentStep = 0;
items.style.right = currentStep;


function rightClickTimer() {
  if (currentStep < lastStep - step) {
    currentStep += step;
    items.style.right = currentStep + "px";
    return;
  }
  if (currentStep == lastStep - step) {
    currentStep = 0;
    items.style.right = currentStep + "px";
  }
}

right.addEventListener("click", function (e) {
  e.preventDefault();
  rightClickTimer();
});

left.addEventListener("click", function (e) {
  e.preventDefault();
  if (currentStep > firstStep) {
    currentStep -= step;
    items.style.right = currentStep + "px";
    return;
  }
  if (currentStep == firstStep) {
    currentStep = lastStep - step;
    items.style.right = currentStep + "px";
  }
});

//слайдер с отзывами

const feedbackSliderOne = document.querySelector('.slider_one');
const feedbackSliderTwo = document.querySelector('.slider_two');
const feedbackSliderThree = document.querySelector('.slider_three');

const avatarOne = document.querySelector('.avatar_one');
const avatarTwo = document.querySelector('.avatar_two');
const avatarThree = document.querySelector('.avatar_three');
let numClick = 1;
var slideInterval_1 = setInterval(autoClick, 6000);

autoClick();

function deleteClassActive() {
  for (let i = 0; i < document.querySelectorAll('.avatar__img').length; i++) {
    document.querySelectorAll('.avatar__img')[i].classList.remove('avatar__img_active');
    document.querySelectorAll('.feedback__slider')[i].classList.remove('feedback__slider--active');
  }
}

function autoClick() {
  deleteClassActive();
  switch (numClick) {
    case 1: feedbackSliderOne.classList.add('feedback__slider--active');
      avatarOne.classList.add('avatar__img_active');
      numClick++;
      break;
    case 2: feedbackSliderTwo.classList.add('feedback__slider--active');
      avatarTwo.classList.add('avatar__img_active');
      numClick++;
      break;
    case 3:
      feedbackSliderThree.classList.add('feedback__slider--active');
      avatarThree.classList.add('avatar__img_active');
      numClick = 1;
      break;
  }
}


avatarOne.addEventListener('click', function (e) {
  numClick = 1;
  autoClick();
});

avatarTwo.addEventListener('click', function (e) {
  numClick = 2;
  autoClick();
});

avatarThree.addEventListener('click', function (e) {
  numClick = 3;
  autoClick();
});

// Отправка формы

const form = document.querySelector('.form');
const send = document.querySelector('.form__submit');
const modal = document.querySelector('.modal');
const modalText = document.querySelector('.modal__title');
const modalExit = document.querySelector('.modal__btn');
const modalWindow = document.querySelector('.modal__window');


send.addEventListener('click', function (e) {
  e.preventDefault();
  let formData = new FormData();

  if (validateForm(form)) {

    formData.append("name", form.elements.name.value);
    formData.append("phone", form.elements.phone.value);
    formData.append("comment", form.elements.comment.value);
    formData.append("to", "vika-terleckaya@mail.ru");

    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('POST', 'https://webdev-api.loftschool.com/sendmail/');
    xhr.setRequestHeader("X-Requested-Width", "XMLHttpRequest");
    xhr.send(formData);
    xhr.addEventListener('load', () => {
      if (xhr.response.status) {
        console.log(xhr.response);
        modal.style.display = "block";
        modalWindow.style.opacity = "1";
        document.body.style.overflow = "hidden";
        modalText.textContent = "Сообщение отправлено";
      } else {
        modal.style.display = "block";
        modalWindow.style.opacity = "1";
        document.body.style.overflow = "hidden";
        modalText.textContent = "Ошибка отправки";

      }
    });
  }
});
modalExit.addEventListener('click', function(e){
  e.preventDefault();
  modal.style.display = 'none';
  document.body.style.overflow = "auto";
  
});
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
   
  }
}

function validateForm(form) {
  let valid = true;

  if (!validateField(form.elements.name)) {
    valid = false;
  }
  if (!validateField(form.elements.phone)) {
    valid = false;
  }
  if (!validateField(form.elements.comment)) {
    valid = false;
  }
  return valid;
}

function validateField(field) {
  field.nextElementSibling.textContent = field.validationMessage;
  return field.checkValidity();

}