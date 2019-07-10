'use strict';
var slider = document.getElementById('slider');
var prev = slider.querySelector('.slider__button--prev');
var next = slider.querySelector('.slider__button--next');
var container = slider.querySelector('.slider__container');

var step = parseInt(getComputedStyle(slider).width);
var shift = 1;
var pos = 0;
const transition = 'transform .5s linear';
var length;

function createClone() {
  pos = -step;
  container.style.transform = `translateX(${pos}px)`;
  var prevSlide = container.children[0].cloneNode(true);
  var nextSlide = container.children[container.children.length - 1].cloneNode(true);
  container.insertBefore(nextSlide, container.children[0]);
  container.appendChild(prevSlide);
  length = container.children.length;
  console.log(length);
}
createClone();

function movePrev() {
  if(!shift) {
    shift = length - 2;
    pos = -(shift * step);
    container.style.transition = 'null';
    container.style.transform = `translateX(${pos}px)`;
  }
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      container.style.transition = transition;
      shift--;
      pos = -(shift * step);
      container.style.transform = `translateX(${pos}px)`;
      console.log(`pos:${pos}, shift:${shift}`);
    });
  });
}

function moveNext() {
  if(shift === length - 1 || shift > length - 1) {
    shift = 1;
    pos = -step;
    container.style.transition = 'null';
    container.style.transform = `translateX(${pos}px)`;
  }
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      container.style.transition = transition;
      shift++;
      pos = -(shift * step);
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
    shift = 1;
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
