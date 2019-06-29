'use strict';
var slider = document.getElementById('slider');
var prev = slider.querySelector('.slider__button--prev');
var next = slider.querySelector('.slider__button--next');
var container = slider.querySelector('.slider__container');

var step = parseInt(getComputedStyle(slider).width);
console.log(step);
var pos = 0;

function createClone() {
  pos-=step;
  container.style.transform = `translateX(${pos}px)`;
  var prevSlide = container.children[0].cloneNode(true);
  var nextSlide = container.children[container.children.length - 1].cloneNode(true);
  container.insertBefore(nextSlide, container.children[0]);
  container.appendChild(prevSlide);
}
createClone();

prev.onclick = function() {
  if(!pos) {
    pos = -container.offsetWidth + step * 2;
    container.style.transition = 'null';
    container.style.transform = `translateX(${pos}px)`;
  }
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      container.style.transition = 'transform 1s';
      pos+=step;
      container.style.transform = `translateX(${pos}px)`;
      console.log(pos);
    });
  });
}

next.onclick = function() {
  if(pos === -container.offsetWidth + step) {
    pos = -step;
    container.style.transition = 'null';
    container.style.transform = `translateX(${pos}px)`;
  }
  requestAnimationFrame(function(){
    requestAnimationFrame(function(){
      container.style.transition = 'transform 1s';
      pos-=step;
      container.style.transform = `translateX(${pos}px)`;
      console.log(pos);
    });
  });
}
