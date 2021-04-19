import React, { useState, createContext, useContext, useEffect } from 'react';

// create context to use plan, day
export const PlanStateContext = createContext(null);
export const PlanDispatchContext = createContext(null);
export const DayStateContext = createContext(null);

// Model은 Context 저장 및 제공
// plan
export const PlanContextProvider = ({children}) => {
	const [plan, setPlan] = useState(
	{
		"2021/04/19" : {
			tasks : {
				"041901":
					{
						index : 1,
						plan : "Planning front 완성하기",
						check : true
					},
				"041902":
					{
						index : 2,
						plan : "SBA 출근",
						check : false
					},
				"041903":
					{
						index : 3,
						plan : "개발자 회의하기",
						check : false
					}
			}
		}
	});

	const setDBPlan = (array) => {
		setPlan(array);
		// DB 등록
		console.log(plan);
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
		// 날짜가 바뀔 때마다 요일 바꾸기
		const setMonday = () => {
			const now = new Date(Date.now());
			const weekday = now.getDay();
			const sub = weekday-1;
			setDay(new Date(new Date(now).setDate(now.getDate()-sub-7))); // 일주일 전 날짜를 처음으로 세팅
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