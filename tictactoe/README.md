# tictactoe 게임 핵심 개념
---
### <table> 태그
- <table>: 전체 표를 담당하는 태그
- <tr>: 표의 가로줄
- <td>: 각 칸

### `.textContent`
태그 안의 값을 가져오는 방법

### 구조분해 할당(desturucturing assignment)
객체 내부의 속성과 할당하는 변수명이 같을 때 코드를 줄여쓰는 방법 
```js
/*1.*/ const { body } = document; 
/*2. */ const body = document.body;
```
1과 2의 코드는 같음

##### ex01_ 여러 개의 속성을 변수에 넣는 경우
```js
const obj = { a: 1, b: 2};
const { a, b } = obj; // 다음 두 줄을 이렇게 한 줄로 표현 가능

const a = obj.a;
const b = obj.b;
```

##### ex02_ 객체에서 a,c,e 속성 구조분해 하기
```js
const obj = {
    a: 'hello',
    b: {
        c: 'hi',
        d: { e: 'wow'},
    },
};
```

위의 코드를 구조분해 할당 문법으로 변수에 할당하면 다음과 같음
```js
const { a,b: {c, d: { e } } } = obj; // 다음 세 줄을 이와 같이 한 줄로 표현
const a = obj.a;
const c = obj.b.c;
const e = obj.b.d.e;
```

### `event.currentTarget`
이벤트를 연결한 태그에 접근하는 방법 (이벤트가 발생한 태그가 아님) 

### 이벤트 버블링(event bubbling)
- 이벤트가 발생할 때 부모 태그에도 동일한 이벤트가 발생하는 현상 
- **이벤트가 부모 태그로 퍼져 나가는 현상**이, 수면으로 올라가는 물방울 모양과 비슷하다고 해서 `이벤트 버블링`이라 함 

##### ex01
- <td>의 부모는 <tr>, <tr>의 부모는 <table>
- <td>를 클릭하면 <td>에서 click이벤트가 발생함
- 이 때, <td>의 부모인 <tr>, <table>에서도 동일한 이벤트가 발생함
=> <td>에서 발생한 click 이벤트가 <table>까지 전달됨


### ex02_ 이벤트 버블링을 활용해 버튼을 클릭할 때 alert하게 하기
```html
<header>
    <div>
        <button>클릭</button>
    </div>
</header>
<script>
</script>
``` 

이벤트 리스너를 button 태그에 달지 않고도 버튼을 클릭할 때 alert하게 하려면, `이벤트 버블링` 기술을 이용하면 됨. <script></script> 코드에 다음과 같이 작성하면 됨

```js
const header = document.querySelector('header');
function alarm() {
    alert('hello, event bubbling');
}
header.addEventListener('click', alarm);
```

### `parentNode`
- 현재 태그의 부모 태그를 선택하는 속성. 해당 코드에서 `target`은 <td>이므로 `target.parentNode`는 <tr> 태그를 가리키게 됨
- <tr>(target.parentNode)는 rowIndex란 속성을 제공
- <td>(target)은 cellIndex란 속성을 제공

### `children`
- 자식 태그를 얻어오는 속성
- 부모 태그는 하나지만, 자식 태그는 여러 개일 수 있음
- 이 때, children은 배열처럼 생긴 객체의 형태가 됨 => **`유사 배열 객체`**

### 유사 배열 객체(array-like object)
```js
{ 0: td, 1: td, 2: td, length: 3 }
```

- 위 같은 모양을 가진 객체로, children[0], children[1], children.length처럼 사용할 수 있어서 배열로 착각하기 쉬움 
- 유사 배열 객체에 indexOf를 사용하려면 `Array.from`메서드를 이용하면 됨

### `Array.from` 메서드
- 유사 배열 객체를 진짜 배열로 바꾸기 위한 메서드
```js
const rowIndex = target.parentNode.rowIndex;
const cellIndex = target.cellIndex;
console.log(Array.from(target.parentNode.children));
console.log(Array.from(target.parentNode.children).indexOf(target));
...
```
- 문자열도 Array.from메서드를 이용하면 배열로 바꿀 수 있음
```js
Array.from('123'); // ['1', '2', '3']
```

### `.flat()` 메서드
- 배열의 차원을 낮추는 메서드
- n차원 배열을 n-1차원 배열로 낮춤
- 1차원 배열은 flat을 적용해도 1차원 배열임

### `.every(조건함수)` 메서드
- **배열에서 모든 값이 조건에 해당하는지 판단할 때 이용**
- 조건 함수의 반환값이 하나라도 false이면 every메서드도 false를 반환
- every는 조건을 만족하지 않는 요소를 하나라도 찾으면 바로 반복을 중단함
- 조건 함수가 false를 반환

##### ex01
```js
const array = [1, 'hello', null, undefined, false];
```

위의 배열에서 한 칸이라도 null이 들어있으면 true를 반환하고, 아니면 false를 출력하게끔 하기

```js
const array = [1, 'hello', null, undefined, false];
let findNull = false;
array.forEach((value) => {
    if(value === null) {
        findNull = true;
    }
});
```

위의 코드를 every 메서드로도 데이터가 들어 있는 지 확인할 수 있음
```js
const array = [1, 'hello', null, undefined, false];
const findNull = array.every((value) => value === null);
console.log(findNull); // false
```

`.every` 뿐만이 아닌 `.some`메서드를 사용할 수 있음
```js
const array = [1, 'hello', null, undefined, false];
const findNull = array.some((value) => value === null);
console.log(findNull); // false
```

### `.some` 메서드
- **배열에서 하나라도 조건을 만족하는 요소가 있는지 판단할 때 이용**
- 하나라도 조건을 만족하는 요소를 찾으면 반복을 중단함
- 조건함수가 true를 반환함

### rowIndex와 cellIndex
- <tr>은 몇 번째 줄인지를 알려 주는 rowIndex라는 속성을 제공함
- <td>는 몇 번째 칸인지를 알려 주는 cellIndex라는 속성을 제공함

```js
const rowIndex = $tr.rowIndex;
const cellIndex = $td.cellIndex;
```
