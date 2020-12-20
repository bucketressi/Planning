import { forwardRef, createRef, useState } from 'react';
import { CheckboxCom } from './';
import { Grid, Card, CardContent } from '@material-ui/core';

const CardCom = forwardRef((props, ref) => {
	const [plan, setPlan] = useState(props.plan);
	const todoRef = createRef();

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
						Object.keys(plan).map( key => {
							const todo = Object.keys(plan[key])[0];
							const done = plan[key][todo];
							return(
								<CheckboxCom
									key = {key}
									todo = {todo}
									done = {done}
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