


let bodyHtml = document.querySelector('body');
let starrBtn = document.querySelector('.start-btn')
let topSection = document.querySelector('.top-section')
let secondSection = document.querySelector('.second-section')
let cardContent = document.querySelector('.card-content')
let winCardContent = document.querySelector('.win-card-content')
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
async function addPhotoTArray() {
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

    await addPhotoTArray()
    comparecartFunctoin()
    console.log(ArrayforAllImg)
}

// imgHtmlArray[tempCompare[0]].removeEventListener('click', muchCard);


// -------------------------------------

let comparecartFunctoin = function () {

    let compareArray = []; /* för att jämfor varje gång länken för de två img som vi öpnnar i spelet */
    let img = [];  /* För att skapa och lägga till class och appendChild */
    let tempCompare = []; /* för att koden kommer ihåg vad hade vi för I nummer när vi öppnade kortet */
    skapaImgElementiArray()
    let imgElement = document.querySelectorAll('.img-element')
    skapaEvenetFörKort()
    // ------------------------------------
    function skapaImgElementiArray() {
        for (let i = 0; i <= 3; i++) {/*  23*/     /* för att skapa alla kort och lägger till dem samma PNG img */
            img = document.createElement('img'); /*  */
            img.src = "/img/memorycard.png"
            img.classList.add('img-element');
            cardContent.appendChild(img);

        }


    }
    // ------------------------------------


    /* för att skapa addEventListener för varje kort */

    function skapaEvenetFörKort() {
        for (let i = 0; i <= 3; i++) {
            imgElement[i].addEventListener('click', matchakort)
            function matchakort() {
                console.log('addEventListener work')
                mindraÄnTvåBilder();

                /* Vi kollar om vi har mindra än två url (kort) i compareArray som är tomt,
                om de är mindre än två,
                då kollar vi om den url som vi fick först från ArrayforAllImg-(där har vi redan bilderna blandade)- inte finns redan i compareArray,
                 om det inte finns då lägger till vi den till compareArray, 
                  och vi göra det process igen för nästa kort ,
                  då om det nya url inte finns i compareArray så det betyder att de är olika kort ,
                  annars om det nya url finns redan då betyder det att de två url (kort) är lika .
                  */
                function mindraÄnTvåBilder() {
                    if (compareArray.length < 2) {
                        if (compareArray.indexOf(ArrayforAllImg[i]) === -1) {
                            imgElement[i].src = ArrayforAllImg[i];
                            tempCompare.push([i]);     /* För att hålla koll på vilket värde här (I) */
                            compareArray.push(ArrayforAllImg[i]); /* */
                            tvåOlikaBilder();
                        } else {
                            tvålikaBilder()
                        }
                    }
                }

                function tvåOlikaBilder() {
                    /* Vi kollar om  compareArray har två olika kort med olika url så vänder vi kort igen om 1000s */
                    if (compareArray.length == 2) {
                        console.log('dont Same')
                        setTimeout(
                            function () {
                                imgElement[tempCompare[0]].src = "/img/memorycard.png"
                                imgElement[tempCompare[1]].src = "/img/memorycard.png"
                                tempCompare = []; /* Här behöver vi tomma array efter vi är klara med den */
                                compareArray = [];  /* Här behöver vi tomma array efter vi är klara med den */
                            }, 1000
                        );
                    }
                }



                function tvålikaBilder() {
                    /* Här vet vi redam från förra function att det nya url finns readan i compareArray,
                          och det betyder att det två url är lika. */
                    tempCompare.push([i]);
                    compareArray.push(ArrayforAllImg[i]);
                    console.log('The same')
                    imgElement[i].src = ArrayforAllImg[i];
                    removeLestn();
                    function removeLestn() {

                        setTimeout(
                            function () {
                                // imgElement[tempCompare[0]].remove();

                                imgElement[tempCompare[1]].remove();
                                imgElement[tempCompare[0]].remove();
                                console.log(imgElement[tempCompare[0]])
                                console.log(imgElement[tempCompare[1]])
                                for (let i = 0; i < 2; i++) {
                                    let imgFixat = document.createElement('img'); /*  */
                                    imgFixat.src = imgElement[tempCompare[i]].src
                                    imgFixat.classList.add('img-element-fixat');
                                    winCardContent.appendChild(imgFixat);

                                }

                                // imgElement[tempCompare[1]].removeEventListener('click', matchakort);
                                console.log(imgElement[tempCompare[0]])
                                console.log(imgElement[tempCompare[1]])
                                console.log(tempCompare)
                                // imgElement[tempCompare[0]].remove();
                                // imgElement[tempCompare[1]].remove();
                                compareArray = [];    /* Här behöver vi tomma array efter vi är klara med den */
                                tempCompare = [];     /* Här behöver vi tomma array efter vi är klara med den */


                            }, 1000
                        );
                    }
                }



            }
        }

    }
}


bildCard()







