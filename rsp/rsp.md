# 가위바위보 게임 핵심 개념
---
### 이미지 스프라이트(image sprite)
서버에 이미지를 요청하는 횟수를 줄이기 위한 기법으로, 필요한 이미지가 하나의 파일로 되어 있어 이를 CSS와 JS로 적절히 잘라서 화면에 표시하는 방법
- css의 `background`와 `backgroundSize`를 이용하면 됨
- `background` 속성은 `url x좌표 y좌표`로 구성됨
- `backgroundSize` 속성은 `가로 세로`로 구성됨 

### setInterval 함수
setTimeout과 비슷하며, 지정한 시간마다 주기적으로 지정한 함수를 실행함 

```js
setInterval(() => {
    // 내용
}, 밀리초);
```

### clearInterval, clearTimeout
- setInterval와 setTimeout 함수를 취소할 수 있는 방법
```js
let 아이디 = setInterval(함수, 밀리초);
clearInterval(아이디);
```

### removeEventListener 메서드
```js
function 함수() {}
태그.addEventListener('이벤트', 함수);
태그.removeEventListener('이벤트', 함수);
```

### 배열.includes
||를 사용한 코드는 배열의 includes 메서드로 반복을 줄일 수 있음. 아래의 두 코드는 같은 작업을 수행함 
```js
diff === '바나나' || diff=== '사과' || diff == '오렌지';
['바나나', '사과', '오렌지'].includes(diff);