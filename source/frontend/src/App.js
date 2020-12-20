import React from 'react';
import "./scss/style.scss";
import Provider from './View/Provider';
import { Grid } from '@material-ui/core';

const App = () => {
  	return(
		<Grid className="App">
			<Provider/>
		</Grid>
  	);
}
export default App;
