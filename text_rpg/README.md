# 텍스트RPG 핵심 개념
---
### css 화면 관련 속성
- `display: none`: 화면 숨기기
- `display: block`: 화면 보이기

### 문자열, 객체 관련 메서드
- `.parse`: 문자열을 객체로 만드는 메서드
- `.stringify`: 객체를 문자열로 만드는 메서드
=> `parse`와 `stringify` 메서드를 조합해 사용하면 대상 객체를 깊은 복사 할 수 있음

### 객체 리터럴 관련 용어
- 객체: 여러 개의 변수를 하나의 변수로 묶을 때 사용하는 것으로, 함수와 배열을 포함하는 개념 
- 객체 리터럴: `{속성 이름: 속성값}`를 이용해 객체를 표현하는 것
- 객체 접근 방법
    1. `변수.속성이름` => obj.date;
    2. `변수['속성이름']` => obj['date'];
- 메서드: 객체의 속성 값으로 함수가 들어갔을 때, 이 함수를 지칭하는 말 
- 참조: 변수a와 변수b가 같은 객체를 참조하고 있는 경우(**객체를 변수에 담으면 참조 관계가 생김**)
- 복사: 객체가 아닌 값을 변수에 저장하여 참조가 생기지 않는 상황
  
### 깊은 복사(deep copy)
- 깊은 복사는 객체의 속성을 변경해도 기존 객체에 아무런 영향을 미치지 않음 
- 참조는 객체의 속성을 변경하면 기존 객체에도 영향이 미침
=> 객체를 계속 재사용하는 경우라면 참조가 아닌 **깊은 복사**를 해야함

```js
const monster1 = JSON.parse(JSON.stringify(monsterList[0]));
const monster2 = monsterList[0];
monster1.name = '새 몬스터';
console.log(monsterList[0].name); // 슬라임 => 깊은 복사

monster2.name = '새 몬스터';
console.log(monsterList[0].name); // 새 몬스터 => 참조 관계

console.log(monsterList[0] === monster1); // false, 깊은 복사
console.log(monsterList[0] === monster2); // true, 참조 관계 
```

### 얕은 복사(shallow copy)
- 중첩된 객체가 있을 때 가장 바깥 객체만 복사되고, 내부 객체는 참조 관계를 유지하는 복사 방법
- `...`(스프레드 문법, spread) 연산자를 이용함
- 스프레드 문법은 기존 객체의 속성을 새 객체에 할당할 때 사용함
- 배열은 `[...배열]`을 하면 되고, 객체는 `{...객체}`를 하면 됨
- 
```js
const array = [{ j: 'k' }, { l: 'm'}];
const shallowCopy = [...array]; // 얕은 복사
console.log(array === shallowCopy); 
// false; 가장 바깥 객체는 복사되어 참조 관계가 끊어지므로 다른 값이 됨
console.log(array[0] === shallowCopy[0]); // true;
```

### 값을 복사하는 예제
- 각 값을 복사(복사본을 수정할 때 원본이 바뀌지 않는 것)하는 방법
```js
const a = 'b';
const c = ['d', true, 1];
const e = { g: 'h'};
const i = [{ j: 'k'}, { l: 'm'}];
const n = { o: { p: 'q'}};

// => 각 값 복사 시 ----------------------------------------------------------
const a2 = a; // 다른 변수에 대입하는 것만으로도 복사 가능 

// 내부에 객체가 들어있지 않을 때
const c2 = c.slice(); // 배열은 slice메서드를 사용하면 됨
const e2 = {...e}; // 객체 리터럴은 ... 연산자를 이용하면 됨

/* 내부에 객체가 들어있을 때 
- slice나 스프레드 문법은 내부 객체를 참조로 연결하기에 깊은 복사를 해야함 */
const i2 = JSON.parse(JSON.stringify(i)); 
const n2 = JSON.parse(JSON.stringify(n));
```

### 객체의 메서드에서는 function 예약어 생략이 가능함
```js
// function 예약을 생략하지 않은 경우
attack: function(monster) {
    monster.hp -= this.att; // this는 자기 자신을 가리킴
    this.hp -= monster.att;
}, 

// function 예약을 생략한 경우
attack(monster) {
        monster.hp -= this.att;
        this.hp -= monster.att;
},
```
### `this` 예약어
- this는 기본적으로 window 객체를 가리킴
- window 객체는 브라우저를 가리키는 객체 (-> 브라우저가 제공하는 기본 객체, 함수들은 대부분 window 객체 안에 있음)
- 객체 내에서 this가 쓰일 때에는 해당 객체를 가리킴 

### 클래스(class)
- 클래스는 객체를 생성하기 위한 템플릿(서식)
- 2015년 javascript 문밥에 추가되었고, 이전에는 함수로 객체를 만들었음
- 클래스는 생성자 함수를 편하게 쓰기 위해 도입한 것

##### 함수로 객체를 생성하는 방법 - 1. 공장함수
- 객체를 반환하는 함수를 만들면 됨 => 공장처럼 객체를 찍어낸다 해서 **`공장(factory) 함수`**라 부름
```js
function createMonster(name, hp, att, xp) { 
    return {name, hp, att, xp};
}
const monster1 = createMonster('슬라임', 25, 10, 11);
const monster2 = createMonster('슬라임', 26, 10, 10);
const monster3 = createMonster('슬라임', 25, 11, 10);
```
##### 함수로 객체를 생성하는 방법 - 2. 생성자 함수
- 함수에 new를 붙여 호출하는 함수 
- 생성자 함수의 이름은 보통 대문자로 시작함 
- new를 붙이지 않고 호출 시 `this`는 `window`가 되어 `window.name`의 값을 바꾸게 됨
```js
function Monster(name, hp, att, xp) {
    this.name = name;
    this.hp = hp;
    this.att = att;
    this.xp = xp;
}
const monster1 = new Monster('슬라임', 25, 10, 11);
const monster2 = new Monster('슬라임', 26, 10, 10);
const monster3 = new Monster('슬라임', 25, 11, 10);
```

