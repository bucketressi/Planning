import { forwardRef } from 'react';
import { Grid, Checkbox, Typography } from '@material-ui/core';

const CheckboxCom = forwardRef((props, ref) =>{
	return(
		<Grid className="plan-row" ref = {ref}>
			<Checkbox 
				checked = {props.done}
				onChange = {props.toggleCheck}
			/><Typography>{props.todo}</Typography>
		</Grid>
	);
});

export default CheckboxCom;