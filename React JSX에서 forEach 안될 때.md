# React JSX에서 forEach 안될 때

React JSX에서 array나 dictionary를 다루기 위해 forEach 문을 썼다면, map으로 변경해야한다.

map 함수는 연산 후에 생성된 결과 array / dictionary를 반환해주기 때문에 JSX에서 나타나게 되지만, forEach문은 변수에만 연산 결과가 적용되고 반환해주지 않는다. 

따라서, forEach 문을 사용하게 되면 연산만 되고 결과는 JSX로 출력되지 않는다.