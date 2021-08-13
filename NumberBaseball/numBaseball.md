# 숫자 야구 게임 핵심 개념
---
### alert 함수는 undefined를 반환함
alert 함수는 `undefined` 반환함
```js
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
```

때문에 위의 코드에서 각 if문은 alert함수를 리턴하므로 `return undefined`를 한 것과 같고, 이는 `return false`를 한 것과 같음 
(`undefined`는 if문에서 false로 처리함)


### Set
Set은 중복을 허용하지 않는 특수한 배열. 
```js
new Set('1231') // Set 내부에는 1,2,3만 들어감 
new Set('1565').size !==4 // 중복을 허용하지 않으므로 Set의 길이는 3이 됨
```

Set의 요소 개수를 구할 때는 length가 아닌 size를 사용함

### `document.createTextNode`
기존 태그의 내용을 유지하면서 추가로 다음 줄에 기록을 남기려면 `document.createTextNode`로 먼저 텍스트를 만들고, `appendChild`로 화면에 추가해야 함.
(`textContent`를 사용하면 기존 내용이 사라져버림)

### `append`와 `appendChild`
- `append`: 태그에 여러 개의 텍스트, 태그를 동시에 추가할 수 있음
- `appendChild`: 하나의 텍스트나 태그만 추가할 수 있음 

### forEach 메서드
- 반복문 효과를 내는 배열의 메서드
- 인수로 함수를 받고, 배열의 요소 하나하나에 인수로 받은 함수를 각각 적용함
- 요소 순서대로 함수를 적용하므로 반복문의 역할을 함

### map 메서드
- 반복문 역할을 하지만, 반환값이 있음
- 기존 배열의 요소를 일대일로 다른 값으로 바꿈
- 기존 배열의 값이 바뀌는 게 아닌, 새로운 배열을 만듦

### indexOf와 includes
- `indexOf`와 `includes`는 배열이나 문자열에 원하는 값이 들어 있는지 찾는 메서드
- 원하는 값이 들어있다면 **해당 인덱스를 알려주고**, 들어있지 않다면 `-1`을 반환
- `includes`는 조금 더 직관적으로 `true`/`false`를 반환함

```js
'2345'.indexOf(3) === 1;
'2345'.indexOf(6) === -1;
['2','3','4','5'].indexOf('5') === 3;
['2','3','4','5'].indexOf(5) === -1; // 요소의 자료형도 같아야 함
`2345`.includes(3) === true;
['2','3','4','5'].indexOf(5) === false;
```