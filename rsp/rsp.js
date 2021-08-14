const $computer = document.querySelector('#computer');
const $score = document.querySelector('#score');
const $rock = document.querySelector('#rock');
const $scissors = document.querySelector('#scissors');
const $paper = document.querySelector('#paper');
const $history = document.querySelector('#history');
const IMG_URL = './rsp.png';

$computer.style.background = `url(${IMG_URL}) -440px 0`; // url x y
$computer.style.backgroundSize = 'auto 200px'; // 가로 세로

// x좌표 정보를 저장할 객체 선언
const rspX = {
    scissors: '0', // 가위
    rock: '-220px', // 바위
    paper: '-440px', // 보
};

let comChoice = 'scissors';
const changeComHand = () => {
    if(comChoice === 'rock') {
        comChoice = 'scissors';
    } else if (comChoice === 'scissors') {
        comChoice = 'paper';
    } else if (comChoice === 'paper') {
        comChoice = 'rock';
    }
    $computer.style.background = `url(${IMG_URL}) ${rspX[comChoice]} 0`;
    $computer.style.backgroundSize = 'auto 200px';
}

let intervalId = setInterval(changeComHand, 50); // changeComHand를 5초마다 실행시킴

const scoreTable = {
    scissors: 0,
    rock: 1,
    paper: 2, 
};

// 5판 3승제 구현을 위해 
let clickable = true;
let com = 0;
let me = 0;
$history.append(document.createElement('hr'));

const clickButton = () => {
    if(clickable) {
        clearInterval(intervalId);
        clickable = false; 

        // 점수 계산, 화면 표시
        const myChoice = event.target.textContent === '바위' ? 'rock' 
            : event.target.textContent === '가위' ? 'scissors'
            : 'paper';
        const myScore = scoreTable[myChoice];
        const comScore = scoreTable[comChoice];
        const diff = myScore - comScore;

        let message;
        // diff가 0이면 무승부, 1 or -2면 승리, -1 or 2면 패배
        if([1, -2].includes(diff)) {
            me += 1;
            message = '이겼습니다!';
        } else if ([-1, 2].includes(diff)) {
             com += 1;
             message = '졌습니다!';
        } else {
            message = '무승부입니다.';
        }
        $history.append(`${me} : ${com}`,document.createElement('br'));
        if(me === 3) {
             $score.textContent = `${me} : ${com} 으로 내가 이겼습니다! `;
        } else if(com === 3) {
            $score.textContent = `${me} : ${com} 으로 컴퓨터가 이겼습니다! `;
        } else {
            $score.textContent = `${me} : ${com} ${message} `;
             setTimeout(() => {
                clickable = true;
                intervalId = setInterval(changeComHand, 50);
            }, 1000);
        }
    }
};

$rock.addEventListener('click', clickButton);
$scissors.addEventListener('click', clickButton);
$paper.addEventListener('click', clickButton);