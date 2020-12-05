


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
    let imgHtmlArray = [];
    let tempCompare = [];
    for (let i = 0; i <= 3; i++) {/*  23*/     /* för att lägga till all kord med PNG img */
        imgHtmlArray[i] = document.createElement('img');
        imgHtmlArray[i].src = "/img/memorycard.png"
        cardContent.appendChild(imgHtmlArray[i]);
        // console.log(i)
        // console.log(imgHtmlArray)

    }

    for (let i = 0; i <= 3; i++){
        imgHtmlArray[i].addEventListener('click', muchCard)
        // console.log(i)
        // console.log(imgHtmlArray)
        function muchCard() {
            // console.log(i)
            console.log('addEventListener work')
            if (compareArray.length < 2) {                  /*för att byta img bara för 2  */
                imgHtmlArray[i].src = ArrayforAllImg[i];
                // console.log(tempCompare)
                tempCompare.push([i]);   /* 0 */

                if (compareArray.indexOf(ArrayforAllImg[i]) === -1) {

                    compareArray.push(ArrayforAllImg[i]);


                    if (compareArray.length == 2) {
                        // console.log(tempCompare)
                        console.log('dont Same')

                        compareArray = [];

                        setTimeout(
                            function () {
                                imgHtmlArray[tempCompare[0]].src = "/img/memorycard.png"
                                imgHtmlArray[tempCompare[1]].src = "/img/memorycard.png"
                                tempCompare = [];

                            }, 1000
                        );

                    }/* */
                } else if (compareArray.indexOf(ArrayforAllImg[i]) !== -1) {
                    compareArray.push(ArrayforAllImg[i]);
                    console.log('the Same');
                    console.log(compareArray);
                    // console.log(tempCompare);
                    // console.log(imgHtmlArray[tempCompare[0]]);
                    // console.log(imgHtmlArray[tempCompare[1]]);
                    imgHtmlArray[tempCompare[1]].removeEventListener('click', muchCard);
                    imgHtmlArray[tempCompare[0]].removeEventListener('click', muchCard);
                    compareArray = [];
                    tempCompare = [];
                    // console.log(compareArray);
                    // console.log(tempCompare);}


            }
        } }

    }

}



bildCard()





<<<<<<< Updated upstream
                // if (compareArray.length < 2) {
                //     imgHtmlArray[i].src = ArrayforAllImg[i];
                //     compareArray.push(ArrayforAllImg[i])
                //     if (compareArray.length == 2) {
                //         // console.log(compareArray)
=======
                function tvåOlikaBilder() {
                    /* Vi kollar om  compareArray har två olika kort med olika url så vänder vi kort igen om 1000s */
                    if (compareArray.length == 2) {
                        // console.log(tempCompare[0][0])
                        // console.log(tempCompare[1][0])
                       
                        // Ändra backgrund vid no match 
                        let background=document.querySelector('body');
                        background.style.backgroundColor = "red";
                                
                        console.log('dont Same')
                        setTimeout(
                            function () {
                                imgElement[tempCompare[0]].src = "/img/memorycard.png"
                                imgElement[tempCompare[1]].src = "/img/memorycard.png"
                                //Ändra tillbaka till grön
                                background.style.backgroundColor = '#1ABC9C'
                                tempCompare = [];
                                compareArray = [];
                                // console.log(tempCompareForUnik)
                                tempCompareForUnik = []
                                // console.log(tempCompareForUnik)
>>>>>>> Stashed changes








                // if (compareArray[0] == compareArray[1]) {
                //     compareArray = [];
                //     console.log('the Same')
                // }
                // if (compareArray[0] !== compareArray[1]) {
                //     console.log('dont Same')
                //     setTimeout(
                //         function () {
                //             imgHtmlArray[i].src = "/img/memorycard.png"
                //             imgHtmlArray[i - 1].src = "/img/memorycard.png"

                //         }, 1000
                //     );
                //     compareArray = [];

                // }
                // }





// starrBtn.addEventListener('click', function (Event) {
//     Event.preventDefault();
//     topSection.style.display = 'none';
//     secondSection.style.display = 'flex';s

// })

