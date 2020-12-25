# Planning 질문

```jsx
export const PlanContextProvider = ({children}) => {
	const [plan, setPlan] = useState({
		"2020/12/20":[
			{"Planning front 완성하기":1},
			{"회사 갈 준비..":0},
			{"// 개발자 회의하기":1}
		], 
		"2020/12/21":[
			{"SBA 출근":0},
			{"자리 정리하기":0},
			{"인수인계 정리":0}
		]
	});

	const setDBPlan = (array) => {
		setPlan(array);
		// DB 등록
		console.log('db 등록');
	}

	return (
		<PlanStateContext.Provider value={plan}>
			<PlanDispatchContext.Provider value={setDBPlan}>
				{children}
			</PlanDispatchContext.Provider>
		</PlanStateContext.Provider>
	);
};
```

```jsx
const ViewModel = () => {
	const plan = usePlanState();
	const setPlan = usePlanDispatch();
	const day = useDayState();

	const title = "Planning";

	const changePlan = (date, idx, string, boolean) => {
		try{
			let tmp = plan;
			tmp[date][idx][string] = boolean;
			setPlan(tmp);
		}catch(err){
			console.log("change plan");
			console.error(err);
			throw err;
		}
	}
    
    ...
    
    return (
		<>
		{
			plan ?
				<>
					<Header title={title}/>
					<Container
						day = {day}
						plan = {plan}
						changePlan = {changePlan}
						deletePlan = {deletePlan}
						addPlan = {addPlan}
					/>
				</>
				: undefined
		}
		</>
	);
};
```

*  ViewModel에서 Model의 Context를 구독해서 Plan 값을 변경하는 changePlan을 하위 컴포넌트에 props로 넘기고 있어서 최하위 컴포넌트인 CheckboxCom에서 changePlan을 사용해 구현하려고 함.



```jsx
import { forwardRef, useState } from 'react';
import { Grid, Checkbox, Typography } from '@material-ui/core';

const CheckboxCom = forwardRef((props, ref) =>{
	const changeDone = () => {
		props.changePlan(props.dayString, props.idx, props.todo, !props.done)
	}

	return(
		<Grid className="plan-row" ref = {ref}>
			<Checkbox 
				checked = {props.done}
				onClick = {changeDone}
			/><Typography>{props.todo}</Typography>
		</Grid>
	);
});

export default CheckboxCom;
```

* 이렇게 하면 클릭을 해도 Model의 Plan은 변경되지만 props.done 값은 변경되지 않아 화면에 반영되지 않음.



```jsx
import { forwardRef, useState } from 'react';
import { Grid, Checkbox, Typography } from '@material-ui/core';
import { usePlanState, usePlanDispatch, useDayState } from '../Model';

const CheckboxCom = forwardRef((props, ref) =>{
	const [done, setDone] = useState(props.done);

	const changeDone = () => {
		setDone(!done)
		props.changePlan(props.dayString, props.idx, props.todo, !done)
	}

	return(
		<Grid className="plan-row" ref = {ref}>
			<Checkbox 
				checked = {done}
				onClick = {changeDone}
			/><Typography>{props.todo}</Typography>
		</Grid>
	);
});

export default CheckboxCom;
```

* 그래서 model의 plan 변경과 done을 useState로 변경하는것을 동시에 수행하는 방식으로 해결했는데 더 좋은 방법이 있을것 같은데 감이 안와서 질문!!



----

**희은**

Git에 이제 commit 해두었지만, 내가 해결한 방식은 그냥 *forUpdate하는 state를 하나 정의해서 check할 때마다 강제적으로 update 시키는 거*!

```js
const [update, forceUpdate] = useState(true);

<CheckboxCom
    key = {idx}
    todo = {todo}
    done = {done}
    toggleCheck = {() => {
        props.changePlan(props.dayString, idx, todo, !done);
        console.log('check 완료');
        forceUpdate(!update); // 강제 업데이트
    }}
    ref = {todoRef}
/>
```

이런 방식은 그냥 사용자 정의 hook으로도 만들어서 사용하는 방식임!



또 다른 방법은 ref 이용해서 체크박스 클릭 시 DOM요소에 속하는 checkbox를 check 상태로 만드는 식으로도 할 수 있음

>  https://ko.reactjs.org/docs/hooks-reference.html#useref 참고 

그런데 ref 사용하면 model에 있는 데이터와는 별개로 한번 더 건들여주어야하기 때문에, 더 좋은 방법이라고는 할 수 없는 듯!



그리고 이러한 문제가 발생하는 이유는 현재 model에 있는 데이터가 object 형태로 정의돼서 그러는데, React component라는 chrome 확장 프로그램으로 확인해보면, CardCom.js 전에는 plan이 실시간으로 model을 반영함을 알 수 있음! 그런데, CardCom.js에서 props로 plan 자체를 받는 것이 아니라 내부요소를 받기 때문에, changePlan으로 plan을 복사해서 아예 다른 객체로 받는다면 plan 자체를 props로 받는 요소들은 다 갱신이 제대로 되겠지만 plan 안의 배열 하나를 props로 받는 요소는 겉으로 보기에 달라지는 게 없어 보이는것!

React는 속의 내용까지 보지는 않고, 그냥 그 객체 자체의 형태가 유지되어있는지 겉핥기 식으로만 DOM요소가 유지되는지 판단하기 때문에, 배열 안에 true가 false로 바뀌었다고 해서 그걸 인식해주지는 못함!



이러한 관점에서 3번째 방법은 plan으로 끝까지 props를 내린다음에 checkboxSum.js 컴포넌트에서 check function을 다뤄도 됨! 하지만, 넘겨야하는 date나 idx같은 것들이 다 한 층 상위 컴포넌트인 CardCom.js에 있기 때문에 그것도 다 props로 넘겨줘야해서 코드가 지저분해짐



그래서 내가 채택한 방식은 처음에 forceUpdate를 쓰는 것!