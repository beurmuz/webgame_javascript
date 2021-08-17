const $wrapper = document.querySelector('#wrapper');

const cardCount = prompt('카드 색상 수를 입력해주세요. 최대 10개까지 가능합니다.')*1;
console.log(cardCount);

const total = (cardCount*2);
const colorsList = ['darkseagreen', 'palegoldenrod', 'mediumpurple', 'pink', 'cornflowerblue', 'palevioletred', 'bisque', 'darkcyan', 'darkgoldenrod', 'dimgray'];
const colors = colorsList.slice(0,cardCount);
//console.log(colors);
let colorCopy = colors.concat(colors);
console.log(colorCopy.length);
let shuffled = [];
let clicked = [];
let completed = [];
let clickable = false;

let startTime;
let endTime; 

function shuffle() { // 피셔-예이츠 셔플
    for(let i = 0; colorCopy.length > 0; i += 1) {
        const randomIndex = Math.floor(Math.random()*colorCopy.length);
        shuffled = shuffled.concat(colorCopy.splice(randomIndex,1));
    }
}

function createCard(i) { // div.card > div.card-inner > (div.card-front + div.card-back)
    const card = document.createElement('div');
    card.className = 'card';
    const cardInner = document.createElement('div');
    cardInner.className = 'card-inner'; 
    const cardFront = document.createElement('div');
    cardFront.className = 'card-front'; 
    const cardBack = document.createElement('div');
    cardBack.className = 'card-back'; 

    cardBack.style.backgroundColor = shuffled[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    return card;
}

function onClickCard() {
    if(!clickable || completed.includes(this) || clicked[0] === this) {
        return;
    }
    this.classList.toggle('flipped');
    clicked.push(this);
    if(clicked.length !== 2) {
        return;
    }
    const firstBackColor = clicked[0].querySelector('.card-back').style.backgroundColor;
    const secondBackColor = clicked[1].querySelector('.card-back').style.backgroundColor;
    if(firstBackColor === secondBackColor) { // 두 카드가 같으면
        completed.push(clicked[0]);
        completed.push(clicked[1]);
        clicked = [];
        if(completed.length !== total) {
            return;
        }
        endTime = new Date();
        diff = (endTime - startTime)/1000;
        setTimeout(() => {
            alert(`축하합니다! 총 ${diff}초가 걸렸습니다!`);
            resetGame();
        }, 800);
        return;
    }
    // 두 카드가 다르면 
    clickable = false;
    setTimeout(() => {
        clicked[0].classList.remove('flipped');
        clicked[1].classList.remove('flipped');
        clicked = [];
        clickable = true;
    }, 500);
}

function startGame() {
    shuffle();
    for(let i = 0; i < total; i += 1) {
        const card = createCard(i);
        card.addEventListener('click', onClickCard);
        $wrapper.appendChild(card);
    }

    document.querySelectorAll('.card').forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('flipped');
        }, 1000+(100 * index));
    });

    setTimeout(() => {
        document.querySelectorAll('.card').forEach((card) => {
            card.classList.remove('flipped');
        });
        clickable = true;
    }, 5000);
    
    startTime = new Date();
}

function resetGame() {
    $wrapper.innerHTML = '';
    colorCopy = colors.concat(colors);
    shuffleed = [];
    completed = [];
    clickable = false;
    startGame();
}

startGame();