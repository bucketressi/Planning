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
		const lastKey = array[array.length()-1];
		let index = Number(lastKey.substr(4,2))+1;
		
		if(index<10){
			index += "0"+index;
		}
		
		return date + index;
	}

	const getIndex = (taskObject) => {
		const array = Object.values(taskObject);
		let indexArray = [];
		array.map(arr => {
			indexArray.push(arr.index);
		});
		indexArray.sort();
		
		return indexArray[indexArray.length()-1]+1;
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
			const id = getId(date, tmp[date].tasks);
			const index = getIndex(tmp[date].tasks);
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
