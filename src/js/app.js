// import {TweenMax, Power2, TimelineLite} from "gsap";
import {TweenLite} from "gsap";

// NEEDED VARIABLES
const cursorDot = $('.cursor .dot');
const cursorRing = $('.cursor .ring');
const eye = $(".cyclops-home-cyclops__iris");
const iris = $(".cyclops-home-cyclops__iris svg");
const laser = $('.cyclops__laser');

// MAKE THE MONSTER SHOOT A LASER
// NOTE: Only if the mouse is still for 5 seconds
let lastTimeMouseMoved = new Date().getTime();
let mouseTimeout = 0;

$('body').on('mousemove', function(e) {
  // Clearing the timeout if the mouse moves and setting it again in case it stops
  clearTimeout(mouseTimeout);
  setMouseTimeout();
  // Cooling off the eye
  coolOffEye();
});

function setMouseTimeout() {
  mouseTimeout = setTimeout(function() {
    // Getting the current time to compare to when the mouse moved
    let currentTime = new Date().getTime();

    // If the mouse hasn't moved for 1 second, heat up the eye
    if (currentTime - lastTimeMouseMoved > 1000) {
      // Heat up the eye
      heatUpEye();
    }
  }, 1000);
}

function heatUpEye() {
  // Add a class to signify that it's heating up
  eye.addClass('heating-up');
  // Animating the iris to red
  TweenLite.to(eye.find('#Iris'), 2, {
    fill: '#ED6E57',
    onComplete: fireAllLasers
  });
}
function coolOffEye() {
  // If the eye is heating up or is heated
  if (eye.hasClass('heating-up')) {
    // Removing the class to signify it's cooling down
    eye.removeClass('heating-up');
    // Making sure the laser is gone
    removeLaser();
    // Turning the color back to black
    TweenLite.to(eye.find('#Iris'), 1, {
      fill: '#2C2C2C'
    });
  }
}

function fireAllLasers() {
  const cyclopsOffset = $('.cyclops-home__cyclops').offset();
  const irisOffset = iris.offset();
  const laserTopPosition = (irisOffset.top - cyclopsOffset.top) + (iris.height() / 2);
  const laserLeftPosition = (irisOffset.left - cyclopsOffset.left) + (iris.width() / 2);
  const cursorY = cursorDot.offset().top + cursorDot.height()/2;
  const cursorX = cursorDot.offset().left + cursorDot.width()/2;
  let laserLength = calculateDistance(iris, cursorX, cursorY);
  let laserDirectionY = cursorY - (irisOffset.top + iris.height()/2);
  let laserDirectionX = cursorX - (irisOffset.left + iris.width()/2);
  let laserAngle = Math.atan2(laserDirectionY, laserDirectionX);

  laser.css({
    top: laserTopPosition,
    left: laserLeftPosition,
    transform: 'rotate('+(laserAngle + 1.5*Math.PI)+'rad)'
  });

  TweenLite.to(laser, 0.05, {
    height: laserLength
  });
}

function removeLaser() {
  laser.css({
    height: 0
  });
}

function calculateDistance(elem, mouseX, mouseY) {
    return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left+(elem.width()/2)), 2) + Math.pow(mouseY - (elem.offset().top+(elem.height()/2)), 2)));
}

function getDirection(x1, y1, x2, y2) {
    // might be negative:
    var angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    // correct, positive angle:
    return (angle + 360) % 360;
}


// MAKE A NEW CURSOR
$('.cyclops__home').on('mousemove', moveCursor);

function moveCursor(e) {
  // Move the dot
  TweenLite.to(cursorDot, 0, {
    css: {
      left: e.pageX,
      top: e.pageY,
      opacity: 1
    }
  });

  // Move the ring
  TweenLite.to(cursorRing, 0.3, {
    css: {
      left: e.pageX,
      top: e.pageY,
      opacity: 1
    }
  });
}


// MOVE THE MONSTER'S EYE
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
    // laser.css('transform','rotate('+rad+'rad)');
  } else {
    iris.css('transform','rotate(-'+rad+'rad)');
    // laser.css('transform','rotate(-'+rad+'rad)');
  }
}
