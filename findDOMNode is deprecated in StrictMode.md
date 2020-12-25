# findDOMNode is deprecated in StrictMode.

React와 Material UI라는 React UI 라이브러리로 프로젝트를 하던 중, 제목과 같은 오류가 발생했다.

```
findDOMNode is deprecated in StrictMode.
```

KOS 프로젝트에서도 발견했던 오륜데 대수롭지 않게 넘겼더니 여기서 걸리적거리는군 ㅠㅠ

어쨌든 해결해보자.



## 이유

저런 오류가 뜨는 이유는 무엇일까?

먼저, create-react-app을 통해 React 프로젝트를 생성하면, index.js가 다음과 같이 생겼다.

```js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```

여기서 주의해서 보아야할 것은 React.StrictMode라는 tag이다. 해당 tag는 React 코드를 짤 때 발생하는 여러 오류를 방지하기 위한 검사를 하는데, 그 중 하나가 findDOMnode 검사이다. 



## 해결 과정

### forwardRef

이는 웹 서핑 몇 번 해보면 React ref를 사용하라고 해결책이 나온다. 그런데 신기한 것은 React 공식 사이트에 functional component에 대해서 ref를 사용하지 말라고 되어있는 것. ref는 DOM 요소에 적용하는 것이고 class component의 인스턴스에만 적용하라고 한다.

`You may not use the ref attribute on function components `

> https://reactjs.org/docs/refs-and-the-dom.html



그래서, 해결하려면 ref를 사용하라고 하고 functional component에는 사용하지 말라고 하면 hook을 이용해서 개발하고 있는 난 어떡하지..?

해답도 위의 react 홈페이지에 나와있었다. **functional component에서 ref를 쓰고 싶다면**,

* class component로 바꾸던지
* **forwardRef 를 쓰라고 한다.**



forwardRef는 이렇게 사용할 수 있다.

```js
// App.js
import React, { createRef } from 'react';
import Component from './';

const App = () => {
    const appRef = createRef();
    
    return(
    	<Component ref = {appRef}/>
    );
}

// Component.js
import React, { forwardRef } from 'react';

const Component = forwardRef((props, ref) => {
    return(
    	<div ref = {ref}>
        	<h1>let's resolve it</h1>
        	<div>so tired</div>
        </div>
    );
});
```

이렇게 상위 컴포넌트에서 createRef 함수로 ref를 만든 다음, 하위 컴포넌트에 props로 넘겨준다. 하위 컴포넌트는 forwardRef를 이용하여 컴포넌트를 생성하면서 매개변수로 ref를 받는다. 매개변수로 받은 ref는 해당 컴포넌트의 최상위 JSX tag에 ref 속성으로 지정한다.



문제는 한 번만 이렇게 하는 게 아니라 하위 컴포넌트를 쫓아가면서 계속해서 ref를 만들고 할당하는 걸 반복해야한다 ㅋㅋ큐ㅠㅠ



### 그런데...

이렇게 해결했는데도 `findDOMNode ...` 에러는 여전히 뜬다. 그래도 중간에 등장했던 에러들은 ref로 다 해결되었다. 

모두 Material UI의 자체 tag를 사용하면서 ref를 넘겨줘야한다는 에러들이다.

* 에러 예시 : `Invalid prop children supplied to ForwardRef(Slide).`

  > Slide tag 사용하다가 나온 오류



### unstable_createMuiStrictModeTheme

아직 에러가 사라지지 않았으니, 다시 문제를 해결해보자.

다들 막막했는지 중간중간에 StrictMode 태그를 그냥 없애버리라는 조언이 종종 나온다...



그러다가 MaterialUI에서 관련 글을 작성해둔 것을 발견했다.

> https://material-ui.com/customization/theming/

MaterialUI 측도 당연히 해당 문제를 알고 있었고, 문제에 대한 대안을 마련해두었다. 코드로 소개하겠다.



```js
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
const theme = unstable_createMuiStrictModeTheme();

const App = () => {
			<ThemeProvider theme = {theme}>
				<Component/>
			</ThemeProvider>
}
```

이렇게 상위 계층 컴포넌트에서 `ThemProvider`를 import해서 wrapper tag로 감싼다. 그리고 해당 tag의 속성 theme에 `unstable_createMuiStrictModeTheme`를 import 한 뒤 함수를 실행해서 얻은 theme을 넘겨주면 된다.



이렇게까지 하면 에러가 뜨지 않고 잘 동작한다 :)