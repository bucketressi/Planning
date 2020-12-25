import { forwardRef, createRef, useState, useEffect } from 'react';
import { CheckboxCom } from './';
import { Grid, Card, CardContent } from '@material-ui/core';

const CardCom = forwardRef((props, ref) => {
	const todoRef = createRef();
	const [update, forceUpdate] = useState(true);
	const [plan, setPlan] = useState();

	useEffect(()=>{
		if(props.plan!=undefined && props.dayString!=undefined && props.plan[props.dayString]!=undefined)
		 setPlan(props.plan[props.dayString].tasks);
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
						Object.keys(plan).map(id => {
							const todo = plan[id].plan;
							const done = plan[id].check;
							return(
								<CheckboxCom
									key = {id}
									todo = {todo}
									done = {done}
									toggleCheck = {() => {
										props.changePlan(props.dayString, id, todo, !done);
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