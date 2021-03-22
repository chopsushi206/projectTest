let cardPosition = 0;
const cards = document.getElementsByClassName('carousel_card');

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