# JS prototype

JS는 프로토타입 기반 언어이다. 다른 객체지향언어에서의 Class의 개념이 JS에서 프로토타입이다.

ECMA6 표준에서는 Class 문법이 추가되었지만, 여전히 JS가 Class 기반으로 동작하는 것은 아니다.

프로토타입은 객체에 존재하는 빈 Object이며, 해당 객체를 사용하는 모든 인스턴스가 사용할 수 있다.

```js
function Person(){} // 함수
Person.prototype.eyes = 2;
var user1 = new Person();
var user2 = new Person();

console.log(user1.eyes); // 2
```



## Prototype Link / Object

Prototype = Prototype Link + Prototype Object이다.

### Prototype Object

객체는 항상 함수에서 시작된다. 일반적인 코드 `var obj = {};`도 사실은 `var obj = new Object();`이다.

함수가 정의될 때는 다음 2가지 일이 동시에 이루어진다.

1. 해당 함수에 Constructor 자격 부여

   자격이 부여되면 new를 통해서 객체를 만들어 낼 수 있게 된다.

2. 해당 함수의 Prototype Object 생성 / 연결

   Prototype Object도 생성되어 함수와 연결된다.

   Prototype Object는 constructor와 `__proto__`를 속성으로 가진다.

   constructor는 1번에서 생성된 함수를 가리키고, `__proto__`는 Prototype Link이다.



### Prototype Link

`__proto__` 속성은 함수에만 국한된 것이 아니라 모든 객체가 가지고 있는 속성이다.

이 속성은 객체가 생성될 때 조상이었던 함수의 Prototype Object를 가리킨다.

객체에서 특정 속성에 접근하였을 때, JS는 속성을 가지고 있는 상위 프로토타입을 찾아서 계속 탐색한다. 최상위 Object의 Prototype Object까지 도달했는데도 찾지 못하면 undefined를 return한다.

예를 들어, 모든 객체에서 toString 함수를 쓸 수 있는 이유는 최상위 프로토타입인 Object에서 toString 함수가 있기 때문이다.







## 참고

https://medium.com/@bluesh55/javascript-prototype-%EC%9D%B4%ED%95%B4%ED%95%98%EA%B8%B0-f8e67c286b67