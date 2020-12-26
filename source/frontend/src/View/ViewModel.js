import React, { useEffect } from 'react';
import { Header, Container } from './component';
import { usePlanState, usePlanDispatch, useDayState } from './Model';

// View Model은 Model의 Context를 구독하고, 갱신하는 역할
const ViewModel = () => {
	const plan = usePlanState();
	const setPlan = usePlanDispatch();
	const day = useDayState();

	const title = "Planning";

	const getId = (date, taskObject) => {
		const array = Object.keys(taskObject);
		const lastKey = array[array.length-1];
		let index = Number(lastKey.substr(4,2))+1;
			
		if(index<10){
			index = "0"+index;
		}
		return lastKey.substr(0,4) + index;
	}

	const changePlan = (date, id, string, boolean) => {
		try{
			let tmp = plan;
			tmp[date].tasks[id].plan = string;
			tmp[date].tasks[id].check = boolean;
			setPlan(tmp);
		}catch(err){
			console.log("change plan");
			console.error(err);
			throw err;
		}
	}

	const deletePlan = (date, id) => {
		try{
			let tmp = plan;
			let index = tmp[date].tasks[id].index;
			for(var key in tmp[date].tasks) {
				if (tmp[date].tasks[key].index > index) tmp[date].tasks[key].index-=1;
			}
			delete tmp[date].tasks[id];
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
			let id = "";
			let index = 0;
			if (tmp[date] && Object.keys(tmp[date].tasks).length) {
				id = getId(date, tmp[date].tasks)
				index = Object.keys(tmp[date].tasks).length + 1;
			} else {
				tmp[date] = {tasks:{} }
				id = date.substr(5,2) + date.substr(8,2) + "01";
				index = 1;
			}
			tmp[date].tasks[id] = {
				index : index,
				plan : "",
				check : false
			}
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
