# 계산기 제작 핵심 개념
---
### 고차 함수(high order function)

함수를 호출할 때 마다 반환 함수를 생성하는 함수 

```js
const func = () => {
    return () => {
        console.log('javascript');
    };
};
```

반환된 함수는 다른 변수에 저장할 수 있고, 그 변수에 저장된 함수를 다시 호출할 수 있음

```js
const innerFunc = func();
innerFunc(); // javascript
```

반환하는 값을 바꾸고 싶을 때는 매개변수를 사용함

```js
const func = (msg) => {
    return() => {
        console.log(msg);
    };
};
```

화살표 함수 문법에 따라 함수의 본문에서 바로 반환되는 값이 있으면 `{`와 `return`을 생략 가능함
```js
const func = (msg) => () => {
    console.log(msg);
};

### if문 중첩 제거하기 

1. 공통된 절차를 각 분기점 내부에 넣기
2. 분기점에서 짧은 절차부터 실행하게 if문 작성하기
3. 짧은 절차가 끝나면 return이나 break로 중단하기
4. else 제거하기
5. 다음 중첩된 분기점이 나올 때 1~4과정 반복하기
