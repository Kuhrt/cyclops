const eye = $(".cyclops-home-cyclops__iris");
const iris = $(".cyclops-home-cyclops__iris img");

if(eye.length > 0){

  function move(e){
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

  $(".cyclops__home").mousemove(move);
}
