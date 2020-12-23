import { forwardRef, createRef, useState, useEffect } from 'react';
import { CheckboxCom } from './';
import { Grid, Card, CardContent } from '@material-ui/core';

const CardCom = forwardRef((props, ref) => {
	const todoRef = createRef();
	const [update, forceUpdate] = useState(true);
	const [plan, setPlan] = useState();

	useEffect(()=>{
		if(props.plan!=undefined && props.dayString!=undefined)
			setPlan(props.plan[props.dayString]);
		console.log(props);
	},[props])

	return(
		<Card className="card-h" ref = {ref}>
			<CardContent>
				<Grid className="card-title">
					{
						props.type==='whole'?
						"일주일 계획":
						props.dayString + " 계획"
					}
				</Grid>
				<Grid className="card-content">
					{plan?
						Object.keys(plan).map( idx => {
							const todo = Object.keys(plan[idx])[0];
							const done = plan[idx][todo];
							return(
								<CheckboxCom
									key = {idx}
									todo = {todo}
									done = {done}
									toggleCheck = {() => {
										props.changePlan(props.dayString, idx, todo, !done);
										console.log('check 완료');
										forceUpdate(!update);
									}}
									ref = {todoRef}
								/>
							);
						})
						:undefined
					}
				</Grid>
			</CardContent>
		</Card>
	)
});

export default CardCom;