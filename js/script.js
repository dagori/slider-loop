'use strict';
const slider = document.getElementById('slider');
const prev = slider.querySelector('.slider__button--prev');
const next = slider.querySelector('.slider__button--next');
const container = slider.querySelector('.slider__container');

const step = parseInt(getComputedStyle(slider).width);
const transition = 'transform .5s linear';
var pos = 0;
var length;

function createClone() {
  pos = -step;
  container.style.transform = `translateX(${pos}px)`;
  var prevSlide = container.children[0].cloneNode(true);
  var nextSlide = container.children[container.children.length - 1].cloneNode(true);
  container.insertBefore(nextSlide, container.children[0]);
  container.appendChild(prevSlide);
  length = container.children.length;
}
createClone();

function movePrev() {
  if(!pos) {
    pos = -step * (length-2);
    container.style.transition = 'null';
    container.style.transform = `translateX(${pos}px)`;
  }
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      container.style.transition = transition;
      pos += step;
      container.style.transform = `translateX(${pos}px)`;
      console.log(`pos:${pos}`);
    });
  });
}

function moveNext() {
  if(pos === -step * (length-1)) {
    pos = -step;
    container.style.transition = 'null';
    container.style.transform = `translateX(${pos}px)`;
  }
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      container.style.transition = transition;
      pos -= step;
      container.style.transform = `translateX(${pos}px)`;
      console.log(`pos:${pos}`);
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
