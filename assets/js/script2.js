var alcoholButtonEl = document.querySelector('#submit');
var mixerButtonEl = document.querySelector('#mixersButton');
var recipeButtonEl = document.querySelector('#modalBtn');
var carouselContEl = document.querySelector('#carousel_cards_container');
var drinkArray = [];
let alcoholPick, mixersPick;

function alcoholChoice() {
    let alcohol = document.getElementsByName('alcohol');
    for (i = 0; i < alcohol.length; i++) {
        if (alcohol[i].checked) {
            alcoholPick = alcohol[i].value;
        }
    }
}

function mixersChoice() {
    let mixers = document.getElementsByName('mixers');
    for (i = 0; i < mixers.length; i++) {
        if (mixers[i].checked) {
            mixersPick = mixers[i].value;
        }
    }
}

var buttonClickHandler = function () {
    alcoholChoice();
    mixersChoice();

    var apiUrl = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" + alcoholPick + ',' + mixersPick; //pick2 out
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    console.log(data);
                    console.log(data.drinks.length);
                    carouselContEl.innerHTML = '';
                    for(i = 0; i < data.drinks.length; i++) {
                        drinkArray.push(data.drinks[i].strDrink)
                        const carouselCard = document.createElement('div');
                        carouselCard.classList.add('carousel_card');
                        const alignmentCont = document.createElement('div');
                        alignmentCont.classList.add('alignmentContainer');
                        const titleDisplay = document.createElement('h4');
                        titleDisplay.classList.add('drinktitle');
                        titleDisplay.innerHTML = data.drinks[i].strDrink;
                        const alcoholDisplay = document.createElement('img');
                        alcoholDisplay.setAttribute("src", data.drinks[i].strDrinkThumb);
                        alcoholDisplay.classList.add("drinkImage");
                        const modalBtn = document.createElement('button');
                        modalBtn.classList.add('modalBtn');
                        alignmentCont.appendChild(titleDisplay).appendChild(alcoholDisplay).appendChild(modalBtn);
                        carouselCard.appendChild(alignmentCont);
                        carouselContEl.appendChild(carouselCard);

                    }

                })
            }
        })
    }

alcoholButtonEl.addEventListener('click', buttonClickHandler);