const candidate = Array(45).fill().map((v,i) => i+1);
const shuffle = [];
while(candidate.length>0) {
    const random = Math.floor(Math.random()*candidate.length);
    const spliceArray = candidate.splice(random,1); // 뽑은 값은 배열에 들어있음 
    const value = spliceArray[0]; // 배열에 들어 있는 값을 꺼내어
    shuffle.push(value); // 배열에 넣기 
}
console.log(shuffle);

const winBalls = shuffle.slice(0,6).sort((a,b) => a-b); // 내림차순: b-a
const bonus = shuffle[6];
console.log(winBalls, bonus);

function paintedball(number, $tag) {
    if(number<10) {
        $tag.style.backgroundColor = 'red';
        $tag.style.color = 'white';
    } else if(number<20) {
        $tag.style.backgroundColor = 'orange';
        $tag.style.color = 'white';
    } else if(number<30) {
        $tag.style.backgroundColor = 'yellow';
    } else if(number<40) {
        $tag.style.backgroundColor = 'blue';
        $tag.style.color = 'white';
    } else {
        $tag.style.backgroundColor = 'green';
        $tag.style.color = 'white';
    }
}

const $result = document.querySelector('#result');
function drawball(number, $tag) {
    const $ball = document.createElement('div');
    $ball.className = 'ball';
    paintedball(number,$ball);
    $ball.textContent = number;
    $tag.appendChild($ball);
}

for(let i = 0; i<winBalls.length; i++){
    setTimeout(() => {
        drawball(winBalls[i],$result);
    }, 1000 * (i+1));
}

const $bonus = document.querySelector('#bonus');
setTimeout(() => {
    drawball(bonus,$bonus);
},7000);

