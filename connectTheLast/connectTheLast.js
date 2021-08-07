const n = Number(prompt('참가자 수를 입력하세요.'));
const $button = document.querySelector('button');
const $input = document.querySelector('input');
const $word = document.querySelector('#word');
const $order = document.querySelector('#order');

let word; // 제시어
let nowWord; // 현재 단어

const onClickButton = () => {
    if(!word || word[word.length-1] === nowWord[0]) { 
        // 제시어가 비어있거나 입력한 단어가 올바른가?
        word = nowWord;
        $word.textContent = word; // 화면에 제시어 표시
        const order = Number($order.textContent);
        if(order + 1 > n) {
            
            $order.textContent = 1;
        } else {
            $order.textContent = order+1;
        }
    } else {
            alert('올바르지 않은 단어입니다.');
            $input.value = '';
            $input.focus();
    }
};

const onInput = (event) => {
    nowWord = event.target.value; // 입력하는 단어를 현재 단어로 함 
};

$button.addEventListener('click', onClickButton);
$input.addEventListener('input', onInput);