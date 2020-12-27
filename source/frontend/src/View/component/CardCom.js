import { forwardRef, createRef, useState, useEffect } from 'react';
import { CheckboxCom } from './';
import { Grid, Card, CardContent, Button} from '@material-ui/core';
import { useDrop } from 'react-dnd'

const CardCom = forwardRef((props, ref) => {
	const [update, forceUpdate] = useState(true);
	const [plan, setPlan] = useState();

	useEffect(()=>{
		if(props.plan!=undefined && props.dayString!=undefined && props.plan[props.dayString]!=undefined)
		 setPlan(props.plan[props.dayString].tasks);
	},[props])

	const [{ canDrop, isOver }, drop] = useDrop({
		accept: 'CheckboxCom',
		drop: () => { return {
			movePlan : (dayString, id, todo) => {
				props.deletePlan(dayString, id);
				props.addPlan(props.dayString, todo);
			}
		}},
		collect: (monitor) => ({
			isOver: monitor.isOver(),
			canDrop: monitor.canDrop()
		})
	})

	return(
		<Card className="card-h" ref = {drop}>
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
							const index = plan[id].index;
							return(
								<CheckboxCom
									key = {id}
									id = {id}
									todo = {todo}
									done = {done}
									index = {index}
									dayString = {props.dayString}
									toggleCheck = {() => {
										props.changePlan(props.dayString, id, todo, !done);
										forceUpdate(!update);
									}}
									changePlan = {(todo) => {
										props.changePlan(props.dayString, id, todo, done);
										forceUpdate(!update);
									}}
									deletePlan = {() => {
										props.deletePlan(props.dayString, id);
										forceUpdate(!update);
									}}
									ref = {drop}
								/>
							);
						})
						:undefined
					}
					{props.type==='whole'? undefined:
					<Grid className = "plan-row">
						<Button color="primary" fullWidth = {true} onClick = {() => {props.addPlan(props.dayString)}}>+</Button>
					</Grid>}
				</Grid>
			</CardContent>
		</Card>
	)
});

export default CardCom;