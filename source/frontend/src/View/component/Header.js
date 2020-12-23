import React from 'react';
import { Grid } from '@material-ui/core';

const Header = (props)=>{
	return(
		<Grid className="header">
			<Grid className="title-con">
				<h1>{props.title}</h1>
				<p>made by heeeun</p>
			</Grid>
		</Grid>		
	);
}
export default Header;
