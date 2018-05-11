// import {TweenMax, Power2, TimelineLite} from "gsap";
import {TweenLite} from "gsap";

// MAKE A NEW CURSOR
const cursorDot = $('.cursor .dot');
const cursorRing = $('.cursor .ring');
$('.cyclops__home').on('mousemove', moveCursor);

function moveCursor(e) {
  // Move the dot
  TweenLite.to(cursorDot, 0, {
    css: {
      left: e.pageX,
      top: e.pageY
    }
  });

  // Move the ring
  TweenLite.to(cursorRing, 0.3, {
    css: {
      left: e.pageX,
      top: e.pageY
    }
  });
}


// MOVE THE MONSTER'S EYE
const eye = $(".cyclops-home-cyclops__iris");
const iris = $(".cyclops-home-cyclops__iris svg");
if(eye.length > 0){
  $(".cyclops__home").mousemove(moveTheEye);
}


function moveTheEye(e){
  const offset = eye.offset();
  const cyclopsOffset = $('.cyclops-home__cyclops').offset();
  const x = e.pageX;
  const y = e.pageY;
  const left = (offset.left - x);
  const top = (offset.top - y);
  const rad = Math.atan2(top, left);

  eye.css('transform','rotate('+rad+'rad)');

  if (rad < 0) {
    iris.css('transform','rotate('+(rad * -1)+'rad)');
  } else {
    iris.css('transform','rotate(-'+rad+'rad)');
  }
}
