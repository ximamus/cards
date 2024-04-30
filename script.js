const cards = document.querySelectorAll('.memory-card');

var hasFlippedCard = false;
var lockBoard = false;
var firstCard, secondCard;
var cardsLeft = 12;
const winSound = new Audio('win.wav');

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    firstCard.dataset.framework === secondCard.dataset.framework ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    document.querySelectorAll('.memory-card-left').forEach(element => {
        if (element.dataset.framework === firstCard.dataset.framework) {
            element.parentElement.removeChild(element);
        }
    });
    cardsLeft -= 2;
    if (cardsLeft === 0) {
        timer.stop();
        const end = document.getElementById('end');
        end.style.cssText = 'visibility: visible; color: blue';
        end.innerHTML = 'Win!';
        winSound.play();
    }
    document.getElementById('cards-left').innerHTML = cardsLeft; 
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        card.style.order = Math.floor(Math.random() * 12);
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));