const $input = document.querySelector('#input');
const $form = document.querySelector('#form');
const $logs = document.querySelector('#logs');

const numbers = [];
for(let n=1; n<=9; n++) {
    numbers.push(n);
}

const answer = [];
for(let n=0; n<4; n++) {
    const index = Math.floor(Math.random()*numbers.length); // numbers의 길이에 따라 
    answer.push(numbers[index]);
    numbers.splice(index,1); 
}
console.log(answer);

const tries = [];
function checkInput(input) {
    if(input.length!==4) { // 길이가 4인지 확인
        return alert('4자리 숫자를 입력해 주세요.');
    }
    if(new Set(input).size !== 4) { // 중복이 있는지 확인
        return alert('중복되지 않게 입력해주세요.');
        /* Set은 중복을 허용하지 않는 특수한 배열 */
    }
    if(tries.includes(input)) { // 이미 시도한 값인지
        return alert('이미 시도한 값입니다.');
    }
    return true;
}

$form.addEventListener('submit', (event) => {
    event.preventDefault(); // 폼 태그의 기본 동작을 취소하는 코드 
    const value = $input.value; // 입력 값 가져오기 
    $input.value = '';
    const valid = checkInput(value);
});
