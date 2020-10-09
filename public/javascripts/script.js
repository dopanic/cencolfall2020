//  File name: script.js
//  Student's name: Jongmin Park
//  Student Id: 301102292
//  Date: 7/10/2020
//  Stitched by Jonny with LOVE

//// General
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
function smoothScrollTo(target, order) {
    var target_height = document.querySelector(target).clientHeight;
    var new_scroll_position = order * target_height;
    $(target).animate({
        scrollTop: new_scroll_position + 'px'
    });
    return new_scroll_position;
}


//// index.ejs
// automatic scrolling banner: banner scrolling using hidden overflow
function autoRndBannerScrolling(target_class) {
    do {
        var number_of_targets = document.querySelector(target_class).childElementCount; // get the numbet of targets
        var random_int = getRndInteger(0, (number_of_targets - 1)); // get the random number within the number of targets
        var current_scroll_position = smoothScrollTo(target_class, random_int);
    } while (current_scroll_position === $(target_class).scrollTop()); // if the new position is same as the last, loop
}


//// project.ejs
// var test = document.querySelectorAll(".article");
// autoScrollBanner(test);



window.addEventListener('load', (event) => { autoRndBannerScrolling('.autoScrollBanner'); }); // when loaded, scroll the banner
setInterval(() => { autoRndBannerScrolling('.autoScrollBanner'); }, 2500);


//// contactme.ejs
// control the submut
function submit() {
    var form_value_email = document.querySelector('#email').value;
    var form_value_phone = document.querySelector('#phone').value;
    if (form_value_email === '' && form_value_phone === '') {
        window.alert('Please leave the message with your preferred contact way.');
    } else {
        var form_submit_msg = 'Your message will be left with contact ways bellow;\n';
        if (form_value_email !== '') form_submit_msg += 'E-Mail: ' + form_value_email;
        if (form_value_email !== '' && form_value_phone !== '') form_submit_msg += ' / ';
        if (form_value_phone !== '') form_submit_msg += 'Phone: ' + form_value_phone;
        form_submit_msg += '\nDo you want to proceed?';
        var form_submit_confirm = window.confirm(form_submit_msg);
        if (form_submit_confirm === true) window.location = '/';
    }
}