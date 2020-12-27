import { forwardRef } from 'react';
import { Grid, Checkbox, Input, Button } from '@material-ui/core';
import { useDrag } from 'react-dnd'

const CheckboxCom = forwardRef((props, ref)=>{

	const [, drag] = useDrag({
		item: {type: 'CheckboxCom'},
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult();
			if (item && dropResult) {
				dropResult.movePlan(props.dayString, props.id, {plan: props.todo, check: props.done});
			}
		}
	})
	
	return(
		<Grid className="plan-row" ref={drag}>
			<Checkbox 
				checked = {props.done}
				onChange = {props.toggleCheck}
			/>
			<Input onInput = {(e) => props.changePlan(e.target.value)} value= {props.todo}></Input>
			<Button color="secondary" onClick = {props.deletePlan}>x</Button>
		</Grid>
	);
});

export default CheckboxCom;