'use strict';
const slider = document.getElementById('slider');
const prev = slider.querySelector('.slider__button--prev');
const next = slider.querySelector('.slider__button--next');
const container = slider.querySelector('.slider__container');
const radioContainer = slider.querySelector('.slider__radio');
const radio = slider.getElementsByTagName('input');

const step = parseInt(getComputedStyle(slider).width);
const transition = 'transform .5s linear';
var pos = 0;
var shift = 0;
var allLength;
var radioArray = Array.from(radio);
radioArray.forEach(item => item.addEventListener('change', radioMove));

function createClone() {
  pos = -step;
  container.style.transform = `translateX(${pos}px)`;
  var prevSlide = container.children[0].cloneNode(true);
  var nextSlide = container.children[container.children.length - 1].cloneNode(true);
  container.insertBefore(nextSlide, container.children[0]);
  container.appendChild(prevSlide);
  allLength = container.children.length;
}
createClone();

function radioMove(e) {
  resetAutoplay();
  if(this.checked) {
    shift = radioArray.indexOf(this);
    pos = (shift+1) * -step;
    console.log(shift, pos);
    container.style.transform = `translateX(${pos}px)`;
  }
  autoplay();
}

function movePrev() {
  !shift ? shift = radio.length - 1 : shift--;
  if(!pos) {
    pos = -step * (allLength-2);
    container.style.transition = 'null';
    container.style.transform = `translateX(${pos}px)`;
  }
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      container.style.transition = transition;
      pos += step;
      radio[shift].checked = true;
      container.style.transform = `translateX(${pos}px)`;
      console.log(`pos:${pos}, shift:${shift}`);
    });
  });
}

function moveNext() {
  shift === radio.length - 1 ? shift=0 : shift++;
  if(pos === -step * (allLength-1)) {
    pos = -step;
    container.style.transition = 'null';
    container.style.transform = `translateX(${pos}px)`;
  }
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      container.style.transition = transition;
      pos -= step;
      radio[shift].checked = true;
      container.style.transform = `translateX(${pos}px)`;
      console.log(`pos:${pos}, shift:${shift}`);
    });
  });
}
var timer;

function autoplay() {
  timer = setTimeout(function() {
    moveNext();
    autoplay();
  }, 4000);
}

autoplay();

function resetAutoplay() {
  clearTimeout(timer);
}

document.addEventListener('visibilitychange', function() {
  console.log('state:' + document.visibilityState);
  if(document.visibilityState === 'hidden') {
    resetAutoplay();
  } else {
    pos = -step;
    shift = 0;
    radio[shift].checked = true;    
    container.style.transition = '';
    container.style.transform = `translateX(${pos}px)`;
    autoplay();
  }
});

prev.addEventListener('click', function() {
  resetAutoplay();
  movePrev();
  autoplay();
});

next.addEventListener('click', function() {
  resetAutoplay();
  moveNext();
  autoplay();
});
