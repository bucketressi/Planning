import React, { useState, forwardRef, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { CardCom } from './';

const Week = forwardRef((props, ref) => {
	const [day, setDay] = useState(props.day);
	const [dayArray, setArray] = useState([]);

	useEffect(()=>{
		let tmp = day;
		let array = [];
		for(let i=0; i<7; i++){
			let dayString = "" + tmp.getFullYear() +"/"+ (tmp.getMonth()+1) +"/"+ tmp.getDate();
			array.push(dayString);
			tmp = new Date(new Date(tmp).setDate(tmp.getDate()+1));
		}
		setArray(array);
	}, day);

	return(
		<Grid ref={ref} className="week">
			<Grid className="weekday-con">
				{
					dayArray.length===0?
						undefined:
						<>
							{dayArray[0]+"-"+dayArray[6]}
						</>
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
							dayArray.map((string)=>
								<CardCom
									type='day'
									dayString = {string}
								/>
							)
					}
				</Grid>
			</Grid>
		</Grid>
	)
});

export default Week;