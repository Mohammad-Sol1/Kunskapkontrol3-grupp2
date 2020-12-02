
let bodyHtml = document.querySelector('body');
let starrBtn = document.querySelector('.start-btn')
let topSection = document.querySelector('.top-section')
let secondSection = document.querySelector('.second-section')


// starrBtn.addEventListener('click', function (Event) {
//     Event.preventDefault();
//     topSection.style.display = 'none';
//     secondSection.style.display = 'flex';s


// })



// -------------------------------------

let photContainer = document.querySelector('.container')
let searchWord = 'cats';
let apiKey = '9588ff16cc05d4e98bcb23ab4b518b05'
let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchWord}&sort=relevance&safe_search=1&per_page=500&format=json&nojsoncallback=1
`


let arrayPhoto = [];
let fetchLink = fetch(url).then((responsiv) => {
    return responsiv.json(url);
});





let fetchData = fetchLink.then(function (data) {

    for (let i = 0; i <= 498; i++) {
        let photosData = function () {
            this.PhotoServer = data.photos.photo[i].server;
            this.PhotoId = data.photos.photo[i].id;
            this.PhotoSecret = data.photos.photo[i].secret;
            this.PhotoSize = 'q';
            this.photoLink = `https://live.staticflickr.com/${this.PhotoServer}/${this.PhotoId}_${this.PhotoSecret}_${this.PhotoSize}.jpg`;
        }

        let thePhoto = new photosData().photoLink;
        // console.log(thePhoto)

        // let PhotoServer = data.photos.photo[i].server;
        // let PhotoId = data.photos.photo[i].id;
        // let PhotoSecret = data.photos.photo[i].secret;
        // let PhotoSize = 'q';
        // let photoLink = `https://live.staticflickr.com/${PhotoServer}/${PhotoId}_${PhotoSecret}_${PhotoSize}.jpg`;

        arrayPhoto.push(thePhoto);
    }
});




async function addPhotoToHtml() {
    let photoHtml, theImageRa, randomNumber;
    let ramdomImageArray = [];
    let duplicateForImageArray = []
    let kortantal = 12;
    await fetchLink;
    while (ramdomImageArray.length < 12) {
        randomNumber = Math.floor(Math.random() * 499);
        theImageRa = arrayPhoto[randomNumber];
        if (ramdomImageArray.indexOf(theImageRa) === -1) {
            ramdomImageArray.push(theImageRa);
            photoHtml = document.createElement('img');
            photoHtml.src = theImageRa;
            photContainer.appendChild(photoHtml);
        }
    }

    while (duplicateForImageArray.length < kortantal) {
        randomNumber = Math.floor(Math.random() * kortantal);
        theImageRa = ramdomImageArray[randomNumber];
        if (duplicateForImageArray.indexOf(theImageRa) === -1) {
            duplicateForImageArray.push(theImageRa);
            photoHtml = document.createElement('img');
            photoHtml.src = theImageRa;
            photContainer.appendChild(photoHtml);
        }
    }
}



addPhotoToHtml();




let testarray=[1,2]
    console.log(testarray)
    if(testarray.length<2) {
        testarray.push('3')
    }
    console.log(testarray)


    
import {secondSection} from './secondSida.js';

secondSection();