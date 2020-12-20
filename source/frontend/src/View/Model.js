import React, { useState, createContext, useContext, useEffect } from 'react';

// create context to use plan, day
export const PlanStateContext = createContext(null);
export const PlanDispatchContext = createContext(null);
export const DayStateContext = createContext(null);

// Model은 Context 저장 및 제공
// plan
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

// day
export const DayContextProvider = ({children}) => {
	const [day, setDay] = useState(undefined);

	useEffect(()=>{
		const setMonday = () => {
			const now = new Date(Date.now());
			const weekday = now.getDay();
			const sub = weekday-1;
			setDay(new Date(new Date(now).setDate(now.getDate()-sub)));
		}
		setMonday();
	},[new Date(Date.now()).getDate()]);

	return (
		<DayStateContext.Provider value={day}>
			{children}
		</DayStateContext.Provider>
	);
};


export function usePlanState() {
	const context = useContext(PlanStateContext);
	return context;
}

export function usePlanDispatch() {
	const context = useContext(PlanDispatchContext);
	return context;
}

export function useDayState() {
	const context = useContext(DayStateContext);
	return context;
}