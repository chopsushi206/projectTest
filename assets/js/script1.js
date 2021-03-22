var alcoholButtonEl = document.querySelector('#submit');
var mixerButtonEl = document.querySelector('#mixersButton');
var recipeButtonEl = document.querySelector('#modalBtn');
var carouselContEl = document.querySelector('#carousel_cards_container');
var drinkArray = [];
let alcoholPick, mixersPick;
let cardPosition = 0;
const cards = document.getElementsByClassName('carousel_card');

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
  cardPosition = 0;
  alcoholChoice();
  mixersChoice();

  var apiUrl = "https://www.thecocktaildb.com/api/json/v2/9973533/filter.php?i=" + alcoholPick + ',' + mixersPick; //pick2 out
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          carouselContEl.innerHTML = '';
          console.log(data.drinks.length);
          console.log(data.drinks);
          console.log(data);
          if (data.drinks == "None Found") {
            console.log('no results');
            const carouselCard = document.createElement('div');
            carouselCard.classList.add('carousel_card');
            carouselCard.classList.add('carousel_card_visible');
            const alignmentCont = document.createElement('div');
            alignmentCont.classList.add('alignmentContainer');
            const noResults = document.createElement('p');
            noResults.innerHTML = "Your search returned no results. Please make another selection.";
            alignmentCont.appendChild(noResults);
            carouselCard.appendChild(alignmentCont);
            carouselContEl.appendChild(carouselCard);
          } else if (data.drinks !== "None Found") {
            for (i = 0; i < data.drinks.length; i++) {
              drinkArray.push(data.drinks[i].strDrink)
              const carouselCard = document.createElement('div');
              carouselCard.classList.add('carousel_card');
              if (i == 0) {
                carouselCard.classList.add('carousel_card_visible');
              };
              const alignmentCont = document.createElement('div');
              alignmentCont.classList.add('alignmentContainer');
              const titleDisplay = document.createElement('h4');
              titleDisplay.classList.add('drinktitle');
              titleDisplay.innerHTML = data.drinks[i].strDrink;
              const alcoholDisplay = document.createElement('img');
              alcoholDisplay.setAttribute("src", data.drinks[i].strDrinkThumb);
              alcoholDisplay.classList.add("drinkImage");
              const modalButton = document.createElement('button');
              modalButton.classList.add('modalbtn');
              modalButton.setAttribute("id", "modalBtn"); 
              modalButton.innerHTML = 'Click for Recipe';
              alignmentCont.appendChild(titleDisplay).appendChild(alcoholDisplay);
              alignmentCont.appendChild(modalButton);
              carouselCard.appendChild(alignmentCont);
              carouselContEl.appendChild(carouselCard);

            }
          }
        })
      }
    })
}

//  BEGIN CAROUSEL SCRIPT

document.getElementById('carouselBtn_next').addEventListener('click', function () {
  moveToNextCard();
});
document.getElementById('carouselBtn_prev').addEventListener('click', function () {
  moveToPrevCard();
});

function updateCardPosition () {
for (let card of cards) {
  card.classList.remove('carousel_card_visible');
  card.classList.remove('carousel_card_hidden');
}

cards[cardPosition].classList.add('carousel_card_visible');
}
function moveToNextCard () {
  if (cardPosition == cards.length -1) {
      cardPosition = 0;
  } else {
      cardPosition++;
  }
  updateCardPosition();
};

function moveToPrevCard() {
  if (cardPosition == 0) {
      cardPosition = cards.length -1;
  } else {
      cardPosition--;
  }
  updateCardPosition();
};

// END CAROUSEL SCRIPT



/*  //YouTube function 92-110
 var buttonClickHandler3 = function (event){
   var alcoholName = document.querySelector(".carousel_card_visible > div > h4").innerHTML
   const YOUTUBE_API_KEY="AIzaSyD0xVeWqDSULJKbmLkUou2UAnZxZwSq-CM"
   const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=how%20to%20make%20${alcoholName}&key=${YOUTUBE_API_KEY}`;
   //fetch function following the aforementioned process
   fetch(url)
     .then(function (response) {
       if (response.ok) {
         response.json().then(function (data) {
           document.querySelector(".youtubeVideo > iframe").src = `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
           // make the modal visible
           document.querySelector(".modal").style.display="block"
         });
       } else {
         alert('Error: ' + response.statusText);
       }
   });
 }*/
 
 var getRecipe = function (recipePick) { 
   console.log(recipePick); 
   
   for (var i = 0; i < drinkArray.length; i++) {
     console.log(drinkArray[i])
     var apiUrl2 = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=" + drinkArray[i]; 
     console.log(apiUrl2)
     fetch(apiUrl2)
       .then(function (response) {
         if (response.ok) {
           response.json().then(function (data) {
             console.log(data);
 
             var recipeDisplay = document.getElementById("recipe");
             console.log(recipeDisplay)
             recipeDisplay.innerHTML=data.drinks[0].strInstructions;
             console.log(recipeDisplay);
 
         });
     } else {
       alert('Error: ' + response.statusText);
     }
   })
   .catch(function (error) {
     alert('broken');
   });
   }
 
};





alcoholButtonEl.addEventListener('click', buttonClickHandler);
 // recipeButtonEl.addEventListener('click', buttonClickHandler3);
