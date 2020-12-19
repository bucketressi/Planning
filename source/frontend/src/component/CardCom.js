import { CheckboxCom } from './';
import { Grid, Card, CardContent } from '@material-ui/core';

const CardCom = (props) => {
	return(
		<Card className="card-h">
			<CardContent>
				<Grid className="card-title">
					{
						props.type==='whole'?
						"일주일 계획":
						props.dayString + " 계획"
					}
				</Grid>
				<Grid className="card-content">
					<CheckboxCom />
				</Grid>
			</CardContent>
		</Card>
	)
}

export default CardCom;