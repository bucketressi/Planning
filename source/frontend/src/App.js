import React from 'react';
import "./scss/style.scss";
import { Header, Container } from './component';
import { Grid } from '@material-ui/core';

const App = () => {
	const title = "Planning";

  	return(
		<Grid className="App">
			<Header 
				title = {title}
			/>
			<Container/>
		</Grid>
  	);
}
export default App;
