import { createRef, forwardRef, useState, useEffect } from 'react';
import { Grid, Checkbox, Input, Button } from '@material-ui/core';

const CheckboxCom = forwardRef((props, ref)=>{
	const inputRef = createRef();

	useEffect(()=>{
		inputRef.current.children[0].value = props.todo;
	},[props]);

	return(
		<Grid className="plan-row" ref = {ref}>
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