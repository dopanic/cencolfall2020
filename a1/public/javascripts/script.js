//  File name: script.js
//  Student's name: Jongmin Park
//  Student Id: 301102292
//  Date: 7/10/2020
//  Stitched by Jonny with LOVE


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

var hi_box_list_counts = document.querySelector('.hi-box').childElementCount;
var random_int = 0;
var target_list = 0;

function hiBox() {
    var random_int = getRndInteger(0, (hi_box_list_counts - 1));
    if (random_int === target_list) random_int = getRndInteger(0, (hi_box_list_counts - 1));
    target_list = random_int;
    $('.hi-box__list').animate({
        top: '-' + 5*target_list + 'rem'
    });
}

window.addEventListener('load', (event) => { hiBox(); });
setInterval(() => { hiBox(); }, 2000);