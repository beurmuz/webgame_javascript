const { body } = document; // const body = document.body;와 같음
const $table = document.createElement('table');
const $result = document.createElement('div'); // 결과창
const $btn = document.querySelector('#btn'); // 재시작 버튼 
const rows = [];
let turn = 'O';


const checkWinnerAndDraw = (target) => {
    const hasWinner = checkWinner(target);

    // 승자가 있으면 
    if(hasWinner) {
        $result.textContent = `${turn}님이 승리!`;
        $table.removeEventListener('click', callback);
        return;
    }
    
    // 승자가 없으면
    const draw = rows.flat().every((cell) => cell.textContent);
    if(draw) {
        $result.textContent = '무승부';
        return;
    };
    turn = turn === 'X' ? 'O' : 'X';
};

// 승자인지 판단하는 함수 
const checkWinner = (target) => {
    // 클릭한 칸 알아내는 법 
    const rowIndex = target.parentNode.rowIndex;
    const cellIndex = target.cellIndex;
    console.log(Array.from(target.parentNode.children));
    console.log(Array.from(target.parentNode.children).indexOf(target));
    // 세 칸이 다 채워졌는가?
    let hasWinner = false;
    
    // 가로줄 검사
    if( rows[rowIndex][0].textContent === turn &&
        rows[rowIndex][1].textContent === turn && 
        rows[rowIndex][2].textContent === turn && 
        rows[rowIndex][3].textContent === turn && 
        rows[rowIndex][4].textContent === turn 
    ) {
        hasWinner = true;
    }

    // 세로줄 검사
    if( rows[0][cellIndex].textContent === turn &&
        rows[1][cellIndex].textContent === turn &&
        rows[2][cellIndex].textContent === turn &&
        rows[3][cellIndex].textContent === turn &&
        rows[4][cellIndex].textContent === turn
    ) {
        hasWinner = true;
    }
    // 대각선 검사 
    if( rows[0][0].textContent === turn &&
        rows[1][1].textContent === turn &&
        rows[2][2].textContent === turn &&
        rows[3][3].textContent === turn &&
        rows[4][4].textContent === turn
    ) { 
        hasWinner = true;
    }
    if( rows[0][4].textContent === turn &&
        rows[1][3].textContent === turn &&
        rows[2][2].textContent === turn &&
        rows[3][1].textContent === turn &&
        rows[4][0].textContent === turn 
    ) { 
        hasWinner = true;
    }
    return hasWinner;
};

let clickable = true;
const callback = (event) => {
    if(!clickable) {
        return;
    }

    if(event.target.textContent !== '') { // 빈 칸이 아니면
        console.log('빈 칸이 아닙니다.');
        return;
    }

    //빈칸이면 
    console.log('빈 칸 입니다.');
    event.target.textContent = turn;
    checkWinnerAndDraw(event.target);
    
    
    // 컴퓨터 동작 추가
    if(turn === 'X') {
        const emptyCells = rows.flat().filter((v) => !v.textContent);
        const randomCell = emptyCells[Math.floor(Math.random()*emptyCells.length)];
        clickable = false;
        setTimeout(() => {
            randomCell.textContent = 'X';
            checkWinnerAndDraw(randomCell);
            clickable = true;
        }, 500);
    }
};

for(let i = 1; i <= 5; i++) {
    const $tr = document.createElement('tr');
    const cells = [];
    for(let j = 1; j <= 5; j++) {
        const $td = document.createElement('td');
        //$td.addEventListener('click', callback); // 각 칸에 모두 이벤트 리스너를 추가함
        cells.push($td);
        $tr.appendChild($td);
    }
    rows.push(cells);
    $table.appendChild($tr);
    $table.addEventListener('click', callback); // 한 번에 이벤트 리스너를 추가함
}
body.appendChild($table);
body.appendChild($result);

$btn.addEventListener('click', () => {
    location.reload();
});