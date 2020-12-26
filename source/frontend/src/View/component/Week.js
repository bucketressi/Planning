import React, { useState, forwardRef, useEffect, createRef } from 'react';
import { Grid, Paper } from '@material-ui/core';
import { CardCom } from './';

const Week = forwardRef((props, ref) => {
	const [day, setDay] = useState(props.day);
	const [dayArray, setArray] = useState([]);
	const [update, forceUpdate] = useState(true);

	const card = createRef();

	useEffect(()=>{
		let tmp = day;
		let array = [];
		for(let i=0; i<7; i++){
			let dayString = "" + tmp.getFullYear() +"/"+ (tmp.getMonth()+1) +"/"+ tmp.getDate();
			array.push(dayString);
			tmp = new Date(new Date(tmp).setDate(tmp.getDate()+1));
		}
		setArray(array);
	}, [day]);

	return(
		<Grid className="week" ref = {ref}>
			<Grid className="weekday-con">
				{
					dayArray.length===0?
						undefined:
						<Paper>
							{dayArray[0]+" - "+dayArray[6]}
						</Paper>
				}
			</Grid>
			<Grid className="space-con">
				<Grid className="fixed-space">
					<CardCom
						type='whole'
					/>
				</Grid>
				<Grid className="move-space">
					{	
						dayArray.length===0?
							undefined:
							dayArray.map((string, index)=>
								<CardCom
									key= {index}
									type='day'
									dayString = {string}
									changePlan = {props.changePlan}
									deletePlan = {props.deletePlan}
									addPlan = {(dayString) => {
										props.addPlan(dayString);
										forceUpdate(!update);
									}}
									plan = {props.plan}
									ref = {card}
								/>
							)
					}
				</Grid>
			</Grid>
		</Grid>
	)
});

export default Week;