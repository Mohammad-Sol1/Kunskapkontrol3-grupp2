


let bodyHtml = document.querySelector('body');
let starrBtn = document.querySelector('.start-btn')
let topSection = document.querySelector('.top-section')
let secondSection = document.querySelector('.second-section')
let ArrayforAllImg = [];

let cardContent = document.querySelector('.card-content')

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

    for (let i = 0; i <= 4; i++) {/*  498 */
        let photosData = function () {
            this.PhotoServer = data.photos.photo[i].server;
            this.PhotoId = data.photos.photo[i].id;
            this.PhotoSecret = data.photos.photo[i].secret;
            this.PhotoSize = 'q';
            this.photoLink = `https://live.staticflickr.com/${this.PhotoServer}/${this.PhotoId}_${this.PhotoSecret}_${this.PhotoSize}.jpg`;
        }
        let thePhoto = new photosData().photoLink;
        arrayPhoto.push(thePhoto);
    }
});




async function addPhotoToHtml() {
    let photoHtml, theImageRa, randomNumber;
    let ramdomImageArray = [];
    let duplicateForImageArray = []
    let kortantal = 2;/* 12 */
    await fetchLink;
    while (ramdomImageArray.length < 2) {/* 12 */
        randomNumber = Math.floor(Math.random() * 4);/* 499 */
        theImageRa = arrayPhoto[randomNumber];
        if (ramdomImageArray.indexOf(theImageRa) === -1) {
            ramdomImageArray.push(theImageRa);
            ArrayforAllImg.push(theImageRa);
            photoHtml = document.createElement('img');
            photoHtml.src = theImageRa;
            // photContainer.appendChild(photoHtml);

        }
    }
    while (duplicateForImageArray.length < kortantal) {
        randomNumber = Math.floor(Math.random() * kortantal);
        theImageRa = ramdomImageArray[randomNumber];
        if (duplicateForImageArray.indexOf(theImageRa) === -1) {
            duplicateForImageArray.push(theImageRa);
            ArrayforAllImg.push(theImageRa);
            photoHtml = document.createElement('img');
            photoHtml.src = theImageRa;
            // photContainer.appendChild(photoHtml);
        }
    }
}


async function bildCard() {
    await addPhotoToHtml()
    let compareArray = [];
    let imgHtmlArray = [];  /* För att samla alla img element i en */
    let tempCompare = []; /* för att koden kommer ihåg vad hade vi för I värde */

    // ------------------------------------

    for (let i = 0; i <= 3; i++) {/*  23*/     /* för att lägga till all kord med PNG img */
        imgHtmlArray[i] = document.createElement('img'); /*  */
        imgHtmlArray[i].src = "/img/memorycard.png"
        cardContent.appendChild(imgHtmlArray[i]);
    }

    // ------------------------------------

    for (let i = 0; i <= 3; i++) {
        imgHtmlArray[i].addEventListener('click', muchCard)
        function muchCard() {
            console.log('addEventListener work')
            if (compareArray.length < 2) {                  /*för att byta img bara för 2  */
                imgHtmlArray[i].src = ArrayforAllImg[i];
                tempCompare.push([i]);   /* 0 */
                if (compareArray.indexOf(ArrayforAllImg[i]) === -1) {
                    compareArray.push(ArrayforAllImg[i]);


                    if (compareArray.length == 2) {
                        console.log('dont Same')

                        compareArray = [];
                        setTimeout(
                            function () {
                                imgHtmlArray[tempCompare[0]].src = "/img/memorycard.png"
                                imgHtmlArray[tempCompare[1]].src = "/img/memorycard.png"
                                tempCompare = [];

                            }, 1000
                        );

                    }
                } else if (compareArray.indexOf(ArrayforAllImg[i]) !== -1) {

                    compareArray.push(ArrayforAllImg[i]);
                    console.log('the Same');
                    removeLestn();
                    // imgHtmlArray[tempCompare[0]].removeEventListener('click', muchCard);
                    // imgHtmlArray[tempCompare[1]].removeEventListener('click', muchCard);
                    // console.log(imgHtmlArray[tempCompare[0]])
                    // console.log(imgHtmlArray[tempCompare[1]])
                    // compareArray = [];
                    // tempCompare = [];



                }
                function removeLestn() {
                    console.log(imgHtmlArray[tempCompare[0]])
                    console.log(imgHtmlArray[tempCompare[1]])
                    imgHtmlArray[tempCompare[0]].removeEventListener('click', muchCard);
                    imgHtmlArray[tempCompare[1]].removeEventListener('click', muchCard);
                    compareArray = [];
                    tempCompare = [];
                }
            }
        }
       
    }

}



bildCard()







