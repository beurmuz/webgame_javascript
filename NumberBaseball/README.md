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