





function nav_animation(){
const nav_items = document.querySelectorAll('.nav-item');
nav_items.forEach((nav_item) => {
  nav_item.classList.remove('nav-item-animation');
});

console.log(nav_items);
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      nav_items.forEach((nav_item) => {
        nav_item.classList.add('nav-item-animation');
      });
      return;
    }
    //nav_items.forEach((nav_item) => {
      //nav_item.classList.remove('nav-item-animation');
  //  });
  });
});
observer.observe(document.querySelector(".nav-item"));
};

function angle_drop(){
  const observer_1 = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        var card_1 = document.getElementById("card-1");
        var card_2 = document.getElementById("card-2");
        var card_3 = document.getElementById("card-3");
        card_2.classList.add('drop');
        card_1.classList.add('move-left');
        card_3.classList.add('move-right');
        return;
      }
      //nav_items.forEach((nav_item) => {
        //nav_item.classList.remove('nav-item-animation');
    //  });
    });
  });
  observer_1.observe(document.querySelector(".flex-image-container"));
}



document.addEventListener("DOMContentLoaded", function(){
  nav_animation();
  angle_drop();
  write_name()

});

var i = 0;
//window.addEventListener("mouseenter", write_name());
//$('.banner').removeEventListener("mouseenter", () => {});
var soft_sound = new Audio('./images/soft.wav');
var soft_play = soft_sound.play();
var hard_sound = new Audio('./images/hard.wav');
var hard_play = hard_sound.play();
hard_play.playbackRate = 1.5;
soft_play.playbackRate = 1.5;
const name = ['S', 'h', 'a', 's', 'h', 'i', ' ', 'P', 'r', 'a', 'k', 'a', 's', 'h', ' ', 'S', 'h', 'a', 'h'];

  function write_name() {
    if (i < name.length) {
      document.getElementById("full_name").innerHTML += name[i];
      i++;
      if(name[i] === ' ') {
        hard_play;
        setTimeout(write_name, 100);
      }
      else {
        soft_play;
        setTimeout(write_name, 100);
      }
    }
  }











  //   TESTING FEATURES

  /*
  $('button').click(function() {
    $('.curtain').addClass("up");
    $('.portfolio').addClass("load");
    setTimeout(()=> {write_name();},1500)
    nav_animation();
    angle_drop();

  })
  */
