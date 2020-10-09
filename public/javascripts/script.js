//  File name: script.js
//  Student's name: Jongmin Park
//  Student Id: 301102292
//  Date: 7/10/2020
//  Stitched by Jonny with LOVE

//// index.ejs
// auto scroll banner: banner scrolling using hidden overflow
// random integer generator
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }

// set the variables
if (document.querySelector('.autoScrollBanner')) {
    // count the words prepared for the hi-box
    var banner_list = document.querySelectorAll('.autoScrollBanner__list'); // get the banner list
    var banner_counts = banner_list.length;
    var banner_height = banner_list[0].clientHeight;
}
var random_int = 0;
var target_list = 0;

function autoScrollBanner() {
    var random_int = getRndInteger(0, (banner_counts - 1)); // get the random number by the number of banners
     // if the random number is same as the last, get it again
    if (random_int === target_list) random_int = getRndInteger(0, (banner_counts - 1));
    target_list = random_int;
    // banner scoll animation
    $('.autoScrollBanner__list').animate({
        top: '-' + banner_height * target_list + 'px'
    });
}

window.addEventListener('load', (event) => { autoScrollBanner(); }); // when loaded, scroll the banner
setInterval(() => { autoScrollBanner(); }, 2000);


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