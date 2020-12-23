import React, { useEffect } from 'react';
import { Header, Container } from './component';
import { usePlanState, usePlanDispatch, useDayState } from './Model';

// View Model은 Model의 Context를 구독하고, 갱신하는 역할
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

	const deletePlan = (date, idx) => {
		try{
			let tmp = plan;
			tmp[date].splice(idx, 1);
			setPlan(tmp);
		}catch(err){
			console.log("delete plan");
			console.error(err);
			throw err;
		}
	}

	const addPlan = (date) => {
		try{
			let tmp = plan;
			tmp[date].push("");
			setPlan(tmp);
		}catch(err){
			console.log("add plan");
			console.error(err);
			throw err;
		}
	}
	
	useEffect(()=>{

	},[plan]);

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

export default ViewModel;
