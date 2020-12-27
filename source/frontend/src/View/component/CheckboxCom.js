import { createRef, forwardRef, useState, useEffect, useRef } from 'react';
import { Grid, Checkbox, Input, Button } from '@material-ui/core';
import { useDrag } from 'react-dnd'

const CheckboxCom = forwardRef((props, ref)=>{
	const inputRef = createRef();

	const [{ isDragging }, drag] = useDrag({
		item: {type: 'CheckboxCom'},
		end: (item, monitor) => {
			const dropResult = monitor.getDropResult();
			if (item && dropResult) {
				console.log(props.id);
				console.log(dropResult.movePlan);
				dropResult.movePlan(props.dayString, props.id, props.todo);
			}
		},
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
	})

	useEffect(()=>{
		inputRef.current.children[0].value = props.todo;
	},[props]);

	
	return(
		<Grid className="plan-row" ref={drag}>
			<Checkbox 
				checked = {props.done}
				onChange = {props.toggleCheck}
			/>
			<Input ref = {inputRef} onInput = {(e) => props.changePlan(e.target.value)} value= {props.todo}></Input>
			<Button color="secondary" onClick = {props.deletePlan}>x</Button>
		</Grid>
	);
});

export default CheckboxCom;