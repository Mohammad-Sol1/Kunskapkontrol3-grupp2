



let bodyHtml = document.querySelector('body')

let starrBtn = document.querySelector('.start-btn')

let topSection = document.querySelector('.top-section')
let secondSection = document.querySelector('.second-section')

starrBtn.addEventListener('click', function (Event) {


    Event.preventDefault();

    topSection.style.display = 'none';
    secondSection.style.display = 'flex';

    // console.log('111')
})