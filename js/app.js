


let bodyHtml = document.querySelector('body');
let starrBtn = document.querySelector('.start-btn')
let topSection = document.querySelector('.top-section')
let secondSection = document.querySelector('.second-section')
let cardContent = document.querySelector('.card-content')
let photContainer = document.querySelector('.container')

// -------------------------------------

let ArrayforAllImg = [];      /*  Den här array kommer vara det sista array där finns bilderna blandade redan på ett rätt sätt  */

// -------------------------------------

let searchWord = 'cats';
let apiKey = '9588ff16cc05d4e98bcb23ab4b518b05'
let url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${searchWord}&sort=relevance&safe_search=1&per_page=500&format=json&nojsoncallback=1
`;
let arrayPhoto = [];

// -------------------------------------

/*  Här fitchar vi länken för flickr och skapa object for img länken */
// -------------------------------------


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


// -------------------------------------
/*  Denna async function för att bladar kort utan att det blir bara två som har samma img på ett random sätt varje gång  */
// -------------------------------------
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


// -------------------------------------

// Denna async function  för att skapa addEventListener för kort och varje bild och för att matcha kort och vända om dem 

// -------------------------------------


async function bildCard() {

    await addPhotoToHtml()
    let compareArray = []; /* för att jämfor varje gång länken för de två img som vi öpnnar i spelet */
    let imgHtmlArray = [];  /* För att samla alla imgages elementer i en array */
    let tempCompare = []; /* för att koden kommer ihåg vad hade vi för I nummer när vi öppnade kortet */

    // ------------------------------------

    for (let i = 0; i <= 3; i++) {/*  23*/     /* för att skapa alla kort och lägger till dem samma PNG img */
        imgHtmlArray[i] = document.createElement('img'); /*  */
        imgHtmlArray[i].src = "/img/memorycard.png"
        cardContent.appendChild(imgHtmlArray[i]);
    }

    // ------------------------------------

    /* föt syy skapa addEventListener för varje kort */
    for (let i = 0; i <= 3; i++) {

        console.log(i)
        imgHtmlArray[i].addEventListener('click', muchCard)
        function muchCard() {
            console.log('addEventListener work')
            if (compareArray.length < 2) {                  /* Vi kollar om vi har mindra än två kort som har vi öppnat */
                console.log(i)

                imgHtmlArray[i].src = ArrayforAllImg[i];                /* Då bytar vi src för img med den bilden vi fick från den array där vi har redan bilderna blandade */
                tempCompare.push([i]);   /* 0 */                        /* För att hålla koll på vilket värde här (I) */
                if (compareArray.indexOf(ArrayforAllImg[i]) === -1) {       /* Vi kollar om den url för bilden om vi fått in i compareArray finns redan i detta array eller inte */
                    compareArray.push(ArrayforAllImg[i]);               /* Om inte så lägga vi till den till den array */


                    if (compareArray.length == 2) {      /* Vi kollar om  compareArray har två olika kort med olika url så vänder vi kort igen om 1000s */
                        console.log('dont Same')


                        setTimeout(
                            function () {
                                imgHtmlArray[tempCompare[0]].src = "/img/memorycard.png"
                                imgHtmlArray[tempCompare[1]].src = "/img/memorycard.png"
                                tempCompare = []; /* Här behöver vi tomma array efter vi är klara med den */
                                compareArray = [];  /* Här behöver vi tomma array efter vi är klara med den */
                            }, 1000
                        );

                    }
                } else if (compareArray.indexOf(ArrayforAllImg[i]) !== -1) {     /* Här kollar vi ifall den bilden vi fick från den array 
                    där vi redan har bilderna blandade finns readan i array  och det betyder att vi har två kort då som har samma url*/

                    compareArray.push(ArrayforAllImg[i]);     /*  här pushar vi bilden till compareArray igen  */
                    console.log('the Same');
                    
                    removeLestn();                      /* Här vi kalar function för att removeEventListener för de img elementer som finns i imgHtmlArray
                     med rätt index som vi kommer hämta från array som heter tempCompare och som spara var ligger i på varje gång vi öppnar någon kort  */
                }



                function removeLestn() {

                    imgHtmlArray[tempCompare[0]].removeEventListener('click', muchCard);
                    imgHtmlArray[tempCompare[1]].removeEventListener('click', muchCard);
                    compareArray = [];    /* Här behöver vi tomma array efter vi är klara med den */
                    tempCompare = [];     /* Här behöver vi tomma array efter vi är klara med den */
                    console.log(i)

                }
            }
        }



    }

}



bildCard()







