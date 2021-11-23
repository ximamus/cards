const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cardsLeft = 12;
let winSound = new Audio('win.wav');

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();
}

function checkForMatch(){
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards(){
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    divs = document.querySelectorAll('div.memory-card-left'); 
    divs.forEach(element => {
        if(element.dataset.framework == firstCard.dataset.framework){
            element.parentElement.removeChild(element);
        }
    });
    cardsLeft -= 2;
    if(cardsLeft == 0){
        timer.stop();
        document.getElementById('end').style.cssText = 'visibility: visible; color: blue';
        document.getElementById('end').innerHTML = 'Win!';
        winSound.play();
    }
    document.getElementById('cards-left').innerHTML = cardsLeft; 
    resetBoard();
}

function unflipCards(){
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard(){
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle(){
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
})();

cards.forEach(card => card.addEventListener('click', flipCard));