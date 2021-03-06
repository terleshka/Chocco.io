//полноэкранное меню

const menuOpen = document.getElementById('menuOpen');
const menuModal = document.getElementById('menuModal');
const menuClose = document.getElementById('menuClose');
menuOpen.onclick = function () {
  menuModal.style.display = "flex";
  document.body.style.overflow = "hidden";
};
menuClose.onclick = function () {
  menuModal.style.display = "none";
  document.body.style.overflow = "auto";
};

//аккордеон для секции команда

var acc = document.getElementsByClassName("team__name");

for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    this.classList.toggle("team__name--active");
  });
}

//аккордеон для секции меню


var currentActiveItem;
var screenWidth = (screen.width);//ширина окна браузера также используется в плеере


$('.accordion__item').on('click', function (e) {
  if ($(this).hasClass('accordion__item--active')) {
    $(this).removeClass('accordion__item--active');
    if (screenWidth <= 480) {
      $('.accordion__item').css('display', 'flex');
    }
  } else {
    $('.accordion__item').removeClass('accordion__item--active');
    $(this).addClass('accordion__item--active');
    if (screenWidth <= 480) {
      $('.accordion__item').each(function (index) {
        if ($(this).hasClass('accordion__item--active')) {
          console.log('000');
  
        } else {
          console.log('111')
          $(this).css('display', 'none');

        }
      });
    }
  }
});



//слайдер с батончиками

const left = $('#left');
const right = $('#right');
const items = $('#items');
const slider = $('.slider');
var slideInterval = setInterval(rightClickTimer, 8000);

const firstStep = 0;
const step = slider.width();
const lastStep = items.width();
let currentStep = 0;
items.css('right', currentStep);


function rightClickTimer() {
  if (currentStep < lastStep - step) {
    currentStep += step;
    items.css('right', currentStep + "px");
    return;
  }
  if (currentStep == lastStep - step) {
    currentStep = 0;
    items.css('right', currentStep + "px");
  }
}

right.on("click", function (e) {
  e.preventDefault();
  rightClickTimer();
});

left.on("click", function (e) {
  e.preventDefault();
  if (currentStep > firstStep) {
    currentStep -= step;
    items.css('right', currentStep + "px");
    return;
  }
  if (currentStep == firstStep) {
    currentStep = lastStep - step;
    items.css('right', currentStep + "px");
  }
});

//слайдер с отзывами

const feedbackSliderOne = $('.slider_one');
const feedbackSliderTwo = $('.slider_two');
const feedbackSliderThree = $('.slider_three');

const avatarOne = $('.avatar_one');
const avatarTwo = $('.avatar_two');
const avatarThree = $('.avatar_three');
let numClick = 1;
var slideInterval_1 = setInterval(autoClick, 6000);

autoClick();

function deleteClassActive() {

  $('.avatar__img').removeClass('avatar__img_active');
  $('.feedback__slider').removeClass('feedback__slider--active');

}

function autoClick() {
  deleteClassActive();
  switch (numClick) {
    case 1: feedbackSliderOne.addClass('feedback__slider--active');
      avatarOne.addClass('avatar__img_active');
      numClick++;
      break;
    case 2: feedbackSliderTwo.addClass('feedback__slider--active');
      avatarTwo.addClass('avatar__img_active');
      numClick++;
      break;
    case 3:
      feedbackSliderThree.addClass('feedback__slider--active');
      avatarThree.addClass('avatar__img_active');
      numClick = 1;
      break;
  }
}


avatarOne.on('click', function (e) {
  numClick = 1;
  autoClick();
});

avatarTwo.on('click', function (e) {
  numClick = 2;
  autoClick();
});

avatarThree.on('click', function (e) {
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
modalExit.addEventListener('click', function (e) {
  e.preventDefault();
  modal.style.display = 'none';
  document.body.style.overflow = "auto ";

});
window.onclick = function (event) {
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


//подключение яндекс-карт

ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
    center: [59.941861, 30.321988],
    zoom: 13

  });
  myMap.behaviors.disable('scrollZoom')
  MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
    '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
  ),
    myPlacemark = new ymaps.Placemark([59.943477, 30.324360], {
      hintContent: 'CHOCCO',
      balloonContent: 'график: пн-пт, выходные: сб,вс <br> часы работы: с 10-00 до 18-00',
    }, {
        iconLayout: 'default#imageWithContent',
        iconImageHref: './images/map/marker.png',
        iconImageSize: [46, 57],
        iconImageOffset: [-24, -24],
        iconContentLayout: MyIconContentLayout
      })
  myPlacemark2 = new ymaps.Placemark([59.932323, 30.303289], {
    hintContent: 'CHOCCO',
    balloonContent: 'график: пн-пт, выходные: сб,вс <br> часы работы: с 10-00 до 18-00',
  }, {
      iconLayout: 'default#imageWithContent',
      iconImageHref: './images/map/marker.png',
      iconImageSize: [46, 57],
      iconImageOffset: [-24, -24],
      iconContentLayout: MyIconContentLayout
    })
  myMap.geoObjects
    .add(myPlacemark)
    .add(myPlacemark2)
})

// скролл для секций

const sections = $('.section');
const display = $('.maincontent');
let inscroll = false;

const md = new MobileDetect(window.navigator.userAgent);
const isMobile = md.mobile();

const switchActiveClassSideMenu = navLinkIndex => {
  $('.nav__link')
    .eq(navLinkIndex)
    .addClass('nav__link--active')
    .siblings()
    .removeClass('nav__link--active');

}

const performTransition = sectionEq => {
  if (inscroll)
    return;

  const transitionDuration = 0;
  const endOfInertion = 300;

  inscroll = true;

  const position = `${sectionEq * -100}%`;

  sections
    .eq(sectionEq)
    .addClass('active')
    .siblings()
    .removeClass('active');

  display.css({
    transform: `translateY(${position})`
  });

  setTimeout(() => {
    switchActiveClassSideMenu(sections)
    inscroll = false;

  }, transitionDuration + endOfInertion);



};

const scrollToSection = direction => {
  const activeSection = sections.filter('.active');
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction == 'next' && nextSection.length) {
    performTransition(nextSection.index());
  }
  if (direction == 'prev' && prevSection.length) {
    performTransition(prevSection.index());
  }
}

$('.wrapper').on('wheel', e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrollToSection('next');
  }


  if (deltaY < 0) {
    scrollToSection('prev');
  }

});

$('.wrapper').on('touchmove', e => {
  e.preventDefoult();
})

$(document).on('keydown', e => {
  switch (e.keyCode) {
    case 40:
      scrollToSection('next');
      break;
    case 38:
      scrollToSection('prev');
      break;
  }
});

$('[data-scroll-to]').on('click', e => {
  e.preventDefault();

  const target = $(e.currentTarget).attr('data-scroll-to');
  performTransition(target);
  console.log(target);
});

if (isMobile) {
  $(window).swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      const nextOrPrev = direction == 'up' ? 'next' : 'prev';

      scrollToSection(nextOrPrev);
    }
  });
}

//player

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
var playerWidth = '660';
var playerHeight = '370';

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: playerHeight,
    width: playerWidth,
    videoId: 'OHoRhdPNqpQ',
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}


var panel = $('.panel');
var playerImageWidth = $('.player__image');

if ((screenWidth <= 768) && (screenWidth > 480)) {
  playerWidth = '600';
  playerHeight = '330';
  playerImageWidth.css('width', '600');
  panel.css('width', '600');
} else {
  if (screenWidth <= 480) {
    playerWidth = '400';
    playerHeight = '220';
    playerImageWidth.css('width', '400');
    panel.css('width', '400')
  }

}


$('.play').on('click', e => {

  const btn = $(e.currentTarget);

  if (btn.hasClass('paused')) {
    player.pauseVideo();
    btn.removeClass('paused');
  } else {

    player.playVideo();
    btn.addClass('paused');
  }
});



function formatTime(time) {
  const roundTime = Math.round(time);

  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;
  const formatedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return minutes + ":" + formatedSeconds;
}

function onPlayerReady(event) {

  const duration = player.getDuration();
  let interval;

  clearInterval(interval);

  interval = setInterval(() => {
    const completed = player.getCurrentTime();
    const percents = (completed / duration) * 100;

    $('.player__fader').css({
      left: `${percents}%`
    });

    $(".player__time").text(formatTime(completed));

  }, 1000);
}


$(".player__line").on("click", e => {
  console.log(e)
  e.preventDefault();
  const bar = $(e.currentTarget);
  const newButtonPosition = e.pageX - bar.offset().left;
  const clickedPercents = (newButtonPosition / bar.width()) * 100;
  const newPlayerTime = (player.getDuration() / 100) * clickedPercents;

  $('.player__fader').css({
    left: `${clickedPercents}%`
  });

  player.seekTo(newPlayerTime);

});

$(".player__image").on("click", e => {
  player.playVideo();
});

function onPlayerStateChange(event) {
  const playerButton = $(".play");
  switch (event.data) {
    case 1:
      $(".player__wrapper").addClass("active");
      playerButton.addClass("paused");
      break;
    case 2:
      playerButton.removeClass("paused");
      break;
  }
}


$('.player__volume').on('click', e => {
  const btn_vol = $(e.currentTarget);

  if (btn_vol.hasClass('volume__active')) {
    player.unMute();
    btn_vol.removeClass('volume__active');
  } else {

    player.mute();
    btn_vol.addClass('volume__active');
  }
});
