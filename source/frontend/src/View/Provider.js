import React from 'react';
import ViewModel from './ViewModel';
import { PlanContextProvider, DayContextProvider } from './Model';
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';

const theme = unstable_createMuiStrictModeTheme();

// Model과 View Model을 이어주는 역할
const Provider = () => (
	<PlanContextProvider>
		<DayContextProvider>
			<ThemeProvider theme = {theme}>
				<ViewModel/>
			</ThemeProvider>
		</DayContextProvider>
	</PlanContextProvider>
);

export default Provider;
